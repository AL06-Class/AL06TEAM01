import type { CareRequest } from "../../types/careRequest";
import type { Helper } from "../../types/helper";

type GuardianCarePlanConfirmProps = {
  careRequest: CareRequest;
  selectedHelper?: Helper;
  onBack: () => void;
  onConfirm: () => void;
  onOpenChat: () => void;
};

const planSteps = [
  ["방문 및 인사", "어르신 댁에 방문하여 컨디션을 확인하고 이동 준비를 돕습니다."],
  ["병원 이동 보조", "예약된 병원까지 안전하게 이동하고 접수 과정을 함께 확인합니다."],
  ["진료 대기 및 약 수령", "진료실 앞 대기, 의사 소견 메모 전달, 인근 약국에서 처방약 수령을 돕습니다."],
  ["안전 귀가", "다시 자택으로 모셔다 드린 후, 보호자님께 최종 완료 알림을 전송합니다."]
];

export function GuardianCarePlanConfirm({
  careRequest,
  selectedHelper,
  onBack,
  onConfirm,
  onOpenChat
}: GuardianCarePlanConfirmProps) {
  const asset = (name: string) => `/figma-assets/${name}`;

  return (
    <section className="guardian-plan-confirm" aria-labelledby="guardian-plan-title">
      <header className="simple-app-header">
        <button type="button" onClick={onBack} aria-label="이전 화면으로 돌아가기">
          <img src={asset("figma-header-close.svg")} alt="" aria-hidden="true" />
        </button>
        <strong>가치이음</strong>
      </header>

      <main className="plan-confirm-main">
        <section className="plan-confirm-copy">
          <h1 id="guardian-plan-title">수행 계획 확인</h1>
          <p>가치제공자가 작성한 서비스 세부 계획을 확인해주세요.</p>
        </section>

        <article className="plan-provider-note">
          <span>
            <img src={asset("icon-user.svg")} alt="" aria-hidden="true" />
          </span>
          <div>
            <strong>{selectedHelper?.name || "가치제공자"} 파트너</strong>
            <p>"정성을 다해 모시겠습니다. 안심하고 맡겨주세요."</p>
          </div>
        </article>

        <section className="plan-detail-card" aria-labelledby="plan-detail-title">
          <h2 id="plan-detail-title">방문 정보</h2>
          <dl>
            <div>
              <dt>예상 소요 시간</dt>
              <dd>{careRequest.time || "오후 1:00 ~ 4:00"}</dd>
            </div>
            <div>
              <dt>준비물 안내</dt>
              <dd>신분증, 복용 중인 약 처방전, 결제용 카드</dd>
            </div>
          </dl>
        </section>

        <section className="plan-step-section" aria-labelledby="plan-step-title">
          <h2 id="plan-step-title">단계별 수행 계획</h2>
          <ol>
            {planSteps.map(([title, description], index) => (
              <li key={title}>
                <b>{index + 1}</b>
                <div>
                  <strong>{title}</strong>
                  <p>{description}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>
      </main>

      <footer className="plan-confirm-actions">
        <button type="button" onClick={onConfirm}>수행 계획 확인 완료</button>
        <button type="button" onClick={onOpenChat}>수정 요청하기</button>
      </footer>
    </section>
  );
}
