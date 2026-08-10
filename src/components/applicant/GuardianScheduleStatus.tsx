import { useState } from "react";
import type { CareReportItem } from "../../types/careReport";
import type { CareRequest } from "../../types/careRequest";
import type { Helper } from "../../types/helper";
import { NotificationBell } from "./NotificationBell";

type GuardianScheduleStatusProps = {
  careRequest: CareRequest;
  selectedHelper?: Helper;
  onGoHome: () => void;
  onBackStatus: () => void;
  onOpenSearch: () => void;
  onOpenMatch: () => void;
  onOpenChat: () => void;
  onOpenProgress: () => void;
  onOpenProfile: () => void;
  onRepeatRequest: (helperId: string) => void;
  onOpenReview: () => void;
  reportItems: CareReportItem[];
};

type MatchTab = "active" | "history";

const historyItems = [
  {
    helperId: "provider-minseok",
    status: "completed",
    date: "2024.05.04 (토) 오전 10:00",
    title: "병원 검진 동행",
    partner: "김민석",
    location: "제주시 조천읍",
    price: "30,000원"
  },
  {
    helperId: "provider-kim",
    status: "completed",
    date: "2024.04.28 (일) 오후 1:00",
    title: "식사 지원 및 말벗",
    partner: "김지연",
    location: "제주시 인화동",
    price: "15,000원"
  },
  {
    helperId: "provider-lee",
    status: "cancelled",
    date: "2024.04.22 (월) 오후 4:00",
    title: "오후 산책 동행",
    partner: "최하늘",
    location: "제주시 노형동",
    price: "20,000원"
  }
];

