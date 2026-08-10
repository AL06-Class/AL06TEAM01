import { useState } from "react";
import type { KeyboardEvent } from "react";
import type { CareRequest } from "../../types/careRequest";
import type { Helper } from "../../types/helper";
import { NotificationBell } from "./NotificationBell";

type GuardianProviderSearchProps = {
  helpers: Helper[];
  careRequest: CareRequest;
  isRequestSearch?: boolean;
  selectedHelperId: string;
  onSelectHelper: (helperId: string) => void;
  onOpenHelperDetail: () => void;
  onBackHome: () => void;
  onOpenMatch: () => void;
  onOpenChat: () => void;
  onOpenProgress: () => void;
  onOpenProfile: () => void;
  onStartRequest: () => void;
};

const formatPrice = (price: number) => `${price.toLocaleString("ko-KR")}원`;
type SearchSort = "distance" | "rating" | "price";
type DetailFilters = {
  verifiedOnly: boolean;
  videoOnly: boolean;
  maxPrice: "all" | "14000" | "15000";
  minRating: "all" | "4.8" | "4.9";
};

const helpFilterKeywords: Record<string, string[]> = {
  장보기: ["장보기", "마트", "생필품"],
  "병원 동행": ["병원", "동행", "검진"],
  말벗: ["말벗", "대화", "소통"],
  "디지털 기기 교육": ["디지털", "스마트폰", "기기", "키오스크"],
  "짐 옮기기": ["짐", "옮기기", "무거운"]
};

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
  careRequest,
  isRequestSearch = false,
  selectedHelperId,
  onSelectHelper,
  onOpenHelperDetail,
  onBackHome,
  onOpenMatch,
  onOpenChat,
  onOpenProgress,
  onOpenProfile,
  onStartRequest
}: GuardianProviderSearchProps) {
  const [openHelperId, setOpenHelperId] = useState("");
  const [sortBy, setSortBy] = useState<SearchSort>("distance");
  const [isDetailFilterOpen, setIsDetailFilterOpen] = useState(false);
  const [detailFilters, setDetailFilters] = useState<DetailFilters>({
    verifiedOnly: false,
    videoOnly: false,
    maxPrice: "all",
    minRating: "all"
  });
  const asset = (name: string) => `/figma-assets/${name}`;
  const selectedHelpTypes = careRequest.careType
    .split(",")
    .map((helpType) => helpType.trim())
    .filter(Boolean);
  const selectedHelpKeywords = selectedHelpTypes.flatMap((helpType) => helpFilterKeywords[helpType] || [helpType]);
  const selectedArea = careRequest.region.match(/(?:제주시|서귀포시)\s*[가-힣]+[읍면동]/)?.[0] || "";
  const appliedFilterChips = [
    ...selectedHelpTypes,
    careRequest.date,
    careRequest.time.split("-")[0] || careRequest.time,
    selectedArea || careRequest.region,
    detailFilters.verifiedOnly ? "본인확인 완료" : "",
    detailFilters.videoOnly ? "영상 보유" : "",
    detailFilters.maxPrice !== "all" ? `${formatPrice(Number(detailFilters.maxPrice))} 이하` : "",
    detailFilters.minRating !== "all" ? `★ ${detailFilters.minRating} 이상` : ""
  ].filter(Boolean);
  const matchesHelpFilter = (helper: Helper) => {
    if (!isRequestSearch || selectedHelpKeywords.length === 0) {
      return true;
    }

    const searchableText = [
      helper.name,
      helper.distance,
      helper.description,
      helper.quote,
      ...helper.badges,
      ...helper.trustItems
    ].join(" ");

    return selectedHelpKeywords.some((keyword) => searchableText.includes(keyword));
  };
  const matchesDetailFilters = (helper: Helper) => {
    const hasVerified = helper.trustItems.some((item) => item.includes("본인확인")) || helper.badges.some((badge) => badge.includes("본인확인"));
    const hasVideo = true;
    const matchesPrice = detailFilters.maxPrice === "all" || helper.price <= Number(detailFilters.maxPrice);
    const matchesRating = detailFilters.minRating === "all" || helper.rating >= Number(detailFilters.minRating);

    return (!detailFilters.verifiedOnly || hasVerified) && (!detailFilters.videoOnly || hasVideo) && matchesPrice && matchesRating;
  };
  const hasActiveDetailFilter =
    detailFilters.verifiedOnly ||
    detailFilters.videoOnly ||
    detailFilters.maxPrice !== "all" ||
    detailFilters.minRating !== "all";
  const filteredHelpers = helpers.filter(matchesHelpFilter);
  const visibleHelpers = filteredHelpers.length > 0 ? filteredHelpers : helpers;
  const detailFilteredHelpers = visibleHelpers.filter(matchesDetailFilters);
  const sortedHelpers = [...detailFilteredHelpers].sort((firstHelper, secondHelper) => {
      if (isRequestSearch && selectedArea) {
        const firstAreaMatch = firstHelper.distance.includes(selectedArea) ? 0 : 1;
        const secondAreaMatch = secondHelper.distance.includes(selectedArea) ? 0 : 1;

        if (firstAreaMatch !== secondAreaMatch) {
          return firstAreaMatch - secondAreaMatch;
        }
      }

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

  const resetDetailFilters = () => {
    setDetailFilters({
      verifiedOnly: false,
      videoOnly: false,
      maxPrice: "all",
      minRating: "all"
    });
  };

  return (
    <section className="guardian-search" aria-labelledby="guardian-search-title">
      <header className="guardian-search-header search-page-header">
        <strong>가치이웃 검색</strong>
        <NotificationBell onOpenChat={onOpenChat} onOpenMatch={onOpenMatch} onOpenProgress={onOpenProgress} />
      </header>

      <div className="guardian-search-copy">
        {isRequestSearch ? (
          <>
            <h1 id="guardian-search-title">
              요청 조건에 맞는
              <br />
              가치이웃을 찾았어요
            </h1>
            <p>상세 조건 설정에서 선택한 도움 종류와 위치를 기준으로 가치이웃을 정리했어요.</p>
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
        <button className={hasActiveDetailFilter ? "is-active" : ""} type="button" onClick={() => setIsDetailFilterOpen(true)}>상세필터</button>
      </div>

      {isRequestSearch && appliedFilterChips.length > 0 && (
        <div className="search-applied-filter" aria-label="적용된 상세 조건">
          {appliedFilterChips.map((filterChip) => (
            <span key={filterChip}>{filterChip}</span>
          ))}
        </div>
      )}

      <div className="guardian-provider-list">
        {sortedHelpers.length === 0 ? (
          <div className="search-empty-result" role="status">
            <strong>조건에 맞는 가치이웃이 아직 없어요</strong>
            <p>상세필터를 조금 넓히면 더 많은 가치이웃을 볼 수 있어요.</p>
            <button type="button" onClick={resetDetailFilters}>필터 초기화</button>
          </div>
        ) : sortedHelpers.map((helper) => {
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

      {isDetailFilterOpen && (
        <div className="search-detail-filter-backdrop" role="presentation" onClick={() => setIsDetailFilterOpen(false)}>
          <section
            aria-labelledby="search-detail-filter-title"
            className="search-detail-filter-sheet"
            role="dialog"
            aria-modal="true"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="search-detail-filter-header">
              <strong id="search-detail-filter-title">상세필터</strong>
              <button type="button" aria-label="상세필터 닫기" onClick={() => setIsDetailFilterOpen(false)}>×</button>
            </div>

            <div className="search-detail-filter-section">
              <b>신뢰 조건</b>
              <label>
                <input
                  type="checkbox"
                  checked={detailFilters.verifiedOnly}
                  onChange={(event) => setDetailFilters((current) => ({ ...current, verifiedOnly: event.target.checked }))}
                />
                본인확인 완료만 보기
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={detailFilters.videoOnly}
                  onChange={(event) => setDetailFilters((current) => ({ ...current, videoOnly: event.target.checked }))}
                />
                자기소개 영상 보유
              </label>
            </div>

            <div className="search-detail-filter-section">
              <b>시간당 비용</b>
              <div className="search-detail-option-row">
                {[
                  ["all", "전체"],
                  ["14000", "14,000원 이하"],
                  ["15000", "15,000원 이하"]
                ].map(([value, label]) => (
                  <button
                    className={detailFilters.maxPrice === value ? "is-selected" : ""}
                    key={value}
                    type="button"
                    onClick={() => setDetailFilters((current) => ({ ...current, maxPrice: value as DetailFilters["maxPrice"] }))}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div className="search-detail-filter-section">
              <b>평점</b>
              <div className="search-detail-option-row">
                {[
                  ["all", "전체"],
                  ["4.8", "4.8 이상"],
                  ["4.9", "4.9 이상"]
                ].map(([value, label]) => (
                  <button
                    className={detailFilters.minRating === value ? "is-selected" : ""}
                    key={value}
                    type="button"
                    onClick={() => setDetailFilters((current) => ({ ...current, minRating: value as DetailFilters["minRating"] }))}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div className="search-detail-filter-actions">
              <button type="button" onClick={resetDetailFilters}>초기화</button>
              <button type="button" onClick={() => setIsDetailFilterOpen(false)}>적용하기</button>
            </div>
          </section>
        </div>
      )}

      <nav className="search-bottom-nav" aria-label="하단 메뉴">
        <button type="button" onClick={onBackHome}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M4 10.8 12 4l8 6.8V20a1 1 0 0 1-1 1h-4.5v-6h-5v6H5a1 1 0 0 1-1-1v-9.2Z" />
          </svg>
          홈
        </button>
        <button className="is-active" type="button">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="11" cy="11" r="7" />
            <path d="M21 21l-4.3-4.3" />
          </svg>
          검색
        </button>
        <button type="button" onClick={onOpenMatch}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
          매칭현황
        </button>
        <button type="button" onClick={onOpenProfile}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM4 21a8 8 0 0 1 16 0" />
          </svg>
          내 정보
        </button>
      </nav>
    </section>
  );
}
