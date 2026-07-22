const steps = [
  {
    label: "STEP 01",
    title: "3단계 신원 검증",
    description: "신분증·연락처·서약서 확인으로 도우미의 신원을 보증합니다."
  },
  {
    label: "STEP 02",
    title: "자격·경력 확인",
    description: "요양보호사 등 자격증과 돌봄 경력을 검토해 역량을 확인합니다."
  },
  {
    label: "STEP 03",
    title: "안전 결제 보호",
    description: "결제는 방문 완료 후 확정되며, 분쟁 시 안전하게 보호됩니다."
  },
  {
    label: "STEP 04",
    title: "실시간 리포트 의무화",
    description: "모든 방문은 시간별 기록을 남겨 가족이 언제든 확인할 수 있습니다."
  }
];

export function VerificationSteps() {
  return (
    <section className="verification-section" aria-labelledby="verification-title">
      <div className="verification-inner">
        <div className="verification-header">
          <p className="eyebrow">신뢰의 이유</p>
          <h2 id="verification-title">믿고 맡길 수 있는 이유</h2>
          <p className="section-description">
            도우미 등록부터 방문 기록까지, 이음케어는 신뢰를 위한 절차를 생략하지 않습니다.
          </p>
        </div>
        <div className="verification-grid">
          {steps.map((step) => (
            <div className="verification-card" key={step.label}>
              <span className="step-label">{step.label}</span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
