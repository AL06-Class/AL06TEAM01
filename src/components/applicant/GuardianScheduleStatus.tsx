import { SERVICE_NAME } from "../../constants";
import type { CareRequest } from "../../types/careRequest";
import type { Helper } from "../../types/helper";

type GuardianScheduleStatusProps = {
  careRequest: CareRequest;
  selectedHelper?: Helper;
  onGoHome: () => void;
  onBackStatus: () => void;
  onOpenSearch: () => void;
  onOpenChat: () => void;
  onOpenProfile: () => void;
};

export function GuardianScheduleStatus({
  careRequest,
  selectedHelper,
  onGoHome,
  onOpenSearch,
  onOpenChat,
  onOpenProfile
}: GuardianScheduleStatusProps) {
  const asset = (name: string) => `/figma-assets/${name}`;

  return (
    <section className="guardian-schedule" aria-labelledby="guardian-schedule-title">
      <header className="match-app-header">
        <h1 id="guardian-schedule-title">매칭현황</h1>
        <button className="search-bell-button" type="button" aria-label="알림">
          <img src={asset("icon-bell.svg")} alt="" aria-hidden="true" />
        </button>
      </header>

      <div className="match-tabs" aria-label="매칭 상태">
        <button className="is-active" type="button">진행 중(1)</button>
        <button type="button">완료/취소</button>
      </div>

      <section className="match-current-section" aria-labelledby="match-current-title">
        <h2 id="match-current-title">현재 진행 중인 요청</h2>
        <article className="match-current-card">
          <div className="match-card-meta">
            <span>요청 수락 완료</span>
            <small>No. 240508-01</small>
          </div>
          <h3>
            내일 오후 2시 {careRequest.careType}
          </h3>
          <p>{careRequest.region || "서울시 서초구 반포대로 123 (본가)"}</p>

          {selectedHelper && (
            <div className="match-partner-strip">
              <img src={selectedHelper.imageUrl} alt="" />
              <div>
                <strong>{selectedHelper.name}</strong>
                <span>매칭 {selectedHelper.completedCount}회 · ★{selectedHelper.rating.toFixed(1)}</span>
              </div>
              <b>인증 가치이웃</b>
            </div>
          )}

          <div className="match-card-actions">
            <button className="match-chat-button" type="button" onClick={onOpenChat}>
              <img src={asset("icon-chat.svg")} alt="" aria-hidden="true" />
              채팅하기
            </button>
            <button className="match-detail-button" type="button">
              일정 상세
            </button>
          </div>
        </article>
      </section>

      <section className="match-history-section" aria-labelledby="match-history-title">
        <h2 id="match-history-title">과거 매칭 이력</h2>
        {[
          ["정기 병원 검진 동행", "가치이웃: 이행복", "2024.05.04", "icon-plus.svg"],
          ["식사 지원 및 말벗", "가치이웃: 김가치", "2024.04.28", "icon-match.svg"],
          ["오후 산책 동행", "가치이웃: 최든든", "2024.04.22", "icon-user.svg"]
        ].map(([title, partner, date, icon]) => (
          <article className="match-history-card" key={title}>
            <span className="match-history-icon">
              <img src={asset(icon)} alt="" aria-hidden="true" />
            </span>
            <div>
              <strong>{title}</strong>
              <small>{partner}</small>
            </div>
            <time>{date}</time>
            <b aria-hidden="true">›</b>
          </article>
        ))}
        <button className="match-history-more" type="button">전체 이력 보기</button>
      </section>

      <nav className="search-bottom-nav schedule-bottom-nav" aria-label="하단 메뉴">
        <button type="button" onClick={onGoHome}>
          <img src={asset("icon-home.svg")} alt="" aria-hidden="true" />
          홈
        </button>
        <button type="button" onClick={onOpenSearch}>
          <img src={asset("icon-search.svg")} alt="" aria-hidden="true" />
          검색
        </button>
        <button className="is-active" type="button">
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
