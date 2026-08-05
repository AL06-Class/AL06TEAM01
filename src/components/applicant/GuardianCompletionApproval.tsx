import type { CareRequest } from "../../types/careRequest";

type GuardianCompletionApprovalProps = {
  careRequest: CareRequest;
  onBack: () => void;
  onApprove: () => void;
  onReportProblem: () => void;
};

export function GuardianCompletionApproval({
  careRequest,
  onBack,
  onApprove,
  onReportProblem
}: GuardianCompletionApprovalProps) {
  const asset = (name: string) => `/figma-assets/${name}`;

  return (
    <section className="guardian-completion-approval" aria-labelledby="completion-approval-title">
      <header className="simple-app-header">
        <button type="button" onClick={onBack} aria-label="진행 리포트로 돌아가기">
          <img src={asset("figma-header-close.svg")} alt="" aria-hidden="true" />
        </button>
        <strong>가치이음</strong>
      </header>

      <main className="completion-approval-main">
        <section className="completion-approval-copy">
          <h1 id="completion-approval-title">오늘의 도움은 어떠셨나요?</h1>
          <p>가치제공자가 서비스를 완료하고 보고서를 작성했습니다.</p>
        </section>

        <section className="approval-card" aria-labelledby="approval-summary-title">
          <h2 id="approval-summary-title">
            <img src={asset("icon-verified.svg")} alt="" aria-hidden="true" />
            수행 완료 요약
          </h2>
          <div className="approval-summary-box">
            <div>
              <span>실제 소요 시간</span>
              <strong>2시간 15분</strong>
            </div>
            <p>
              <img src={asset("icon-location-figma.png")} alt="" aria-hidden="true" />
              {careRequest.region} 동행 및 요청 도움 완료
            </p>
          </div>
          <h3>활동 사진</h3>
          <div className="approval-photo-grid">
            <img src={asset("helper-history-box.png")} alt="활동 장소 사진" />
            <img src={asset("helper-review-photo.png")} alt="도움 진행 사진" />
          </div>
        </section>

        <section className="approval-card" aria-labelledby="approval-payment-title">
          <h2 id="approval-payment-title">
            <img src={asset("profile-icon-payment.svg")} alt="" aria-hidden="true" />
            정산 내역
          </h2>
          <dl className="approval-price-list">
            <div>
              <dt>기본 서비스 비용 (2시간)</dt>
              <dd>30,000원</dd>
            </div>
            <div>
              <dt>추가 시간 비용 (15분)</dt>
              <dd>4,500원</dd>
            </div>
            <div>
              <dt>교통비 실비 청구</dt>
              <dd>8,200원</dd>
            </div>
            <div className="is-total">
              <dt>최종 결제 금액</dt>
              <dd>42,700원</dd>
            </div>
          </dl>
        </section>
      </main>

      <footer className="completion-approval-actions">
        <button type="button" onClick={onApprove}>
          <img src={asset("icon-verified.svg")} alt="" aria-hidden="true" />
          완료 승인 및 결제 안내 받기
        </button>
        <button type="button" onClick={onReportProblem}>도움에 문제가 있었나요? 문제 제기하기</button>
      </footer>
    </section>
  );
}
