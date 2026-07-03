import type { CarePlan } from "../../types/carePlan";

type CarePlanOptionsProps = {
  carePlans: CarePlan[];
  selectedPlanId: string;
  onSelectPlan: (planId: string) => void;
};

export function CarePlanOptions({
  carePlans,
  selectedPlanId,
  onSelectPlan
}: CarePlanOptionsProps) {
  return (
    <section className="plan-section" aria-labelledby="care-plan-title">
      <div className="journey-header">
        <p className="section-kicker">결제 방식</p>
        <h2 id="care-plan-title">건별 결제 또는 구독 패키지로 시작하세요</h2>
        <p className="section-description">
          한 번만 필요한 돌봄은 건별로, 정기적인 생활 도움은 월 단위 패키지로 선택합니다.
        </p>
      </div>

      <div className="plan-card-list">
        {carePlans.map((plan) => {
          const isSelected = plan.id === selectedPlanId;

          return (
            <article className={`plan-card ${isSelected ? "is-selected" : ""}`} key={plan.id}>
              <div>
                <p className="plan-type">{plan.priceLabel}</p>
                <h3>{plan.title}</h3>
                <p>{plan.description}</p>
              </div>
              <ul>
                {plan.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
              <button
                className={isSelected ? "primary-button full-button" : "secondary-button full-button"}
                type="button"
                onClick={() => onSelectPlan(plan.id)}
              >
                {isSelected ? "선택됨" : "선택하기"}
              </button>
            </article>
          );
        })}
      </div>
    </section>
  );
}
