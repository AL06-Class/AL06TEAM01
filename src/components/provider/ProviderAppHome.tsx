import { useState } from "react";
import {
  providerRequests,
  type ProviderCarePlan,
  type ProviderIncomingRequest,
  type ProviderPlanStep,
  type ProviderRequestStatus
} from "../../data/providerFlow";
import { NotificationBell } from "../applicant/NotificationBell";

type ProviderAppHomeProps = {
  onSwitchToGuardian: () => void;
};

type ProviderNavTab = "home" | "requests" | "schedule" | "profile";
type ProviderScreen = ProviderNavTab | "detail" | "plan" | "chat";

const defaultPlanSteps: ProviderPlanStep[] = [
  { title: "방문 전 연락", description: "출발 전 보호자에게 도착 예정 시간을 알려드립니다." },
  { title: "도착 및 상태 확인", description: "부모님을 만나 컨디션과 필요한 도움을 먼저 확인합니다." },
  { title: "도움 수행", description: "요청받은 도움을 차분하게 진행하고 중간 상황을 기록합니다." },
  { title: "완료 보고", description: "도움이 끝나면 보호자에게 완료 내용을 전달합니다." }
];

function createPlanDraft(request?: ProviderIncomingRequest): ProviderCarePlan {
  return (
    request?.plan || {
      id: `plan-${request?.id || "draft"}`,
      requestId: request?.id || "",
      providerId: request?.providerId || "provider-minseok",
      estimatedDuration: "2시간",
      steps: defaultPlanSteps,
      checklist: ["방문 전 연락", "신분 확인", "보호자 완료 보고"],
      messageToGuardian: "방문 전 연락드리고, 진행 상황은 채팅으로 꼼꼼히 공유드리겠습니다.",
      updatedAt: "2026-07-30"
    }
  );
}

function HomeIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 10.8 12 4l8 6.8V20a1 1 0 0 1-1 1h-4.5v-6h-5v6H5a1 1 0 0 1-1-1v-9.2Z" />
    </svg>
  );
}

function RequestIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 5h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-7l-5 4v-4H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z" />
    </svg>
  );
}

function ScheduleIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 3v3M17 3v3M4 9h16M6 5h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z" />
      <path d="M8 13h.01M12 13h.01M16 13h.01M8 17h.01M12 17h.01" />
    </svg>
  );
}

function ProfileIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM4 21a8 8 0 0 1 16 0" />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6 7h13l-1.4 8.2a2 2 0 0 1-2 1.7H8.4a2 2 0 0 1-2-1.7L5.2 3.8H3" />
      <path d="M9 21h.01M17 21h.01M9 11h8" />
    </svg>
  );
}

