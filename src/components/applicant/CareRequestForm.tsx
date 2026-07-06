import { useState } from "react";
import type { CareRequest } from "../../types/careRequest";

type CareRequestFormProps = {
  careRequest: CareRequest;
  onChange: (field: keyof CareRequest, value: string) => void;
  onToggleCareType: (careType: string) => void;
  onFindProviders: () => void;
};

const TIME_PRESETS = [
  { value: "09:00-12:00", label: "오전 · 09-12시" },
  { value: "13:00-17:00", label: "오후 · 13-17시" },
  { value: "18:00-21:00", label: "저녁 · 18-21시" }
];

const CARE_TYPE_OPTIONS = ["가사 도움", "식사 도움", "병원 동행", "생활 돌봄"];

const PRICE_QUICK_PICKS = ["20000", "25000", "30000"];

function splitTimeRange(time: string): [string, string] {
  const [start, end] = time.split("-");
  return [start ?? "09:00", end ?? "12:00"];
}

function formatDurationLabel(time: string): string {
  const [start, end] = splitTimeRange(time);
  const [startHour, startMinute] = start.split(":").map(Number);
  const [endHour, endMinute] = end.split(":").map(Number);

  if ([startHour, startMinute, endHour, endMinute].some((value) => Number.isNaN(value))) {
    return `선택한 시간 · ${time}`;
  }

  const durationHours = endHour + endMinute / 60 - (startHour + startMinute / 60);
  return `선택한 시간 · ${start} – ${end} (${durationHours}시간)`;
}

export function CareRequestForm({
  careRequest,
  onChange,
  onToggleCareType,
  onFindProviders
}: CareRequestFormProps) {
  const [isCustomTime, setIsCustomTime] = useState(
    () => !TIME_PRESETS.some((preset) => preset.value === careRequest.time)
  );
  const [customStart, customEnd] = splitTimeRange(careRequest.time);

  return (
    <section className="section-card" aria-labelledby="care-request-title">
      <div className="section-card-header">
        <p className="section-kicker">핵심기능 1 - 신청 / 탐색</p>
        <h2 id="care-request-title">돌봄 요청 조건 입력</h2>
      </div>

      <div className="request-group-list">
        <div className="request-group">
          <div className="request-group-header">
            <span className="request-group-badge">1</span>
            <div>
              <h3>언제, 어디서 방문할까요</h3>
              <p>정확한 지역과 일정을 알려주시면 더 빠르게 매칭돼요</p>
            </div>
          </div>

          <div className="request-group-body form-grid">
            <label>
              <span>방문 지역</span>
              <select
                value={careRequest.region}
                onChange={(event) => onChange("region", event.target.value)}
              >
                <option value="">지역을 선택하세요</option>
                <option value="서울 강남구">서울 강남구</option>
                <option value="서울 송파구">서울 송파구</option>
                <option value="경기 성남시">경기 성남시</option>
              </select>
            </label>

            <label>
              <span>방문 날짜</span>
              <input
                type="date"
                value={careRequest.date}
                onChange={(event) => onChange("date", event.target.value)}
              />
            </label>

            <div className="full-field">
              <span className="chip-group-label">방문 시간</span>
              <div className="chip-group" role="group" aria-label="방문 시간">
                {TIME_PRESETS.map((preset) => (
                  <button
                    key={preset.value}
                    type="button"
                    className={`chip chip-solid ${!isCustomTime && careRequest.time === preset.value ? "is-selected" : ""}`}
                    onClick={() => {
                      setIsCustomTime(false);
                      onChange("time", preset.value);
                    }}
                  >
                    {preset.label}
                  </button>
                ))}
                <button
                  type="button"
                  className={`chip chip-solid chip-dashed ${isCustomTime ? "is-selected" : ""}`}
                  onClick={() => setIsCustomTime(true)}
                >
                  시간 직접 설정
                </button>
              </div>

              {isCustomTime && (
                <div className="custom-time-inputs">
                  <input
                    type="time"
                    value={customStart}
                    onChange={(event) => onChange("time", `${event.target.value}-${customEnd}`)}
                  />
                  <span>–</span>
                  <input
                    type="time"
                    value={customEnd}
                    onChange={(event) => onChange("time", `${customStart}-${event.target.value}`)}
                  />
                </div>
              )}

              <p className="chip-group-caption">{formatDurationLabel(careRequest.time)}</p>
            </div>
          </div>
        </div>

        <div className="request-group">
          <div className="request-group-header">
            <span className="request-group-badge">2</span>
            <div>
              <h3>어떤 도움이 필요할까요</h3>
              <p>필요한 돌봄 유형을 모두 선택해주세요 (중복 가능)</p>
            </div>
          </div>

          <div className="request-group-body">
            <span className="chip-group-label">돌봄 유형</span>
            <div className="chip-group" role="group" aria-label="돌봄 유형">
              {CARE_TYPE_OPTIONS.map((careType) => (
                <button
                  key={careType}
                  type="button"
                  className={`chip chip-soft ${careRequest.careTypes.includes(careType) ? "is-selected" : ""}`}
                  onClick={() => onToggleCareType(careType)}
                >
                  {careType}
                </button>
              ))}
            </div>

            <div className="form-grid" style={{ marginTop: "18px" }}>
              <label className="full-field">
                <span>원하는 도우미 역량</span>
                <textarea
                  rows={3}
                  placeholder="예: 요양보호사 자격증, 디지털 기기 도움, 산책·취미 동행 가능"
                  value={careRequest.preferredSkills}
                  onChange={(event) => onChange("preferredSkills", event.target.value)}
                />
              </label>

              <label className="full-field">
                <span>요청 사항</span>
                <textarea
                  rows={4}
                  placeholder="필요한 도움과 주의사항을 입력하세요"
                  value={careRequest.requestNote}
                  onChange={(event) => onChange("requestNote", event.target.value)}
                />
              </label>
            </div>
          </div>
        </div>

        <div className="request-group">
          <div className="request-group-header">
            <span className="request-group-badge">3</span>
            <div>
              <h3>예산과 결제 방식</h3>
              <p>제안하신 금액을 참고해 도우미님들이 지원하십니다</p>
            </div>
          </div>

          <div className="request-group-body">
            <span className="chip-group-label">결제 방식</span>
            <div className="segmented" role="group" aria-label="결제 방식">
              <button
                type="button"
                className={`segmented-option ${careRequest.paymentPlan === "single" ? "is-selected" : ""}`}
                onClick={() => onChange("paymentPlan", "single")}
              >
                건별 결제
              </button>
              <button
                type="button"
                className={`segmented-option ${careRequest.paymentPlan === "subscription" ? "is-selected" : ""}`}
                onClick={() => onChange("paymentPlan", "subscription")}
              >
                구독 패키지
              </button>
            </div>

            <label className="full-field" style={{ marginTop: "18px" }}>
              <span>신청자 제안 금액</span>
              <input
                type="number"
                min="0"
                step="1000"
                placeholder="예: 30000"
                value={careRequest.proposedPrice}
                onChange={(event) => onChange("proposedPrice", event.target.value)}
              />
            </label>

            <div className="chip-group price-quick-picks">
              {PRICE_QUICK_PICKS.map((price) => (
                <button
                  key={price}
                  type="button"
                  className={`chip chip-solid ${careRequest.proposedPrice === price ? "is-selected" : ""}`}
                  onClick={() => onChange("proposedPrice", price)}
                >
                  {Number(price).toLocaleString("ko-KR")}원
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <button className="primary-button full-button" type="button" onClick={onFindProviders}>
        조건에 맞는 도우미 찾기
      </button>
    </section>
  );
}
