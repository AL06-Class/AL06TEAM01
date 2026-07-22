import { SERVICE_NAME } from "../../constants";
import type { CareRequest } from "../../types/careRequest";
import type { Helper } from "../../types/helper";

type GuardianRequestFormProps = {
  careRequest: CareRequest;
  selectedHelper?: Helper;
  onChange: (field: keyof CareRequest, value: string) => void;
  onGoHome: () => void;
  onBackSearch: () => void;
  onOpenMatch: () => void;
  onOpenProfile: () => void;
  onSubmitRequest: () => void;
};

const formatPrice = (price?: number) => (price ? `${price.toLocaleString("ko-KR")}원` : "-");

export function GuardianRequestForm({
  careRequest,
  selectedHelper,
  onChange,
  onGoHome,
  onBackSearch,
  onOpenMatch,
  onOpenProfile,
  onSubmitRequest
}: GuardianRequestFormProps) {
  const asset = (name: string) => `/figma-assets/${name}`;

  return (
    <section className="guardian-request" aria-labelledby="guardian-request-title">
      <p className="search-context-label">도움 요청 작성</p>

      <header className="guardian-search-header">
        <button className="search-back-button" type="button" onClick={onBackSearch} aria-label="검색으로 돌아가기">
          ←
        </button>
        <strong>{SERVICE_NAME}</strong>
        <button className="search-bell-button" type="button" aria-label="알림">
          <img src={asset("icon-bell.svg")} alt="" aria-hidden="true" />
        </button>
      </header>

      <div className="guardian-request-copy">
        <h1 id="guardian-request-title">어떤 도움이 필요하신가요?</h1>
        <p>선택한 가치이웃이 확인할 수 있도록 필요한 내용만 차분히 적어주세요.</p>
      </div>

      {selectedHelper && (
        <article className="selected-provider-strip" aria-label="선택한 가치이웃">
          <img src={selectedHelper.imageUrl} alt="" />
          <div>
            <span>선택한 가치이웃</span>
            <strong>{selectedHelper.name}</strong>
            <p>★ {selectedHelper.rating.toFixed(1)} · {selectedHelper.distance}</p>
          </div>
          <b>{formatPrice(selectedHelper.price)}<small>/시간</small></b>
        </article>
      )}

      <form className="guardian-request-form">
        <label>
          <span>도움 유형</span>
          <select value={careRequest.careType} onChange={(event) => onChange("careType", event.target.value)}>
            <option value="장보기 동행">장보기 동행</option>
            <option value="디지털 기기 도움">디지털 기기 도움</option>
            <option value="관공서 동행">관공서 동행</option>
            <option value="산책/운동 동행">산책/운동 동행</option>
          </select>
        </label>

        <div className="request-two-column">
          <label>
            <span>날짜</span>
            <input type="date" value={careRequest.date} onChange={(event) => onChange("date", event.target.value)} />
          </label>
          <label>
            <span>시간</span>
            <select value={careRequest.time} onChange={(event) => onChange("time", event.target.value)}>
              <option value="09:00-12:00">오전 9시-12시</option>
              <option value="13:00-16:00">오후 1시-4시</option>
              <option value="17:00-20:00">오후 5시-8시</option>
            </select>
          </label>
        </div>

        <label>
          <span>도움 장소</span>
          <input
            value={careRequest.region}
            onChange={(event) => onChange("region", event.target.value)}
            placeholder="예: 제주시 조천읍"
          />
        </label>

        <label>
          <span>요청 메모</span>
          <textarea
            rows={5}
            value={careRequest.requestNote}
            onChange={(event) => onChange("requestNote", event.target.value)}
            placeholder="예: 어머니가 천천히 걷습니다. 장보기 후 집 앞까지 동행해 주세요."
          />
        </label>
      </form>

      <div className="request-consent-note">
        <strong>안전 안내</strong>
        <p>부모님 동의와 필요한 정보 제공 범위는 요청 확정 전에 다시 확인합니다.</p>
      </div>

      <button className="guardian-request-submit request-submit-above-nav" type="button" onClick={onSubmitRequest}>
        요청 내용 확인하기
      </button>
      <nav className="search-bottom-nav request-bottom-nav" aria-label="하단 메뉴">
        <button type="button" onClick={onGoHome}>
          <img src={asset("icon-home.svg")} alt="" aria-hidden="true" />
          홈
        </button>
        <button type="button" onClick={onBackSearch}>
          <img src={asset("icon-search.svg")} alt="" aria-hidden="true" />
          검색
        </button>
        <button className="is-active" type="button" onClick={onOpenMatch}>
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
