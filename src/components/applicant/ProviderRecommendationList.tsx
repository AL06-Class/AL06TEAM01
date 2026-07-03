import type { Provider } from "../../types/provider";

type ProviderRecommendationListProps = {
  providers: Provider[];
  selectedProviderId: string;
  onSelectProvider: (providerId: string) => void;
};

const formatPrice = (price: number) => `${price.toLocaleString("ko-KR")}원`;

export function ProviderRecommendationList({
  providers,
  selectedProviderId,
  onSelectProvider
}: ProviderRecommendationListProps) {
  return (
    <section className="section-card" aria-labelledby="provider-list-title">
      <div className="section-card-header">
        <p className="section-kicker">신뢰 카드</p>
        <h2 id="provider-list-title">조건에 맞는 검증 도우미</h2>
      </div>

      <div className="provider-list">
        {providers.map((provider) => {
          const isSelected = provider.id === selectedProviderId;

          return (
            <article className={`provider-card ${isSelected ? "is-selected" : ""}`} key={provider.id}>
              <div className="avatar" aria-hidden="true">
                {provider.name.slice(0, 1)}
              </div>
              <div className="provider-info">
                <div className="provider-heading">
                  <h3>{provider.name}</h3>
                  <strong>{formatPrice(provider.price)}</strong>
                </div>
                <p>
                  {provider.distance} · 1회 {formatPrice(provider.price)}
                </p>
                <p>{provider.description}</p>
                <ul className="trust-list" aria-label={`${provider.name} 신뢰 이력`}>
                  {provider.trustItems.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <div className="badge-row">
                  {provider.badges.map((badge) => (
                    <span key={badge}>{badge}</span>
                  ))}
                  {isSelected && <span className="selected-badge">선택됨</span>}
                </div>
              </div>
              <button
                className={isSelected ? "primary-button small-button" : "secondary-button small-button"}
                type="button"
                onClick={() => onSelectProvider(provider.id)}
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
