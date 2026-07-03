import type { RefObject } from "react";

type HowItWorksStepsProps = {
  sectionRef: RefObject<HTMLDivElement>;
};

const guideSteps = ["패키지 선택", "돌봄 요청", "제공자 비교", "진행 확인"];

export function HowItWorksSteps({ sectionRef }: HowItWorksStepsProps) {
  return (
    <section className="guide-section" id="how-to-use" ref={sectionRef} aria-labelledby="guide-title">
      <div>
        <p className="section-kicker">이용 흐름</p>
        <h2 id="guide-title">필요한 돌봄을 찾고, 예약하고, 진행 상황을 확인하세요</h2>
        <p className="section-description">
          신청자는 한 번의 스크롤 안에서 패키지 선택, 요청 작성, 제공자 비교, 예약 확정, 케어 리포트와
          대화까지 자연스럽게 이어갈 수 있습니다.
        </p>
      </div>
      <div className="guide-steps" aria-label="신청자 이용 단계">
        {guideSteps.map((step) => (
          <span key={step}>{step}</span>
        ))}
      </div>
    </section>
  );
}
