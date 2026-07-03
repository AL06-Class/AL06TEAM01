import type { CareRequest } from "../../types/careRequest";

type CareRequestFormProps = {
  careRequest: CareRequest;
  onChange: (field: keyof CareRequest, value: string) => void;
  onFindProviders: () => void;
};

export function CareRequestForm({
  careRequest,
  onChange,
  onFindProviders
}: CareRequestFormProps) {
  return (
    <section className="section-card" aria-labelledby="care-request-title">
      <div className="section-card-header">
        <p className="section-kicker">핵심기능 1 - 신청 / 탐색</p>
        <h2 id="care-request-title">돌봄 요청 조건 입력</h2>
      </div>

      <div className="form-grid">
        <label>
          <span>지역 선택</span>
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
          <span>날짜 선택</span>
          <input
            type="date"
            value={careRequest.date}
            onChange={(event) => onChange("date", event.target.value)}
          />
        </label>

        <label>
          <span>시간 선택</span>
          <select
            value={careRequest.time}
            onChange={(event) => onChange("time", event.target.value)}
          >
            <option value="">시간을 선택하세요</option>
            <option value="09:00-12:00">09:00-12:00</option>
            <option value="13:00-16:00">13:00-16:00</option>
            <option value="17:00-20:00">17:00-20:00</option>
          </select>
        </label>

        <label>
          <span>돌봄 유형</span>
          <select
            value={careRequest.careType}
            onChange={(event) => onChange("careType", event.target.value)}
          >
            <option value="">돌봄 유형을 선택하세요</option>
            <option value="가사 도움">가사 도움</option>
            <option value="식사 도움">식사 도움</option>
            <option value="병원 동행">병원 동행</option>
            <option value="생활 돌봄">생활 돌봄</option>
          </select>
        </label>

        <label>
          <span>결제 방식</span>
          <select
            value={careRequest.paymentPlan}
            onChange={(event) => onChange("paymentPlan", event.target.value)}
          >
            <option value="single">건별 결제</option>
            <option value="subscription">구독 패키지</option>
          </select>
        </label>

        <label>
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

      <button className="primary-button full-button" type="button" onClick={onFindProviders}>
        조건에 맞는 도우미 찾기
      </button>
    </section>
  );
}
