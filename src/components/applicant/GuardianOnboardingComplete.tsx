type GuardianOnboardingCompleteProps = {
  onStart: () => void;
};

const summaryItems = [
  {
    label: "내 정보 (보호자)",
    icon: "onboarding-complete-guardian.svg"
  },
  {
    label: "부모님 정보",
    icon: "onboarding-complete-parent.svg"
  }
];

export function GuardianOnboardingComplete({ onStart }: GuardianOnboardingCompleteProps) {
  const asset = (name: string) => `/figma-assets/${name}`;

  return (
    <section className="guardian-onboarding-complete" aria-labelledby="onboarding-complete-title">
      <main className="onboarding-complete-main">
        <section className="onboarding-complete-hero">
          <div className="onboarding-complete-icon-wrap">
            <img
              className="onboarding-complete-confetti"
              src={asset("onboarding-complete-confetti.svg")}
              alt=""
              aria-hidden="true"
            />
            <div className="onboarding-complete-check">
              <img src={asset("onboarding-complete-check.svg")} alt="" aria-hidden="true" />
            </div>
          </div>
          <h1 id="onboarding-complete-title">정보 등록이 완료되었어요!</h1>
          <p>따뜻한 마음을 나누는 가치이웃을 만나보세요.</p>
        </section>

        <section className="onboarding-complete-card" aria-labelledby="registered-info-title">
          <h2 id="registered-info-title">
            <img src={asset("onboarding-complete-list.svg")} alt="" aria-hidden="true" />
            등록된 정보
          </h2>
          <div>
            {summaryItems.map((item) => (
              <article key={item.label}>
                <span>
                  <img src={asset(item.icon)} alt="" aria-hidden="true" />
                </span>
                <strong>{item.label}</strong>
                <img src={asset("onboarding-complete-row-check.svg")} alt="" aria-hidden="true" />
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer className="onboarding-complete-footer">
        <button type="button" onClick={onStart}>시작하기</button>
      </footer>
    </section>
  );
}