export function GuardianScheduleStatus({
  careRequest,
  selectedHelper,
  onGoHome,
  onOpenSearch,
  onOpenMatch,
  onOpenChat,
  onOpenProgress,
  onOpenProfile,
  onRepeatRequest,
  onOpenReview,
  reportItems
}: GuardianScheduleStatusProps) {
  const asset = (name: string) => `/figma-assets/${name}`;
  const [activeTab, setActiveTab] = useState<MatchTab>("active");

  return (
    <section className="guardian-schedule" aria-labelledby="guardian-schedule-title">
      <header className="match-app-header">
        <h1 id="guardian-schedule-title">매칭현황</h1>
        <NotificationBell onOpenChat={onOpenChat} onOpenMatch={onOpenMatch} onOpenProgress={onOpenProgress} />
      </header>

      <div className="match-tabs" aria-label="매칭 상태">
        <button
          className={activeTab === "active" ? "is-active" : ""}
          type="button"
          onClick={() => setActiveTab("active")}
        >
          진행 중(1)
        </button>
        <button
          className={activeTab === "history" ? "is-active" : ""}
          type="button"
          onClick={() => setActiveTab("history")}
        >
          완료/취소
        </button>
      </div>

      {activeTab === "active" ? (
        <>
          <section className="match-current-section" aria-labelledby="match-current-title">
            <h2 id="match-current-title">현재 진행 중인 요청</h2>
            <article className="match-current-card">
              <div className="match-card-meta">
                <span>요청 수락 완료</span>
                <small>No. 240508-01</small>
              </div>
              <h3>
                내일 오후 2시 · {careRequest.careType}
              </h3>
              <p>{careRequest.region || "제주시 조천읍"}</p>

              {selectedHelper && (
                <div className="match-partner-strip">
                  <img src={selectedHelper.imageUrl} alt="" />
                  <div>
                    <strong>{selectedHelper.name}</strong>
                    <span>매칭 {selectedHelper.completedCount}회 · ★ {selectedHelper.rating.toFixed(1)}</span>
                  </div>
                </div>
              )}

              <div className="match-card-actions">
                <button className="match-chat-button" type="button" onClick={onOpenChat}>
                  <img src={asset("icon-chat.svg")} alt="" aria-hidden="true" />
                  채팅하기
                </button>
              </div>
            </article>

            <section className="schedule-detail-card" aria-labelledby="schedule-detail-title">
              <h2 id="schedule-detail-title">일정 상세</h2>
              <dl>
                <div>
                  <dt>도움 유형</dt>
                  <dd>{careRequest.careType}</dd>
                </div>
                <div>
                  <dt>일정</dt>
                  <dd>
                    {careRequest.date} · {careRequest.time}
                  </dd>
                </div>
                <div>
                  <dt>장소</dt>
                  <dd>{careRequest.region}</dd>
                </div>
                <div>
                  <dt>가치이웃</dt>
                  <dd>{selectedHelper?.name || "매칭 대기"}</dd>
                </div>
              </dl>
            </section>

            <section className="schedule-report-card" aria-labelledby="schedule-report-title">
              <h2 id="schedule-report-title">예상 계획리포트</h2>
              <p className="schedule-report-note">
                가치제공자가 아직 계획리포트를 작성하기 전이에요. 현재 내용은 요청 정보를 바탕으로 한 예상 계획이에요.
              </p>
              <ol>
                {reportItems.map((item) => (
                  <li key={`${item.time}-${item.label}`}>
                    <time>{item.time}</time>
                    <div>
                      <strong>{item.label}</strong>
                      {item.description && <p>{item.description}</p>}
                    </div>
                  </li>
                ))}
              </ol>
            </section>
          </section>

          <section className="match-history-section" aria-labelledby="match-history-title">
            <h2 id="match-history-title">최근 매칭 이력</h2>
            {historyItems.slice(0, 3).map((item) => (
              <article className="match-history-card" key={item.title}>
                <span className="match-history-icon">
                  <img src={asset(item.status === "completed" ? "icon-verified.svg" : "icon-history.svg")} alt="" aria-hidden="true" />
                </span>
                <div>
                  <strong>{item.title}</strong>
                  <small>가치이웃 · {item.partner}</small>
                </div>
                <time>{item.date.split(" ")[0]}</time>
                <b aria-hidden="true">›</b>
              </article>
            ))}
            <button className="match-history-more" type="button" onClick={() => setActiveTab("history")}>
              전체 이력 보기
            </button>
          </section>
        </>
      ) : (
        <section className="match-history-detail-section" aria-label="완료 및 취소 내역">
          {historyItems.map((item) => {
            const isCancelled = item.status === "cancelled";

            return (
              <article className={`match-result-card ${isCancelled ? "is-cancelled" : ""}`} key={item.title}>
                <div className="match-result-top">
                  <span className={isCancelled ? "cancelled" : "completed"}>
                    {isCancelled ? "취소됨" : "완료"}
                  </span>
                  <time>{item.date}</time>
                </div>

                <div className="match-result-body">
                  <h2>{item.title}</h2>
                  <p>
                    <img src={asset("icon-user.svg")} alt="" aria-hidden="true" />
                    파트너: {item.partner}
                  </p>
                  <p>
                    <img src={asset("icon-location-figma.png")} alt="" aria-hidden="true" />
                    {item.location}
                  </p>
                  <strong>
                    <span aria-hidden="true">₩</span>
                    {item.price}
                  </strong>
                </div>

                {isCancelled ? (
                  <button className="match-result-primary" type="button" onClick={() => onRepeatRequest(item.helperId)}>
                    다시 요청
                  </button>
                ) : (
                  <button className="match-result-secondary" type="button" onClick={onOpenReview}>
                    후기 쓰기
                  </button>
                )}
              </article>
            );
          })}
        </section>
      )}

      <nav className="search-bottom-nav schedule-bottom-nav" aria-label="하단 메뉴">
        <button type="button" onClick={onGoHome}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M4 10.8 12 4l8 6.8V20a1 1 0 0 1-1 1h-4.5v-6h-5v6H5a1 1 0 0 1-1-1v-9.2Z" />
          </svg>
          홈
        </button>
        <button type="button" onClick={onOpenSearch}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="11" cy="11" r="7" />
            <path d="M21 21l-4.3-4.3" />
          </svg>
          검색
        </button>
        <button className="is-active" type="button">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
          매칭현황
        </button>
        <button type="button" onClick={onOpenProfile}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM4 21a8 8 0 0 1 16 0" />
          </svg>
          내 정보
        </button>
      </nav>
    </section>
  );
}
