import { useState } from "react";
import { SERVICE_NAME } from "../../constants";
import type { CareRequest } from "../../types/careRequest";
import type { Helper } from "../../types/helper";

type GuardianCompletionReviewProps = {
  careRequest: CareRequest;
  selectedHelper?: Helper;
  onBackProgress: () => void;
  onGoHome: () => void;
  onOpenSearch: () => void;
  onOpenMatch: () => void;
  onOpenProfile: () => void;
  onRequestAgain: () => void;
  onSaveReview: (content: string) => void;
};

export function GuardianCompletionReview({
  careRequest,
  selectedHelper,
  onBackProgress,
  onGoHome,
  onOpenSearch,
  onOpenMatch,
  onOpenProfile,
  onRequestAgain,
  onSaveReview
}: GuardianCompletionReviewProps) {
  const [reviewContent, setReviewContent] = useState("");
  const [isSaved, setIsSaved] = useState(false);
  const asset = (name: string) => `/figma-assets/${name}`;

  const handleSaveReview = () => {
    const trimmedReview = reviewContent.trim();

    if (!trimmedReview) {
      return;
    }

    onSaveReview(trimmedReview);
    setIsSaved(true);
  };

  return (
    <section className="guardian-completion" aria-labelledby="guardian-completion-title">
      <p className="search-context-label">완료 확인</p>

      <header className="guardian-search-header">
        <button className="search-back-button" type="button" onClick={onBackProgress} aria-label="진행 리포트로 돌아가기">
          ←
        </button>
        <strong>{SERVICE_NAME}</strong>
        <button className="search-bell-button" type="button" aria-label="알림">
          <img src={asset("icon-bell.svg")} alt="" aria-hidden="true" />
        </button>
      </header>

      <section className="completion-hero-card" aria-labelledby="guardian-completion-title">
        <span>완료 확인 대기</span>
        <h1 id="guardian-completion-title">
          오늘의 도움을
          <br />
          확인해주세요
        </h1>
        <p>완료 확인과 후기를 남기면 다음 요청 때 더 좋은 기준으로 매칭할 수 있습니다.</p>
      </section>

      {selectedHelper && (
        <article className="completion-provider-card">
          <img src={selectedHelper.imageUrl} alt="" />
          <div>
            <span>함께한 가치이웃</span>
            <strong>{selectedHelper.name}</strong>
            <p>
              {careRequest.careType} · {careRequest.region}
            </p>
          </div>
          <b>완료</b>
        </article>
      )}

      <section className="completion-summary-card" aria-labelledby="completion-summary-title">
        <h2 id="completion-summary-title">완료 내용</h2>
        <ul>
          <li>요청한 생활 도움이 예정 시간 안에 진행되었습니다.</li>
          <li>약속 장소 이동과 필요한 준비 사항을 함께 확인했습니다.</li>
          <li>민감 정보와 사진 자료는 공개하지 않았습니다.</li>
        </ul>
      </section>

      <section className="completion-review-card" aria-labelledby="completion-review-title">
        <h2 id="completion-review-title">후기 남기기</h2>
        <div className="completion-stars" aria-label="평점 5점">
          ★★★★★
        </div>
        <textarea
          rows={4}
          value={reviewContent}
          onChange={(event) => {
            setReviewContent(event.target.value);
            setIsSaved(false);
          }}
          placeholder="어떤 점이 좋았는지 짧게 남겨주세요."
        />
        <button type="button" onClick={handleSaveReview}>
          {isSaved ? "후기 저장 완료" : "후기 저장하기"}
        </button>
      </section>

      <nav className="completion-bottom-actions completion-inline-actions" aria-label="완료 화면 작업">
        <button type="button" onClick={onRequestAgain}>
          다시 요청
        </button>
        <button type="button" onClick={onGoHome}>
          홈으로
        </button>
      </nav>

      <nav className="search-bottom-nav completion-bottom-nav" aria-label="하단 메뉴">
        <button type="button" onClick={onGoHome}>
          <img src={asset("icon-home.svg")} alt="" aria-hidden="true" />
          홈
        </button>
        <button type="button" onClick={onOpenSearch}>
          <img src={asset("icon-search.svg")} alt="" aria-hidden="true" />
          검색
        </button>
        <button className="is-active" type="button" onClick={onOpenMatch}>
          <img src={asset("icon-match.svg")} alt="" aria-hidden="true" />
          매칭현황
        </button>
        <button type="button" onClick={onOpenProfile}>
          <img src={asset("icon-user.svg")} alt="" aria-hidden="true" />
          내 정보
        </button>
      </nav>
    </section>
  );
}
