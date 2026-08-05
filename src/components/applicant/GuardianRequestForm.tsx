import { useState } from "react";
import type { CareRequest } from "../../types/careRequest";
import type { Helper } from "../../types/helper";

type GuardianRequestFormProps = {
  careRequest: CareRequest;
  selectedHelper?: Helper;
  submitLabel?: string;
  onChange: (field: keyof CareRequest, value: string) => void;
  onGoHome: () => void;
  onBackSearch: () => void;
  onOpenMatch: () => void;
  onOpenProfile: () => void;
  onSubmitRequest: () => void;
};

const helpTypes = ["장보기", "병원 동행", "말벗", "디지털 기기 교육", "짐 옮기기"];
const locationOptions = ["제주시 조천읍", "제주시 노형동", "제주시 인화동", "서귀포시 대정읍"];

export function GuardianRequestForm({
  careRequest,
  selectedHelper,
  submitLabel,
  onChange,
  onBackSearch,
  onSubmitRequest
}: GuardianRequestFormProps) {
  const asset = (name: string) => `/figma-assets/${name}`;
  const [isLocationSearchOpen, setIsLocationSearchOpen] = useState(false);
  const [locationStatus, setLocationStatus] = useState("");
  const isFilterMode = !selectedHelper && !submitLabel;
  const selectedHelpTypes = careRequest.careType
    .split(",")
    .map((helpType) => helpType.trim())
    .filter(Boolean);
  const selectedKnownHelpTypes = selectedHelpTypes.filter((helpType) => helpTypes.includes(helpType));
  const customHelpTypes = selectedHelpTypes.filter((helpType) => !helpTypes.includes(helpType) && helpType !== "기타");
  const isOtherSelected = selectedHelpTypes.includes("기타") || customHelpTypes.length > 0;

  const updateHelpTypes = (nextHelpTypes: string[]) => {
    onChange("careType", nextHelpTypes.filter(Boolean).join(", "));
  };

  const toggleHelpType = (helpType: string) => {
    const nextHelpTypes = selectedHelpTypes.includes(helpType)
      ? selectedHelpTypes.filter((selectedHelpType) => selectedHelpType !== helpType)
      : [...selectedHelpTypes.filter((selectedHelpType) => selectedHelpType !== "기타"), helpType];

    updateHelpTypes(nextHelpTypes);
  };

  const toggleOtherHelpType = () => {
    if (isOtherSelected) {
      updateHelpTypes(selectedKnownHelpTypes);
      return;
    }

    updateHelpTypes([...selectedKnownHelpTypes, "기타"]);
  };

  const findCurrentLocation = () => {
    if (!navigator.geolocation) {
      setLocationStatus("현재 위치를 확인할 수 없어 위치 후보를 열었어요.");
      setIsLocationSearchOpen(true);
      return;
    }

    setLocationStatus("현재 위치를 확인하고 있어요.");
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude.toFixed(5);
        const longitude = position.coords.longitude.toFixed(5);
        onChange("region", `현재 위치 확인됨 (${latitude}, ${longitude})`);
        setLocationStatus("현재 위치를 확인했어요. 상세 주소를 한 번 더 확인해주세요.");
        setIsLocationSearchOpen(false);
      },
      () => {
        setLocationStatus("위치 권한을 확인하지 못했어요. 아래 위치 후보에서 선택해주세요.");
        setIsLocationSearchOpen(true);
      },
      { enableHighAccuracy: true, timeout: 8000 }
    );
  };

  return (
    <section className="guardian-request request-write-page" aria-labelledby="guardian-request-title">
      <header className="request-write-header">
        <button className="search-back-button" type="button" onClick={onBackSearch} aria-label="이전 화면으로 돌아가기">
          <svg aria-hidden="true" viewBox="0 0 24 24">
            <path d="M15 18L9 12L15 6" />
          </svg>
        </button>
        <h1>{isFilterMode ? "상세 조건 설정" : "도움 요청하기"}</h1>
      </header>

      <main className="request-write-main">
        <section className="request-write-hero" aria-labelledby="guardian-request-title">
          {isFilterMode ? (
            <>
              <span className="request-filter-kicker">가치이웃 찾기 조건</span>
              <h2 id="guardian-request-title">
                필요한 도움 조건을
                <br />
                자세히 알려주세요.
              </h2>
              <p>도움 종류, 방문 시간, 위치를 기준으로 조건에 맞는 가치이웃을 보여드릴게요.</p>
            </>
          ) : (
            <>
              <h2 id="guardian-request-title">
                이웃에게 도움을
                <br />
                요청해보세요.
              </h2>
              <p>선택한 가치이웃에게 보낼 요청 내용을 작성해주세요.</p>
            </>
          )}
        </section>

        <form className="request-write-form">
          {selectedHelper && (
            <section className="request-target-helper" aria-label="다시 요청할 가치제공자">
              <img src={selectedHelper.imageUrl} alt="" />
              <div>
                <span>다시 요청할 가치제공자</span>
                <strong>{selectedHelper.name}</strong>
                <p>{selectedHelper.distance} · ★ {selectedHelper.rating.toFixed(1)}</p>
              </div>
            </section>
          )}

          <section className="request-write-card" aria-labelledby="help-type-title">
            <h2 id="help-type-title">{isFilterMode ? "1. 어떤 도움이 필요하신가요?" : "어떤 도움이 필요하신가요?"}</h2>
            <div className="request-chip-list">
              {helpTypes.map((helpType) => (
                <button
                  className={selectedHelpTypes.includes(helpType) ? "is-selected" : ""}
                  key={helpType}
                  type="button"
                  onClick={() => toggleHelpType(helpType)}
                >
                  {helpType}
                </button>
              ))}
              <button
                className={isOtherSelected ? "is-selected" : ""}
                type="button"
                onClick={toggleOtherHelpType}
              >
                  기타
              </button>
            </div>
            {isOtherSelected && (
              <label className="request-other-field">
                <span>필요한 도움을 직접 입력해주세요.</span>
                <input
                  aria-label="기타 도움 내용"
                  value={customHelpTypes.join(", ")}
                  onChange={(event) => {
                    const customValue = event.target.value.trim();
                    updateHelpTypes(customValue ? [...selectedKnownHelpTypes, customValue] : [...selectedKnownHelpTypes, "기타"]);
                  }}
                  placeholder="예: 가전제품 사용법 알려주세요"
                />
              </label>
            )}
          </section>

          <section className="request-write-card" aria-labelledby="visit-time-title">
            <h2 id="visit-time-title">{isFilterMode ? "2. 언제 방문할까요?" : "언제 방문할까요?"}</h2>
            <label className="request-input-field">
              <span>방문 날짜</span>
              <input type="date" value={careRequest.date} onChange={(event) => onChange("date", event.target.value)} />
            </label>
            <label className="request-input-field">
              <span>방문 시간</span>
              <input type="time" value={careRequest.time.split("-")[0] || ""} onChange={(event) => onChange("time", event.target.value)} />
            </label>
          </section>

          <section className="request-write-card" aria-labelledby="visit-location-title">
            <h2 id="visit-location-title">{isFilterMode ? "3. 어디로 방문할까요?" : "어디로 방문할까요?"}</h2>
            <div className="request-location-row">
              <input
                aria-label="방문 주소"
                value={careRequest.region}
                onChange={(event) => onChange("region", event.target.value)}
                placeholder="제주시 조천읍"
              />
              <button type="button" onClick={findCurrentLocation}>
                위치 찾기
              </button>
            </div>
            {locationStatus && <p className="location-helper-text">{locationStatus}</p>}
            {isLocationSearchOpen && (
              <div className="request-location-results" aria-label="위치 검색 결과">
                {locationOptions.map((location) => (
                  <button
                    className={careRequest.region === location ? "is-selected" : ""}
                    type="button"
                    key={location}
                    onClick={() => {
                      onChange("region", location);
                      setIsLocationSearchOpen(false);
                    }}
                  >
                    {location}
                  </button>
                ))}
              </div>
            )}
            <input
              className="request-detail-address"
              aria-label="상세 주소"
              placeholder="상세 주소를 입력해주세요 (예: 101동 202호)"
            />
            <div className="request-map-preview" aria-label={`${careRequest.region || "방문 위치"} 지도 미리보기`}>
              <img className="request-map-image" src={asset("jeju-map-preview.svg")} alt="" />
              <span className="request-map-marker" aria-hidden="true" />
              <span>{careRequest.region || "방문 위치"}</span>
            </div>
          </section>

          {!isFilterMode && (
            <section className="request-write-card" aria-labelledby="request-note-title">
              <h2 id="request-note-title">요청 메모</h2>
              <textarea
                value={careRequest.requestNote}
                onChange={(event) => onChange("requestNote", event.target.value)}
                placeholder="가치이웃에게 전달할 요청 내용을 적어주세요. (예: 병원 접수와 수납을 함께 도와주세요.)"
              />
            </section>
          )}

          <aside className="request-trust-hint">
            <img src={asset("request-shield-icon.png")} alt="" aria-hidden="true" />
            <p>
              {isFilterMode
                ? "입력한 조건은 가치이웃 목록을 보여주기 위한 기준으로 사용돼요. 선택 전까지 요청은 전송되지 않아요."
                : "모든 가치이웃은 본인 인증 및 범죄 경력 조회가 완료된 신뢰할 수 있는 분들입니다. 걱정 마시고 도움을 요청하세요."}
            </p>
          </aside>
        </form>
      </main>

      <footer className="request-write-footer">
        <button type="button" onClick={onSubmitRequest}>
          {submitLabel || "조건에 맞는 가치이웃 보기"}
          <img src={asset("request-arrow-right.png")} alt="" aria-hidden="true" />
        </button>
      </footer>
    </section>
  );
}
