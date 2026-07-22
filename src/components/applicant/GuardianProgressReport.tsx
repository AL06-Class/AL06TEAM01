import { SERVICE_NAME } from "../../constants";
import type { CareReportItem } from "../../types/careReport";
import type { CareRequest } from "../../types/careRequest";
import type { Helper } from "../../types/helper";

type GuardianProgressReportProps = {
  careRequest: CareRequest;
  reportItems: CareReportItem[];
  selectedHelper?: Helper;
  onBackChat: () => void;
  onGoHome: () => void;
  onOpenSearch: () => void;
  onOpenMatch: () => void;
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
  onOpenProfile,
  onComplete
}: GuardianProgressReportProps) {
  const asset = (name: string) => `/figma-assets/${name}`;

  return (
    <section className="guardian-progress" aria-labelledby="guardian-progress-title">
      <p className="search-context-label">진행 리포트</p>

      <header className="guardian-search-header">
        <button className="search-back-button" type="button" onClick={onBackChat} aria-label="채팅으로 돌아가기">
          ←
        </button>
        <strong>{SERVICE_NAME}</strong>
        <button className="search-bell-button" type="button" aria-label="알림">
          <img src={asset("icon-bell.svg")} alt="" aria-hidden="true" />
        </button>
      </header>

      <section className="progress-hero-card" aria-labelledby="guardian-progress-title">
        <span>진행 중</span>
        <h1 id="guardian-progress-title">
          생활 도움이
          <br />
          차분히 진행되고 있어요
        </h1>
        <p>보호자가 안심할 수 있도록 필요한 기록만 시간순으로 남깁니다.</p>
      </section>

      {selectedHelper && (
        <article className="progress-provider-card">
          <img src={selectedHelper.imageUrl} alt="" />
          <div>
            <span>진행 중인 가치이웃</span>
            <strong>{selectedHelper.name}</strong>
            <p>
              {careRequest.date} · {careRequest.time}
            </p>
          </div>
          <b>진행</b>
        </article>
      )}

      <ol className="guardian-progress-timeline" aria-label="진행 기록">
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
        <strong>기록 원칙</strong>
        <p>완료 확인에 필요한 내용만 남기며, 사진이나 민감 정보는 보호자 확인 없이 공개하지 않습니다.</p>
      </section>

      <button className="guardian-request-submit progress-inline-submit" type="button" onClick={onComplete}>
        완료 확인으로 이동
      </button>

      <nav className="search-bottom-nav progress-bottom-nav" aria-label="하단 메뉴">
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
