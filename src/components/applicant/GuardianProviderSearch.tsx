import { useState } from "react";
import type { Helper } from "../../types/helper";
import { SERVICE_NAME } from "../../constants";

type GuardianProviderSearchProps = {
  helpers: Helper[];
  selectedHelperId: string;
  onSelectHelper: (helperId: string) => void;
  onBackHome: () => void;
  onOpenMatch: () => void;
  onOpenProfile: () => void;
  onStartRequest: () => void;
};

const formatPrice = (price: number) => `${price.toLocaleString("ko-KR")}원`;

export function GuardianProviderSearch({
  helpers,
  onSelectHelper,
  onBackHome,
  onOpenMatch,
  onOpenProfile,
  onStartRequest
}: GuardianProviderSearchProps) {
  const [activeHelperId, setActiveHelperId] = useState("");
  const asset = (name: string) => `/figma-assets/${name}`;

  return (
    <section className="guardian-search" aria-labelledby="guardian-search-title">
      <header className="guardian-search-header">
        <span aria-hidden="true" />
        <strong>{SERVICE_NAME}</strong>
        <button className="search-bell-button" type="button" aria-label="알림">
          <img src={asset("icon-bell.svg")} alt="" aria-hidden="true" />
        </button>
      </header>

      <div className="guardian-search-copy">
        <h1 id="guardian-search-title">
          사람의 시간과 경험,
          <br />
          따뜻한 마음을 연결합니다.
        </h1>
        <p>도움이 필요한 사람과 도움을 나누는 사람을 연결해, 서로의 가치를 이어드립니다.</p>
      </div>

      <div className="search-filter-row" aria-label="탐색 조건">
        <button className="is-active" type="button">거리순</button>
        <button type="button">평점순</button>
        <button type="button">낮은 가격순</button>
        <button type="button">상세필터</button>
      </div>

      <div className="guardian-provider-list">
        {helpers.map((helper) => {
          const isSelected = helper.id === activeHelperId;

          return (
            <article
              className={`guardian-provider-card ${isSelected ? "is-selected" : ""}`}
              key={helper.id}
              onClick={() => {
                setActiveHelperId(helper.id);
                onSelectHelper(helper.id);
              }}
            >
              <div className={`guardian-provider-avatar ${helper.id}`} aria-hidden="true">
                <img src={helper.imageUrl} alt="" />
                <small>영상보유</small>
              </div>
              <div className="guardian-provider-body">
                <div className="guardian-provider-heading">
                  <div>
                    <h2>
                      {helper.name}
                      <span aria-label="본인확인 완료">●</span>
                    </h2>
                    <p className="provider-rating-line">
                      ★ {helper.rating.toFixed(1)}
                      <span>(후기 {helper.reviewCount}개)</span>
                      <span>·</span>
                      <span>{helper.distance}</span>
                    </p>
                  </div>
                  <strong>{formatPrice(helper.price)}<small>/시간</small></strong>
                </div>
                <div className="guardian-trust-row" aria-label={`${helper.name} 신뢰 정보`}>
                  {helper.badges.slice(0, 2).map((badge) => (
                    <span key={badge}>{badge}</span>
                  ))}
                </div>
                {isSelected && (
                  <button
                    className="guardian-provider-request-button"
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      setActiveHelperId(helper.id);
                      onSelectHelper(helper.id);
                      onStartRequest();
                    }}
                  >
                    요청하기
                  </button>
                )}
              </div>
              <p className="guardian-provider-quote">"{helper.quote}"</p>
            </article>
          );
        })}
      </div>

      <nav className="search-bottom-nav" aria-label="하단 메뉴">
        <button type="button" onClick={onBackHome}>
          <img src={asset("icon-home.svg")} alt="" aria-hidden="true" />
          홈
        </button>
        <button className="is-active" type="button">
          <img src={asset("icon-search.svg")} alt="" aria-hidden="true" />
          검색
        </button>
        <button type="button" onClick={onOpenMatch}>
          <img src={asset("icon-match.svg")} alt="" aria-hidden="true" />
          매칭현황
        </button>
        <button type="button" onClick={onOpenProfile}>
          <img src={asset("icon-user.svg")} alt="" aria-hidden="true" />
          내 정보
        </button>
      </nav>
    </section>
  );
}
