import { useState } from "react";
import type { Helper } from "../../types/helper";

type GuardianReviewFormProps = {
  selectedHelper?: Helper;
  onBack: () => void;
  onSubmitReview: (content: string) => void;
};

const reviewTags = ["친절해요", "시간을 잘 지켜요", "전문적이에요", "부모님이 좋아하세요"];

export function GuardianReviewForm({ selectedHelper, onBack, onSubmitReview }: GuardianReviewFormProps) {
  const asset = (name: string) => `/figma-assets/${name}`;
  const [rating, setRating] = useState(5);
  const [selectedTags, setSelectedTags] = useState<string[]>(["친절해요"]);
  const [content, setContent] = useState("");
  const [photoNames, setPhotoNames] = useState<string[]>([]);

  const toggleTag = (tag: string) => {
    setSelectedTags((current) => (current.includes(tag) ? current.filter((item) => item !== tag) : [...current, tag]));
  };

  const submitReview = () => {
    const reviewText = content.trim() || `${selectedHelper?.name || "가치제공자"}님이 ${selectedTags.join(", ")}.`;
    onSubmitReview(reviewText);
  };

  return (
    <section className="guardian-review-write" aria-labelledby="guardian-review-title">
      <header className="review-write-header">
        <button type="button" onClick={onBack} aria-label="결제 화면으로 돌아가기">
          <img src={asset("figma-header-close.svg")} alt="" aria-hidden="true" />
        </button>
        <strong>가치이음</strong>
      </header>

      <main className="review-write-main">
        <section className="review-write-copy">
          <span>
            <img src={asset("review-thank-icon.png")} alt="" aria-hidden="true" />
          </span>
          <h1 id="guardian-review-title">
            이웃님께 감사의 마음을
            <br />
            전해주세요
          </h1>
          <p>따뜻한 후기는 가치제공자에게 큰 힘이 됩니다.</p>
        </section>

        <section className="review-write-card" aria-labelledby="review-rating-title">
          <h2 id="review-rating-title">서비스는 어떠셨나요?</h2>
          <div className="review-star-buttons" aria-label={`${rating}점`}>
            {[1, 2, 3, 4, 5].map((score) => (
              <button
                className={score <= rating ? "is-selected" : ""}
                type="button"
                key={score}
                onClick={() => setRating(score)}
                aria-label={`${score}점`}
              >
                ★
              </button>
            ))}
          </div>
        </section>

        <section className="review-write-card" aria-labelledby="review-tag-title">
          <h2 id="review-tag-title">어떤 점이 좋으셨나요? (다중 선택 가능)</h2>
          <div className="review-chip-row">
            {reviewTags.map((tag) => (
              <button className={selectedTags.includes(tag) ? "is-selected" : ""} type="button" key={tag} onClick={() => toggleTag(tag)}>
                {tag}
              </button>
            ))}
          </div>
        </section>

        <section className="review-write-card" aria-labelledby="review-photo-title">
          <h2 id="review-photo-title">사진을 함께 남겨주세요 (선택)</h2>
          <label className="review-photo-uploader">
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(event) => {
                const files = Array.from(event.target.files || []);
                setPhotoNames(files.map((file) => file.name));
              }}
            />
            <span aria-hidden="true">+</span>
            <strong>사진 추가</strong>
            <small>도움받은 물품, 장소, 완료 모습 등을 첨부할 수 있어요.</small>
          </label>
          {photoNames.length > 0 && (
            <ul className="review-photo-list" aria-label="첨부한 사진">
              {photoNames.map((name) => (
                <li key={name}>{name}</li>
              ))}
            </ul>
          )}
        </section>

        <section className="review-write-card" aria-labelledby="review-content-title">
          <h2 id="review-content-title">상세한 후기를 들려주세요 (선택)</h2>
          <textarea
            value={content}
            onChange={(event) => setContent(event.target.value)}
            placeholder="다른 보호자들에게 도움이 되는 따뜻한 경험을 나눠주세요."
          />
        </section>
      </main>

      <footer className="fixed-cta-bar">
        <button type="button" onClick={submitReview}>후기 등록하기</button>
      </footer>
    </section>
  );
}
