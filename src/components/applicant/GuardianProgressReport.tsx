import type { CareReportItem } from "../../types/careReport";
import type { CareRequest } from "../../types/careRequest";
import type { Helper } from "../../types/helper";
import { NotificationBell } from "./NotificationBell";

type GuardianProgressReportProps = {
  careRequest: CareRequest;
  reportItems: CareReportItem[];
  selectedHelper?: Helper;
  onBackChat: () => void;
  onGoHome: () => void;
  onOpenSearch: () => void;
  onOpenMatch: () => void;
  onOpenChat: () => void;
  onOpenProgress: () => void;
  onOpenProfile: () => void;
  onComplete: () => void;
};

export function GuardianProgressReport({
  careRequest,
  reportItems,
  selectedHelper,
  onBackChat,
  onGoHome,
  onOpenSearch,
  onOpenMatch,
  onOpenChat,
  onOpenProgress,
  onOpenProfile,
  onComplete
}: GuardianProgressReportProps) {
  const asset = (name: string) => `/figma-assets/${name}`;
  const visitSchedule = [careRequest.date, careRequest.time].filter(Boolean).join(" · ");

  return (
    <section className="guardian-progress" aria-labelledby="guardian-progress-title">
      <p className="search-context-label">예상 계획리포트</p>

      <header className="guardian-search-header">
        <button className="search-back-button" type="button" onClick={onBackChat} aria-label="이전 화면으로 돌아가기">
          <svg aria-hidden="true" viewBox="0 0 24 24">
            <path d="M15 18L9 12L15 6" />
          </svg>
        </button>
        <strong>예상 계획리포트</strong>
        <NotificationBell onOpenChat={onOpenChat} onOpenMatch={onOpenMatch} onOpenProgress={onOpenProgress} />
      </header>

      <section className="progress-hero-card" aria-labelledby="guardian-progress-title">
        <span>작성 대기 중</span>
        <h1 id="guardian-progress-title">
          아직 계획리포트가
          <br />
          작성되기 전이에요
        </h1>
        <p>아래 내용은 요청 정보를 바탕으로 정리한 예상 계획이에요. 가치제공자가 확인하면 실제 계획리포트로 업데이트돼요.</p>
      </section>

      {selectedHelper && (
        <article className="progress-provider-card">
          <img src={selectedHelper.imageUrl} alt="" />
          <div>
            <span>계획 작성 예정 가치이웃</span>
            <strong>{selectedHelper.name}</strong>
            {visitSchedule && <p>{visitSchedule}</p>}
          </div>
          <b>대기</b>
        </article>
      )}

      <ol className="guardian-progress-timeline" aria-label="예상 계획">
        {reportItems.map((item, index) => (
          <li className={index === reportItems.length - 1 ? "is-current" : ""} key={`${item.time}-${item.label}`}>
            <time>{item.time}</time>
            <div>
              <strong>{item.label}</strong>
              {item.description && <p>{item.description}</p>}
            </div>
          </li>
        ))}
      </ol>

      <section className="progress-privacy-note" aria-label="개인정보 안내">
        <strong>안내</strong>
        <p>가치제공자가 계획리포트를 작성하면 방문 전 준비사항과 진행 순서를 다시 확인할 수 있어요.</p>
      </section>

      <button className="guardian-request-submit progress-inline-submit" type="button" onClick={onComplete}>
        완료 확인으로 이동
      </button>

      <nav className="search-bottom-nav progress-bottom-nav" aria-label="하단 메뉴">
        <button type="button" onClick={onGoHome}>
          <img src={asset("icon-home-stroke.svg")} alt="" aria-hidden="true" />
          홈
        </button>
        <button type="button" onClick={onOpenSearch}>
          <img src={asset("icon-search.svg")} alt="" aria-hidden="true" />
          검색
        </button>
        <button className="is-active" type="button" onClick={onOpenMatch}>
          <img className="nav-match-icon" src={asset("icon-match-nav-source.png")} alt="" aria-hidden="true" />
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