export function ProviderAppHome({ onSwitchToGuardian }: ProviderAppHomeProps) {
  const asset = (name: string) => `/figma-assets/${name}`;
  const [isRoleMenuOpen, setIsRoleMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<ProviderNavTab>("home");
  const [screen, setScreen] = useState<ProviderScreen>("home");
  const [requests, setRequests] = useState(providerRequests);
  const [selectedRequestId, setSelectedRequestId] = useState(providerRequests[0]?.id || "");
  const [rejectRequestId, setRejectRequestId] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const [planDraft, setPlanDraft] = useState<ProviderCarePlan>(() => createPlanDraft(providerRequests[0]));

  const selectedRequest = requests.find((request) => request.id === selectedRequestId) || requests[0];
  const newRequests = requests.filter((request) => request.status === "new");
  const acceptedRequests = requests.filter((request) => request.status === "accepted");
  const planNeededRequest = acceptedRequests.find((request) => !request.plan);

  const showToast = (message: string) => {
    setToastMessage(message);
    window.setTimeout(() => setToastMessage(""), 1400);
  };

  const goToTab = (tab: ProviderNavTab) => {
    setActiveTab(tab);
    setScreen(tab);
  };

  const openDetail = (request: ProviderIncomingRequest) => {
    setSelectedRequestId(request.id);
    setScreen("detail");
  };

  const openPlan = (request: ProviderIncomingRequest) => {
    setSelectedRequestId(request.id);
    setPlanDraft(createPlanDraft(request));
    setScreen("plan");
  };

  const updateRequestStatus = (requestId: string, status: ProviderRequestStatus) => {
    setRequests((current) => current.map((request) => (request.id === requestId ? { ...request, status } : request)));
    showToast(status === "accepted" ? "요청을 수락했습니다" : "요청을 거절했습니다");
  };

  const savePlan = () => {
    setRequests((current) =>
      current.map((request) =>
        request.id === selectedRequestId
          ? { ...request, status: "accepted", plan: { ...planDraft, requestId: request.id, updatedAt: "2026-07-30" } }
          : request
      )
    );
    setScreen("detail");
    showToast("보호자에게 보여줄 수행 계획이 저장되었습니다");
  };

  const addPlanStep = () => {
    setPlanDraft((current) => ({
      ...current,
      steps: [...current.steps, { title: `${current.steps.length + 1}단계`, description: "" }]
    }));
  };

  const removePlanStep = (index: number) => {
    setPlanDraft((current) => ({
      ...current,
      steps: current.steps.filter((_, stepIndex) => stepIndex !== index)
    }));
  };

  const roleHeader = (
    <header className="guardian-header">
      <div className="guardian-brand-row">
        <img className="guardian-logo-mark" src={asset("gachi-logo-icon.png")} alt="가치이음" />
        <div className="role-select-wrap">
          <button
            className="role-select-button"
            type="button"
            aria-haspopup="menu"
            aria-expanded={isRoleMenuOpen}
            onClick={() => setIsRoleMenuOpen((current) => !current)}
          >
            가치제공자
            <span aria-hidden="true" />
          </button>
          {isRoleMenuOpen && (
            <div className="role-select-menu" role="menu" aria-label="역할 선택">
              <button type="button" role="menuitem" onClick={onSwitchToGuardian}>
                보호자
              </button>
              <button className="is-active" type="button" role="menuitem" onClick={() => setIsRoleMenuOpen(false)}>
                가치제공자
              </button>
            </div>
          )}
        </div>
      </div>
      <NotificationBell className="icon-button" />
    </header>
  );

  const subHeader = (title: string, onBack: () => void) => (
    <header className="provider-app-subheader">
      <button type="button" onClick={onBack} aria-label="뒤로가기">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M15 18L9 12L15 6" />
        </svg>
      </button>
      <h1>{title}</h1>
      <span aria-hidden="true" />
    </header>
  );

  const requestCard = (request: ProviderIncomingRequest) => (
    <article className="provider-app-card provider-app-request-preview" key={request.id}>
      <span className="provider-app-badge">{request.status === "new" ? "응답 필요" : request.status === "accepted" ? "수락 완료" : "거절됨"}</span>
      <div className="provider-app-media-row">
        <span className="provider-app-round-icon provider-app-round-icon-square" aria-hidden="true">
          <CartIcon />
        </span>
        <div>
          <h3>{request.careType}</h3>
          <p className="provider-app-location">{request.region}</p>
        </div>
      </div>
      <dl className="provider-app-meta-list">
        <div>
          <dt>일시</dt>
          <dd>{request.date} {request.time}</dd>
        </div>
        <div>
          <dt>서비스 대상</dt>
          <dd>{request.parentName}님</dd>
        </div>
        <div>
          <dt>활동 보상</dt>
          <dd className="provider-app-money">{request.expectedPay.toLocaleString()}원</dd>
        </div>
      </dl>
      <div className="provider-app-note-box">
        <strong>보호자 유의사항</strong>
        <p>"{request.caution}"</p>
      </div>
      <p className="provider-app-fine">* {request.requestNote}</p>
      <div className="provider-app-split-actions">
        {request.status === "new" ? (
          <>
            <button type="button" className="provider-app-outline-button" onClick={() => setRejectRequestId(request.id)}>
              거절하기
            </button>
            <button
              type="button"
              className="provider-app-primary-button provider-app-no-margin"
              onClick={() => openDetail(request)}
            >
              요청 자세히 보기
            </button>
          </>
        ) : (
          <button
            type="button"
            className="provider-app-primary-button provider-app-no-margin provider-app-full-span"
            onClick={() => openDetail(request)}
          >
            상세 보기
          </button>
        )}
      </div>
    </article>
  );

  if (screen === "detail" && selectedRequest) {
    return (
      <section className="provider-app-home" aria-label="가치제공자 요청 상세">
        {subHeader("요청 상세", () => setScreen(activeTab))}
        <main className="provider-app-content">
          <section className="provider-app-card">
            <span className="provider-app-badge provider-app-badge-static">
              {selectedRequest.status === "new" ? "응답 필요" : selectedRequest.status === "accepted" ? "수락 완료" : "거절됨"}
            </span>
            <h2 className="provider-app-detail-title">{selectedRequest.careType}</h2>
            <p>{selectedRequest.parentName}님 · {selectedRequest.region}</p>
            <strong className="provider-app-detail-pay">{selectedRequest.expectedPay.toLocaleString()}원</strong>
          </section>

          <section className="provider-app-card">
            <h2>요청 정보</h2>
            <dl className="provider-app-meta-list">
              <div>
                <dt>보호자</dt>
                <dd>{selectedRequest.guardianName}</dd>
              </div>
              <div>
                <dt>방문 일정</dt>
                <dd>{selectedRequest.date} · {selectedRequest.time}</dd>
              </div>
              <div>
                <dt>방문 장소</dt>
                <dd>{selectedRequest.address}</dd>
              </div>
              <div>
                <dt>주의사항</dt>
                <dd>{selectedRequest.caution}</dd>
              </div>
            </dl>
          </section>

          <section className="provider-app-card">
            <h2>보호자 요청 내용</h2>
            <p>{selectedRequest.requestNote}</p>
          </section>

          <section className="provider-app-card">
            <h2>수행 계획 일정표</h2>
            {selectedRequest.plan ? (
              <ol className="provider-app-plan-summary">
                {selectedRequest.plan.steps.map((step) => (
                  <li key={`${step.title}-${step.description}`}>
                    <b>{step.title}</b>
                    <span>{step.description}</span>
                  </li>
                ))}
              </ol>
            ) : (
              <p>아직 보호자에게 보여줄 수행 계획이 없습니다.</p>
            )}
            <button type="button" className="provider-app-primary-button" onClick={() => openPlan(selectedRequest)}>
              {selectedRequest.plan ? "계획 수정하기" : "수행 계획 작성하기"}
            </button>
          </section>

          <div className="provider-app-split-actions">
            {selectedRequest.status === "new" ? (
              <>
                <button type="button" className="provider-app-outline-button" onClick={() => setRejectRequestId(selectedRequest.id)}>
                  거절하기
                </button>
                <button
                  type="button"
                  className="provider-app-primary-button provider-app-no-margin"
                  onClick={() => updateRequestStatus(selectedRequest.id, "accepted")}
                >
                  수락하기
                </button>
              </>
            ) : (
              <>
                <button type="button" className="provider-app-outline-button" onClick={() => setScreen("chat")}>
                  채팅하기
                </button>
                <button
                  type="button"
                  className="provider-app-primary-button provider-app-no-margin"
                  onClick={() => showToast("보호자에게 도착을 알렸어요")}
                >
                  도착 알림
                </button>
              </>
            )}
          </div>
        </main>
        {rejectSheet()}
        {toast()}
      </section>
    );
  }

  if (screen === "plan" && selectedRequest) {
    return (
      <section className="provider-app-home" aria-label="가치제공자 수행 계획 작성">
        {subHeader("수행 계획 작성", () => setScreen("detail"))}
        <main className="provider-app-content">
          <section className="provider-app-card">
            <h2>요청 요약</h2>
            <p>{selectedRequest.parentName}님 · {selectedRequest.careType}</p>
            <p className="provider-app-fine">{selectedRequest.date} {selectedRequest.time} · {selectedRequest.region}</p>
          </section>

          <label className="provider-app-field">
            전체 예상 소요 시간
            <input
              value={planDraft.estimatedDuration}
              onChange={(event) => setPlanDraft((current) => ({ ...current, estimatedDuration: event.target.value }))}
            />
          </label>

          <section aria-labelledby="provider-app-plan-steps-title">
            <div className="provider-app-title-row provider-app-title-row-between">
              <h2 id="provider-app-plan-steps-title">단계별 수행 계획</h2>
              <button type="button" className="provider-app-more-link" onClick={addPlanStep}>
                단계 추가
              </button>
            </div>
            {planDraft.steps.map((step, index) => (
              <article className="provider-app-card provider-app-plan-step-card" key={`${step.title}-${index}`}>
                <div className="provider-app-plan-step-head">
                  <span>{index + 1}</span>
                  <button type="button" onClick={() => removePlanStep(index)} disabled={planDraft.steps.length <= 1}>
                    삭제
                  </button>
                </div>
                <label className="provider-app-field">
                  단계 제목
                  <input
                    value={step.title}
                    onChange={(event) =>
                      setPlanDraft((current) => ({
                        ...current,
                        steps: current.steps.map((item, stepIndex) =>
                          stepIndex === index ? { ...item, title: event.target.value } : item
                        )
                      }))
                    }
                  />
                </label>
                <label className="provider-app-field">
                  수행 내용
                  <textarea
                    value={step.description}
                    onChange={(event) =>
                      setPlanDraft((current) => ({
                        ...current,
                        steps: current.steps.map((item, stepIndex) =>
                          stepIndex === index ? { ...item, description: event.target.value } : item
                        )
                      }))
                    }
                  />
                </label>
              </article>
            ))}
          </section>

          <label className="provider-app-field">
            준비물/확인사항
            <textarea
              value={planDraft.checklist.join(", ")}
              onChange={(event) =>
                setPlanDraft((current) => ({
                  ...current,
                  checklist: event.target.value
                    .split(",")
                    .map((item) => item.trim())
                    .filter(Boolean)
                }))
              }
            />
          </label>

          <label className="provider-app-field">
            보호자에게 전달할 메시지
            <textarea
              value={planDraft.messageToGuardian}
              onChange={(event) => setPlanDraft((current) => ({ ...current, messageToGuardian: event.target.value }))}
            />
          </label>

          <button type="button" className="provider-app-primary-button" onClick={savePlan}>
            계획 저장하기
          </button>
        </main>
        {toast()}
      </section>
    );
  }

  if (screen === "chat" && selectedRequest) {
    return (
      <section className="provider-app-home" aria-label="가치제공자 채팅">
        {subHeader(`보호자 ${selectedRequest.guardianName} 님`, () => setScreen("detail"))}
        <main className="provider-app-content provider-app-chat-content">
          <p className="provider-app-chat-system">채팅은 일정 조율과 요청사항 확인을 위한 공간입니다.</p>
          <div className="provider-app-bubble provider-app-bubble-other">
            <strong>보호자</strong>
            방문 전에 미리 연락 부탁드려요.
          </div>
          <div className="provider-app-bubble provider-app-bubble-mine">
            <strong>가치제공자</strong>
            네, 방문 전 연락드리고 진행 상황도 공유드리겠습니다.
          </div>
        </main>
      </section>
    );
  }

  if (screen === "requests") {
    return (
      <section className="provider-app-home" aria-label="가치제공자 요청">
        {roleHeader}
        <main className="provider-app-content">
          <h1 className="provider-app-screen-title">요청 목록</h1>
          {requests.length ? requests.map((request) => requestCard(request)) : (
            <p className="provider-app-empty">아직 들어온 요청이 없습니다.</p>
          )}
        </main>
        {bottomNav()}
        {rejectSheet()}
        {toast()}
      </section>
    );
  }

  if (screen === "schedule") {
    return (
      <section className="provider-app-home" aria-label="가치제공자 일정">
        {roleHeader}
        <main className="provider-app-content">
          <h1 className="provider-app-screen-title">일정</h1>
          {acceptedRequests.length ? (
            acceptedRequests.map((request) => (
              <article className="provider-app-card provider-app-schedule-card" key={request.id}>
                <div className="provider-app-media-row">
                  <span className="provider-app-round-icon" aria-hidden="true">
                    <CartIcon />
                  </span>
                  <div>
                    <h3>{request.careType}</h3>
                    <p>{request.parentName}님 · {request.date} {request.time}</p>
                  </div>
                </div>
                <button type="button" className="provider-app-primary-button" onClick={() => openDetail(request)}>
                  일정 상세
                </button>
              </article>
            ))
          ) : (
            <p className="provider-app-empty">아직 예정된 일정이 없습니다.</p>
          )}
        </main>
        {bottomNav()}
        {toast()}
      </section>
    );
  }

  if (screen === "profile") {
    return (
      <section className="provider-app-home" aria-label="가치제공자 내 정보">
        {roleHeader}
        <main className="provider-app-content">
          <section className="provider-app-card provider-app-profile-card">
            <div>
              <strong>김서은</strong>
              <span>가치제공자</span>
            </div>
            <p>가치이음과 함께 부모님을 돌보고 있습니다.</p>
          </section>

          <section className="provider-app-card provider-app-income-card">
            <span>이번 달 예상 수익</span>
            <strong>1,285,000원</strong>
            <small>정산 예정일 2026.08.05</small>
          </section>

          <section className="provider-app-menu-group" aria-label="내 정보 관리">
            {["프로필/자기소개 수정", "활동 지역/가능 업무 관리", "정산 계좌 관리", "고객 지원", "약관 및 정책"].map((label) => (
              <button type="button" key={label} onClick={() => showToast("추후 제공될 기능입니다")}>
                {label}
                <span aria-hidden="true">›</span>
              </button>
            ))}
          </section>
        </main>
        {bottomNav()}
        {toast()}
      </section>
    );
  }

  const todayRequest = acceptedRequests[0];
  const featuredRequest = newRequests[0] || requests.find((request) => request.status !== "rejected");

  function bottomNav() {
    return (
      <nav className="provider-app-bottom-nav" aria-label="가치제공자 하단 메뉴">
        <button type="button" className={activeTab === "home" ? "is-active" : ""} onClick={() => goToTab("home")}>
          <HomeIcon />
          홈
        </button>
        <button type="button" className={activeTab === "requests" ? "is-active" : ""} onClick={() => goToTab("requests")}>
          <RequestIcon />
          요청
        </button>
        <button type="button" className={activeTab === "schedule" ? "is-active" : ""} onClick={() => goToTab("schedule")}>
          <ScheduleIcon />
          일정
        </button>
        <button type="button" className={activeTab === "profile" ? "is-active" : ""} onClick={() => goToTab("profile")}>
          <ProfileIcon />
          내 정보
        </button>
      </nav>
    );
  }

  function rejectSheet() {
    if (!rejectRequestId) {
      return null;
    }

    const reject = (reason: string) => {
      updateRequestStatus(rejectRequestId, "rejected");
      setRejectRequestId("");
    };

    return (
      <div className="profile-sheet-backdrop" role="presentation" onClick={() => setRejectRequestId("")}>
        <section className="provider-reject-sheet" role="dialog" aria-modal="true" onClick={(event) => event.stopPropagation()}>
          <div className="profile-setting-head">
            <h2>거절 사유 선택</h2>
            <button type="button" onClick={() => setRejectRequestId("")} aria-label="닫기">
              ×
            </button>
          </div>
          <button type="button" onClick={() => reject("일정이 맞지 않아요")}>
            일정이 맞지 않아요
          </button>
          <button type="button" onClick={() => reject("도움 유형이 맞지 않아요")}>
            도움 유형이 맞지 않아요
          </button>
          <button type="button" onClick={() => reject("이동 거리가 멀어요")}>
            이동 거리가 멀어요
          </button>
        </section>
      </div>
    );
  }

  function toast() {
    return toastMessage ? (
      <p className="provider-toast" role="status">
        {toastMessage}
      </p>
    ) : null;
  }

  return (
    <section className="provider-app-home" aria-label="가치제공자 홈">
      {roleHeader}

      <main className="provider-app-content">
        <section className="provider-app-welcome">
          <h1>안녕하세요, 민수님!</h1>
          <p>오늘도 따뜻한 가치를 전달해 주세요.</p>
        </section>

        <section aria-labelledby="provider-app-schedule-title">
          <div className="provider-app-title-row">
            <ScheduleIcon />
            <h2 id="provider-app-schedule-title">오늘의 일정</h2>
          </div>
          {todayRequest ? (
            <article className="provider-app-card provider-app-schedule-card">
              <div className="provider-app-media-row">
                <span className="provider-app-round-icon" aria-hidden="true">
                  <CartIcon />
                </span>
                <div>
                  <h3>{todayRequest.careType}</h3>
                  <p>{todayRequest.parentName}님 · {todayRequest.time}</p>
                </div>
              </div>
              <div className="provider-app-two-buttons">
                <button type="button" className="provider-app-soft-button" onClick={() => openDetail(todayRequest)}>
                  채팅
                </button>
                <button type="button" className="provider-app-soft-button" onClick={() => openDetail(todayRequest)}>
                  상세보기
                </button>
              </div>
              <button
                type="button"
                className="provider-app-primary-button"
                onClick={() => showToast("보호자에게 도착을 알렸어요")}
              >
                도착 알림
              </button>
            </article>
          ) : (
            <p className="provider-app-empty">아직 오늘 예정된 일정이 없습니다.</p>
          )}
        </section>

        {planNeededRequest && (
          <aside className="provider-app-deadline-card">
            <span className="provider-app-alert-bubble" aria-hidden="true">
              !
            </span>
            <p>
              <strong>서비스 계획서 작성 마감 알림</strong>
              <br />
              다음 도움을 위해 계획서가 필요합니다.
            </p>
            <button type="button" onClick={() => openPlan(planNeededRequest)}>
              작성하기
            </button>
          </aside>
        )}

        <section aria-labelledby="provider-app-request-title">
          <div className="provider-app-title-row provider-app-title-row-between">
            <div>
              <RequestIcon />
              <h2 id="provider-app-request-title">새로운 서비스 요청</h2>
            </div>
            <button type="button" className="provider-app-more-link" onClick={() => goToTab("requests")}>
              전체보기
            </button>
          </div>
          {featuredRequest ? requestCard(featuredRequest) : (
            <p className="provider-app-empty">새로운 요청이 없습니다.</p>
          )}
        </section>
      </main>

      {bottomNav()}
      {rejectSheet()}
      {toast()}
    </section>
  );
}
