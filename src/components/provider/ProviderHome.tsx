import { useMemo, useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import {
  providerRequests,
  type ProviderCarePlan,
  type ProviderIncomingRequest,
  type ProviderPlanStep,
  type ProviderRequestStatus
} from "../../data/providerFlow";
import { NotificationBell } from "../applicant/NotificationBell";

type ProviderHomeProps = {
  onSwitchToGuardian: () => void;
};

type ProviderScreen = "home" | "detail" | "plan";

const defaultPlanSteps: ProviderPlanStep[] = [
  { title: "방문 전 연락", description: "출발 전 보호자에게 도착 예정 시간을 알려드립니다." },
  { title: "도착 및 상태 확인", description: "부모님을 만나 컨디션과 필요한 도움을 먼저 확인합니다." },
  { title: "도움 수행", description: "요청받은 도움을 차분하게 진행하고 중간 상황을 기록합니다." },
  { title: "완료 보고", description: "도움이 끝나면 보호자에게 완료 내용을 전달합니다." }
];

export function ProviderHome({ onSwitchToGuardian }: ProviderHomeProps) {
  const asset = (name: string) => `/figma-assets/${name}`;
  const [screen, setScreen] = useState<ProviderScreen>("home");
  const [requests, setRequests] = useState(providerRequests);
  const [selectedRequestId, setSelectedRequestId] = useState(providerRequests[0]?.id || "");
  const [rejectRequestId, setRejectRequestId] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const [planDraft, setPlanDraft] = useState<ProviderCarePlan>(() => createPlanDraft(providerRequests[0]));
  const [isRoleMenuOpen, setIsRoleMenuOpen] = useState(false);

  const selectedRequest = requests.find((request) => request.id === selectedRequestId) || requests[0];
  const newRequests = requests.filter((request) => request.status === "new");
  const acceptedRequests = requests.filter((request) => request.status === "accepted");
  const planNeededCount = acceptedRequests.filter((request) => !request.plan).length;
  const completedCount = 18;
  const monthlyEarning = 324000;

  const visibleNewRequests = useMemo(
    () => newRequests.length ? newRequests : requests.filter((request) => request.status !== "rejected").slice(0, 1),
    [newRequests, requests]
  );

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
    setRequests((current) =>
      current.map((request) => (request.id === requestId ? { ...request, status } : request))
    );
    setToastMessage(status === "accepted" ? "요청을 수락했습니다" : "요청을 거절했습니다");
    window.setTimeout(() => setToastMessage(""), 1200);
  };

  const savePlan = () => {
    setRequests((current) =>
      current.map((request) =>
        request.id === selectedRequestId
          ? {
              ...request,
              status: "accepted",
              plan: {
                ...planDraft,
                requestId: request.id,
                updatedAt: "2026-07-30"
              }
            }
          : request
      )
    );
    setToastMessage("보호자에게 보여줄 수행 계획이 저장되었습니다");
    setScreen("detail");
    window.setTimeout(() => setToastMessage(""), 1400);
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

  return (
    <section className="provider-home" aria-labelledby="provider-home-title">
      {screen === "home" ? (
        <>
          <header className="provider-header">
            <div className="provider-header-main">
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
              <h1 id="provider-home-title">김민석님, 오늘 할 일</h1>
            </div>
            <NotificationBell iconName="profile-icon-bell.svg" />
          </header>

          <main className="provider-content">
            <section className="provider-summary-grid" aria-label="오늘 요약">
              <article>
                <span>새 요청</span>
                <strong>{newRequests.length}건</strong>
              </article>
              <article>
                <span>오늘 일정</span>
                <strong>{acceptedRequests.length}건</strong>
              </article>
              <article>
                <span>계획 필요</span>
                <strong>{planNeededCount}건</strong>
              </article>
            </section>

            <section className="provider-section" aria-labelledby="provider-new-request-title">
              <div className="provider-section-head">
                <h2 id="provider-new-request-title">새로 들어온 요청</h2>
                <small>빠르게 확인하고 응답해 주세요</small>
              </div>
              {visibleNewRequests.map((request) => (
                <article className="provider-request-card" key={request.id}>
                  <div className="provider-request-meta">
                    <span>{request.status === "new" ? "새 요청" : "확인된 요청"}</span>
                    <strong>{request.expectedPay.toLocaleString()}원</strong>
                  </div>
                  <h3>{request.careType}</h3>
                  <p>{request.region} · {request.date} {request.time}</p>
                  <blockquote>{request.requestNote}</blockquote>
                  <div className="provider-card-actions">
                    <button type="button" onClick={() => openDetail(request)}>상세 보기</button>
                    {request.status === "new" && (
                      <>
                        <button type="button" onClick={() => setRejectRequestId(request.id)}>거절</button>
                        <button type="button" onClick={() => updateRequestStatus(request.id, "accepted")}>수락</button>
                      </>
                    )}
                  </div>
                </article>
              ))}
            </section>

            <section className="provider-section" aria-labelledby="provider-schedule-title">
              <div className="provider-section-head">
                <h2 id="provider-schedule-title">오늘 예정된 일정</h2>
                <small>수락한 요청이 여기에 보여요</small>
              </div>
              {acceptedRequests.length ? (
                acceptedRequests.map((request) => (
                  <article className="provider-schedule-card" key={request.id}>
                    <time>{request.time}</time>
                    <div>
                      <strong>{request.careType}</strong>
                      <span>{request.parentName}님 · {request.region}</span>
                    </div>
                    <button type="button" onClick={() => openDetail(request)}>일정 상세</button>
                  </article>
                ))
              ) : (
                <p className="provider-empty">아직 오늘 예정된 일정이 없습니다.</p>
              )}
            </section>

            <section className="provider-plan-status-card" aria-labelledby="provider-plan-title">
              <div>
                <h2 id="provider-plan-title">수행 계획 일정표</h2>
                <p>{planNeededCount ? "보호자에게 보여줄 계획 작성이 필요해요." : "모든 수락 일정의 계획이 준비됐어요."}</p>
              </div>
              <button type="button" onClick={() => openPlan(acceptedRequests.find((request) => !request.plan) || acceptedRequests[0] || requests[0])}>
                {planNeededCount ? "수행 계획 작성하기" : "계획 보기"}
              </button>
            </section>

            <section className="provider-earning-card" aria-labelledby="provider-earning-title">
              <h2 id="provider-earning-title">이번 달 수익 요약</h2>
              <div>
                <span>완료 {completedCount}건</span>
                <strong>{monthlyEarning.toLocaleString()}원</strong>
                <small>정산 예정일 2026.08.05</small>
              </div>
            </section>
          </main>
        </>
      ) : screen === "detail" && selectedRequest ? (
        <ProviderRequestDetail
          request={selectedRequest}
          asset={asset}
          onBack={() => setScreen("home")}
          onAccept={() => updateRequestStatus(selectedRequest.id, "accepted")}
          onReject={() => setRejectRequestId(selectedRequest.id)}
          onOpenPlan={() => openPlan(selectedRequest)}
        />
      ) : selectedRequest ? (
        <ProviderPlanEditor
          request={selectedRequest}
          planDraft={planDraft}
          setPlanDraft={setPlanDraft}
          onBack={() => setScreen("detail")}
          onAddStep={addPlanStep}
          onRemoveStep={removePlanStep}
          onSave={savePlan}
        />
      ) : null}

      {rejectRequestId && (
        <div className="profile-sheet-backdrop" role="presentation" onClick={() => setRejectRequestId("")}>
          <section className="provider-reject-sheet" role="dialog" aria-modal="true" onClick={(event) => event.stopPropagation()}>
            <div className="profile-setting-head">
              <h2>거절 사유 선택</h2>
              <button type="button" onClick={() => setRejectRequestId("")} aria-label="닫기">×</button>
            </div>
            <button type="button" onClick={() => { updateRequestStatus(rejectRequestId, "rejected"); setRejectRequestId(""); }}>
              일정이 맞지 않아요
            </button>
            <button type="button" onClick={() => { updateRequestStatus(rejectRequestId, "rejected"); setRejectRequestId(""); }}>
              도움 유형이 맞지 않아요
            </button>
            <button type="button" onClick={() => { updateRequestStatus(rejectRequestId, "rejected"); setRejectRequestId(""); }}>
              이동 거리가 멀어요
            </button>
          </section>
        </div>
      )}

      {toastMessage && <p className="provider-toast" role="status">{toastMessage}</p>}
    </section>
  );
}

function ProviderRequestDetail({
  request,
  asset,
  onBack,
  onAccept,
  onReject,
  onOpenPlan
}: {
  request: ProviderIncomingRequest;
  asset: (name: string) => string;
  onBack: () => void;
  onAccept: () => void;
  onReject: () => void;
  onOpenPlan: () => void;
}) {
  return (
    <>
      <header className="provider-sub-header">
        <button type="button" onClick={onBack} aria-label="뒤로가기">
          <img src={asset("helper-back-icon.png")} alt="" aria-hidden="true" />
        </button>
        <h1>요청 상세</h1>
        <span aria-hidden="true" />
      </header>

      <main className="provider-content provider-detail-content">
        <section className="provider-detail-hero-card">
          <span>{request.status === "accepted" ? "수락 완료" : request.status === "rejected" ? "거절됨" : "응답 필요"}</span>
          <h2>{request.careType}</h2>
          <p>{request.parentName}님 · {request.region}</p>
          <strong>{request.expectedPay.toLocaleString()}원</strong>
        </section>

        <section className="provider-info-card" aria-labelledby="provider-request-info-title">
          <h2 id="provider-request-info-title">요청 정보</h2>
          <dl>
            <div><dt>보호자</dt><dd>{request.guardianName}</dd></div>
            <div><dt>방문 일정</dt><dd>{request.date} · {request.time}</dd></div>
            <div><dt>방문 장소</dt><dd>{request.address}</dd></div>
            <div><dt>주의사항</dt><dd>{request.caution}</dd></div>
          </dl>
        </section>

        <section className="provider-info-card">
          <h2>보호자 요청 내용</h2>
          <p>{request.requestNote}</p>
        </section>

        <section className="provider-info-card">
          <h2>수행 계획 일정표</h2>
          {request.plan ? (
            <div className="provider-saved-plan">
              <strong>수행 계획 작성 완료</strong>
              <ol>
                {request.plan.steps.map((step) => (
                  <li key={`${step.title}-${step.description}`}>
                    <b>{step.title}</b>
                    <span>{step.description}</span>
                  </li>
                ))}
              </ol>
            </div>
          ) : (
            <p>아직 보호자에게 보여줄 수행 계획이 없습니다.</p>
          )}
          <button className="provider-plan-button" type="button" onClick={onOpenPlan}>
            {request.plan ? "계획 수정하기" : "수행 계획 작성하기"}
          </button>
        </section>

        <div className="provider-detail-actions-bar">
          {request.status === "new" ? (
            <>
              <button type="button" onClick={onReject}>거절하기</button>
              <button type="button" onClick={onAccept}>수락하기</button>
            </>
          ) : (
            <>
              <button type="button">채팅하기</button>
              <button type="button">도착 알림</button>
            </>
          )}
        </div>
      </main>
    </>
  );
}

function ProviderPlanEditor({
  request,
  planDraft,
  setPlanDraft,
  onBack,
  onAddStep,
  onRemoveStep,
  onSave
}: {
  request: ProviderIncomingRequest;
  planDraft: ProviderCarePlan;
  setPlanDraft: Dispatch<SetStateAction<ProviderCarePlan>>;
  onBack: () => void;
  onAddStep: () => void;
  onRemoveStep: (index: number) => void;
  onSave: () => void;
}) {
  return (
    <>
      <header className="provider-sub-header">
        <button type="button" onClick={onBack} aria-label="뒤로가기">‹</button>
        <h1>수행 계획 작성</h1>
        <span aria-hidden="true" />
      </header>

      <main className="provider-content provider-plan-editor">
        <section className="provider-info-card">
          <h2>요청 요약</h2>
          <p>{request.parentName}님 · {request.careType}</p>
          <small>{request.date} {request.time} · {request.region}</small>
        </section>

        <label className="provider-plan-field">
          전체 예상 소요 시간
          <input
            value={planDraft.estimatedDuration}
            onChange={(event) => setPlanDraft((current) => ({ ...current, estimatedDuration: event.target.value }))}
          />
        </label>

        <section className="provider-plan-steps" aria-labelledby="provider-plan-steps-title">
          <div className="provider-section-head">
            <h2 id="provider-plan-steps-title">단계별 수행 계획</h2>
            <button type="button" onClick={onAddStep}>단계 추가</button>
          </div>
          {planDraft.steps.map((step, index) => (
            <article className="provider-plan-step-card" key={`${step.title}-${index}`}>
              <div>
                <span>{index + 1}</span>
                <button type="button" onClick={() => onRemoveStep(index)} disabled={planDraft.steps.length <= 1}>
                  삭제
                </button>
              </div>
              <label>
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
              <label>
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

        <label className="provider-plan-field">
          준비물/확인사항
          <textarea
            value={planDraft.checklist.join(", ")}
            onChange={(event) =>
              setPlanDraft((current) => ({
                ...current,
                checklist: event.target.value.split(",").map((item) => item.trim()).filter(Boolean)
              }))
            }
          />
        </label>

        <label className="provider-plan-field">
          보호자에게 전달할 메시지
          <textarea
            value={planDraft.messageToGuardian}
            onChange={(event) => setPlanDraft((current) => ({ ...current, messageToGuardian: event.target.value }))}
          />
        </label>
      </main>

      <nav className="provider-plan-save-bar">
        <button type="button" onClick={onSave}>계획 저장하기</button>
      </nav>
    </>
  );
}

function createPlanDraft(request?: ProviderIncomingRequest): ProviderCarePlan {
  return request?.plan || {
    id: `plan-${request?.id || "draft"}`,
    requestId: request?.id || "",
    providerId: request?.providerId || "provider-minseok",
    estimatedDuration: "2시간",
    steps: defaultPlanSteps,
    checklist: ["방문 전 연락", "신분 확인", "보호자 완료 보고"],
    messageToGuardian: "방문 전 연락드리고, 진행 상황은 채팅으로 꼼꼼히 공유드리겠습니다.",
    updatedAt: "2026-07-30"
  };
}
