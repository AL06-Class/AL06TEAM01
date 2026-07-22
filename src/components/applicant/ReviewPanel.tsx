import { useState } from "react";
import type { Review } from "../../types/review";

type ReviewPanelProps = {
  reviews: Review[];
  onSaveReview: (content: string) => void;
};

export function ReviewPanel({ reviews, onSaveReview }: ReviewPanelProps) {
  const [isWriting, setIsWriting] = useState(false);
  const [reviewContent, setReviewContent] = useState("");

  const handleSaveReview = () => {
    const trimmedReview = reviewContent.trim();

    if (!trimmedReview) {
      return;
    }

    onSaveReview(trimmedReview);
    setReviewContent("");
    setIsWriting(false);
  };

  return (
    <section className="section-card compact-card" id="reviews" aria-labelledby="review-panel-title">
      <div className="section-card-header">
        <p className="section-kicker">후기 & 신뢰</p>
        <h2 id="review-panel-title">생활 도움 후기</h2>
      </div>

      <div className="rating-summary" aria-label="평점 5점 만점에 5점">
        <span aria-hidden="true">★★★★★</span>
        <strong>5.0</strong>
      </div>

      <ul className="review-list">
        {reviews.map((review) => (
          <li key={review.id}>
            <span aria-label={`평점 ${review.rating}점`}>★★★★★</span>
            <p>{review.content}</p>
          </li>
        ))}
      </ul>

      {isWriting ? (
        <div className="review-form">
          <label htmlFor="review-content">후기 내용</label>
          <textarea
            id="review-content"
            rows={3}
            placeholder="후기를 입력하세요"
            value={reviewContent}
            onChange={(event) => setReviewContent(event.target.value)}
          />
          <div className="button-row">
            <button className="primary-button" type="button" onClick={handleSaveReview}>
              저장하기
            </button>
            <button className="secondary-button" type="button" onClick={() => setIsWriting(false)}>
              취소
            </button>
          </div>
        </div>
      ) : (
        <button className="primary-button full-button" type="button" onClick={() => setIsWriting(true)}>
          후기 작성하기
        </button>
      )}
    </section>
  );
}
