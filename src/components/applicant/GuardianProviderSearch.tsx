import { useState } from "react";
import type { KeyboardEvent } from "react";
import type { Helper } from "../../types/helper";
import { NotificationBell } from "./NotificationBell";

type GuardianProviderSearchProps = {
  helpers: Helper[];
  isRequestSearch?: boolean;
  selectedHelperId: string;
  onSelectHelper: (helperId: string) => void;
  onOpenHelperDetail: () => void;
  onBackHome: () => void;
  onOpenMatch: () => void;
  onOpenProfile: () => void;
  onStartRequest: () => void;
};

const formatPrice = (price: number) => `${price.toLocaleString("ko-KR")}원`;
type SearchSort = "distance" | "rating" | "price";

const getDistanceValue = (distance: string) => {
  const matchedDistance = distance.match(/([\d.]+)\s*(km|m)/i);

  if (!matchedDistance) {
    return Number.MAX_SAFE_INTEGER;
  }

  const value = Number(matchedDistance[1]);
  return matchedDistance[2].toLowerCase() === "km" ? value * 1000 : value;
};

export function GuardianProviderSearch({
  helpers,
  isRequestSearch = false,
  selectedHelperId,
  onSelectHelper,
  onOpenHelperDetail,
  onBackHome,
  onOpenMatch,
  onOpenProfile,
  onStartRequest
}: GuardianProviderSearchProps) {
  const [openHelperId, setOpenHelperId] = useState("");
  const [sortBy, setSortBy] = useState<SearchSort>("distance");
  const asset = (name: string) => `/figma-assets/${name}`;
  const sortedHelpers = [...helpers].sort((firstHelper, secondHelper) => {
      if (sortBy === "rating") {
        return secondHelper.rating - firstHelper.rating || secondHelper.reviewCount - firstHelper.reviewCount;
      }

      if (sortBy === "price") {
        return firstHelper.price - secondHelper.price;
      }

      return getDistanceValue(firstHelper.distance) - getDistanceValue(secondHelper.distance);
    });

  const openHelperDetail = (helperId: string) => {
    setOpenHelperId(helperId);
    onSelectHelper(helperId);
    onOpenHelperDetail();
  };

  const handleCardKeyDown = (event: KeyboardEvent<HTMLElement>, helperId: string) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openHelperDetail(helperId);
    }
  };

  return (
    <section className="guardian-search" aria-labelledby="guardian-search-title">
      <header className="guardian-search-header search-page-header">
        <strong>가치이웃 검색</strong>
        <NotificationBell onOpenMatch={onOpenMatch} />
      </header>

      <div className="guardian-search-copy">
        {isRequestSearch ? (
          <>
            <h1 id="guardian-search-title">
              요청 조건에 맞는
              <br />
              가치이웃을 찾았어요
            </h1>
            <p>작성한 도움 내용과 제주 지역 기준에 맞춰 추천된 가치이웃입니다. 프로필을 눌러 상세정보를 확인해보세요.</p>
          </>
        ) : (
          <>
            <h1 id="guardian-search-title">
              사람의 시간과 경험,
              <br />
              따뜻한 마음을 연결해드려요.
            </h1>
            <p>필요한 도움을 나누는 가치이웃을 가까운 곳에서 찾아보세요.</p>
          </>
        )}
      </div>

      <div className="search-filter-row" aria-label="탐색 조건">
        <button className={sortBy === "distance" ? "is-active" : ""} type="button" onClick={() => setSortBy("distance")}>거리순</button>
        <button className={sortBy === "rating" ? "is-active" : ""} type="button" onClick={() => setSortBy("rating")}>평점순</button>
        <button className={sortBy === "price" ? "is-active" : ""} type="button" onClick={() => setSortBy("price")}>낮은 가격순</button>
      </div>

      <div className="guardian-provider-list">
        {sortedHelpers.map((helper) => {
          const isSelected = helper.id === openHelperId;
          const isActive = helper.id === selectedHelperId || isSelected;
          const detailPanelId = `${helper.id}-detail`;

          return (
            <article
              aria-controls={detailPanelId}
              aria-expanded={isSelected}
              className={`guardian-provider-card ${isActive ? "is-selected" : ""}`}
              key={helper.id}
              onClick={() => openHelperDetail(helper.id)}
              onKeyDown={(event) => handleCardKeyDown(event, helper.id)}
              role="button"
              tabIndex={0}
            >
              <div className={`guardian-provider-avatar ${helper.id}`} aria-hidden="true">
                <span className="guardian-provider-avatar-frame">
                  <img src={helper.imageUrl} alt="" />
                </span>
                <small>영상보유</small>
              </div>
              <div className="guardian-provider-body">
                <div className="guardian-provider-heading">
                  <div className="guardian-provider-title-block">
                    <h2>
                      {helper.name}
                      <span className="provider-verified-mark" aria-label="본인확인 완료">
                        <svg aria-hidden="true" viewBox="0 0 16 16">
                          <path d="M6.8 10.4L11.1 5.6" />
                          <path d="M5 8.4L6.8 10.4" />
                        </svg>
                      </span>
                    </h2>
                  </div>
                  <strong>{formatPrice(helper.price)}<small>/시간</small></strong>
                  <p className="provider-rating-line">
                    ★ {helper.rating.toFixed(1)}
                    <span>(후기 {helper.reviewCount}개)</span>
                    <span>·</span>
                    <span>{helper.distance}</span>
                  </p>
                </div>
                <div className="guardian-trust-row" aria-label={`${helper.name} 신뢰 정보`}>
                  {helper.badges.slice(0, 2).map((badge) => (
                    <span key={badge}>{badge}</span>
                  ))}
                </div>
              </div>
              <p className="guardian-provider-quote">"{helper.quote}"</p>

              {isSelected && (
                <button
                  className="guardian-provider-request-button"
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    setOpenHelperId(helper.id);
                    onSelectHelper(helper.id);
                    onStartRequest();
                  }}
                >
                  요청하기
                </button>
              )}
            </article>
          );
        })}
      </div>

      <nav className="search-bottom-nav" aria-label="하단 메뉴">
        <button type="button" onClick={onBackHome}>
          <img src={asset("icon-home-stroke.svg")} alt="" aria-hidden="true" />
          홈
        </button>
        <button className="is-active" type="button">
          <img src={asset("icon-search.svg")} alt="" aria-hidden="true" />
          검색
        </button>
        <button type="button" onClick={onOpenMatch}>
          <img className="nav-match-icon" src={asset("icon-match-nav-source.png")} alt="" aria-hidden="true" />
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
