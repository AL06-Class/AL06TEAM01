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

export function GuardianRequestForm({
  careRequest,
  selectedHelper,
  submitLabel,
  onChange,
  onBackSearch,
  onSubmitRequest
}: GuardianRequestFormProps) {
  const asset = (name: string) => `/figma-assets/${name}`;
  const isOtherSelected = !helpTypes.includes(careRequest.careType);

  return (
    <section className="guardian-request request-write-page" aria-labelledby="guardian-request-title">
      <header className="request-write-header">
        <button className="search-back-button" type="button" onClick={onBackSearch} aria-label="검색으로 돌아가기">
          <svg aria-hidden="true" viewBox="0 0 24 24">
            <path d="M15 18L9 12L15 6" />
          </svg>
        </button>
        <h1>도움 요청하기</h1>
      </header>

      <main className="request-write-main">
        <section className="request-write-hero" aria-labelledby="guardian-request-title">
          <h2 id="guardian-request-title">
            이웃에게 도움을
            <br />
            요청해보세요.
          </h2>
          <p>믿을 수 있는 '가치이웃'들이 기다리고 있습니다.</p>
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
            <h2 id="help-type-title">어떤 도움이 필요하신가요?</h2>
            <div className="request-chip-list">
              {helpTypes.map((helpType) => (
                <button
                  className={careRequest.careType === helpType ? "is-selected" : ""}
                  key={helpType}
                  type="button"
                  onClick={() => onChange("careType", helpType)}
                >
                  {helpType}
                </button>
              ))}
              <button
                className={isOtherSelected ? "is-selected" : ""}
                type="button"
                onClick={() => onChange("careType", isOtherSelected ? careRequest.careType : "기타")}
              >
                  기타
              </button>
            </div>
            {isOtherSelected && (
              <label className="request-other-field">
                <span>필요한 도움을 직접 입력해주세요.</span>
                <input
                  aria-label="기타 도움 내용"
                  value={careRequest.careType === "기타" ? "" : careRequest.careType}
                  onChange={(event) => onChange("careType", event.target.value || "기타")}
                  placeholder="예: 가전제품 사용법 알려주세요"
                />
              </label>
            )}
          </section>

          <section className="request-write-card" aria-labelledby="visit-time-title">
            <h2 id="visit-time-title">언제 방문할까요?</h2>
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
            <h2 id="visit-location-title">어디로 방문할까요?</h2>
            <div className="request-location-row">
              <input
                aria-label="방문 주소"
                value={careRequest.region}
                onChange={(event) => onChange("region", event.target.value)}
                placeholder="제주시 조천읍"
              />
              <button type="button">위치 찾기</button>
            </div>
            <input
              className="request-detail-address"
              aria-label="상세 주소"
              placeholder="상세 주소를 입력해주세요 (예: 101동 202호)"
            />
            <div className="request-map-preview" aria-hidden="true">
              <img className="request-map-image" src={asset("request-map.png")} alt="" />
              <img className="request-map-pin" src={asset("request-map-pin.png")} alt="" />
            </div>
          </section>

          <section className="request-write-card" aria-labelledby="request-note-title">
            <h2 id="request-note-title">요청 메모</h2>
            <textarea
              value={careRequest.requestNote}
              onChange={(event) => onChange("requestNote", event.target.value)}
              placeholder="도움이 필요한 내용을 자세히 적어주시면 더 적합한 이웃을 추천해드릴 수 있어요. (예: 거동이 조금 불편하십니다.)"
            />
          </section>

          <aside className="request-trust-hint">
            <img src={asset("request-shield-icon.png")} alt="" aria-hidden="true" />
            <p>모든 가치이웃은 본인 인증 및 범죄 경력 조회가 완료된 신뢰할 수 있는 분들입니다. 걱정 마시고 도움을 요청하세요.</p>
          </aside>
        </form>
      </main>

      <footer className="request-write-footer">
        <button type="button" onClick={onSubmitRequest}>
          {submitLabel || "조건에 맞는 가치이웃 찾기"}
          <img src={asset("request-arrow-right.png")} alt="" aria-hidden="true" />
        </button>
      </footer>
    </section>
  );
}
