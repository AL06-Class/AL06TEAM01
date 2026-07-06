import type { RefObject } from "react";

type HowItWorksStepsProps = {
  sectionRef: RefObject<HTMLDivElement>;
};

const guideSteps = [
  { title: "요청", description: "지역·일정과 필요한 도움을 입력합니다." },
  { title: "탐색", description: "검증된 이웃 도우미를 비교합니다." },
  { title: "예약", description: "건별 결제 또는 구독으로 확정합니다." },
  { title: "소통", description: "리포트와 메시지로 진행을 확인합니다." }
];

export function HowItWorksSteps({ sectionRef }: HowItWorksStepsProps) {
  return (
    <section className="guide-section" id="how" ref={sectionRef} aria-labelledby="guide-title">
      <div className="guide-section-inner">
        <div className="guide-section-header">
          <p className="eyebrow">이용 방법</p>
          <h2 id="guide-title">신청부터 소통까지, 4단계면 끝나요</h2>
          <p className="section-description">
            한 번의 스크롤 안에서 요청 작성, 도우미 비교, 예약 확정, 케어 리포트까지 자연스럽게
            이어집니다.
          </p>
        </div>
        <div className="guide-steps" aria-label="신청자 이용 단계">
          {guideSteps.map((step, index) => (
            <div className="guide-step-card" key={step.title}>
              <span className="guide-step-badge">{index + 1}</span>
              <strong>{step.title}</strong>
              <p>{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
