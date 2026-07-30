import { useState } from "react";
import type { CareRequest } from "../../types/careRequest";
import type { Helper } from "../../types/helper";
import { NotificationBell } from "./NotificationBell";

type GuardianScheduleStatusProps = {
  careRequest: CareRequest;
  selectedHelper?: Helper;
  onGoHome: () => void;
  onBackStatus: () => void;
  onOpenSearch: () => void;
  onOpenChat: () => void;
  onOpenProfile: () => void;
  onRepeatRequest: (helperId: string) => void;
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
  onOpenChat,
  onOpenProfile,
  onRepeatRequest
}: GuardianScheduleStatusProps) {
  const asset = (name: string) => `/figma-assets/${name}`;
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<MatchTab>("active");

  return (
    <section className="guardian-schedule" aria-labelledby="guardian-schedule-title">
      <header className="match-app-header">
        <h1 id="guardian-schedule-title">매칭현황</h1>
        <NotificationBell onOpenChat={onOpenChat} />
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
                  <b>인증 가치이웃</b>
                </div>
              )}

              <div className="match-card-actions">
                <button className="match-chat-button" type="button" onClick={onOpenChat}>
                  <img src={asset("icon-chat.svg")} alt="" aria-hidden="true" />
                  채팅하기
                </button>
                <button
                  className="match-detail-button"
                  type="button"
                  aria-controls="schedule-detail-panel"
                  aria-expanded={isDetailOpen}
                  onClick={() => setIsDetailOpen((current) => !current)}
                >
                  {isDetailOpen ? "상세 닫기" : "일정 상세"}
                </button>
              </div>
            </article>

            {isDetailOpen && (
              <div id="schedule-detail-panel">
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

                <section className="schedule-checklist" aria-labelledby="schedule-checklist-title">
                  <h2 id="schedule-checklist-title">확인할 내용</h2>
                  <ul>
                    <li>약속 시간과 장소를 다시 확인해 주세요.</li>
                    <li>필요한 준비물이나 전달 사항은 채팅으로 남겨 주세요.</li>
                    <li>진행 중에는 채팅과 진행 리포트에서 상태를 확인할 수 있습니다.</li>
                  </ul>
                </section>

                <section className="schedule-next-actions" aria-labelledby="schedule-next-title">
                  <h2 id="schedule-next-title">다음 행동</h2>
                  <p>일정이 맞다면 가치이웃에게 필요한 내용을 채팅으로 전달해 주세요.</p>
                  <div>
                    <button type="button" onClick={() => setIsDetailOpen(false)}>
                      접기
                    </button>
                    <button type="button" onClick={onOpenChat}>
                      채팅하기
                    </button>
                  </div>
                </section>
              </div>
            )}
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
                  <button className="match-result-secondary" type="button">
                    후기 보기
                  </button>
                )}
              </article>
            );
          })}
        </section>
      )}

      <nav className="search-bottom-nav schedule-bottom-nav" aria-label="하단 메뉴">
        <button type="button" onClick={onGoHome}>
          <img src={asset("icon-home-stroke.svg")} alt="" aria-hidden="true" />
          홈
        </button>
        <button type="button" onClick={onOpenSearch}>
          <img src={asset("icon-search.svg")} alt="" aria-hidden="true" />
          검색
        </button>
        <button className="is-active" type="button">
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
