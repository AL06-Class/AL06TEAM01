import { SERVICE_NAME } from "../../constants";
import type { CareRequest } from "../../types/careRequest";
import type { Helper } from "../../types/helper";

type GuardianRequestStatusProps = {
  careRequest: CareRequest;
  selectedHelper?: Helper;
  onBackRequest: () => void;
  onGoHome: () => void;
  onOpenSearch: () => void;
  onOpenMatch: () => void;
  onOpenProfile: () => void;
  onOpenSchedule: () => void;
};

const formatPrice = (price?: number) => (price ? `${price.toLocaleString("ko-KR")}원` : "-");

export function GuardianRequestStatus({
  careRequest,
  selectedHelper,
  onBackRequest,
  onGoHome,
  onOpenSearch,
  onOpenMatch,
  onOpenProfile,
  onOpenSchedule
}: GuardianRequestStatusProps) {
  const asset = (name: string) => `/figma-assets/${name}`;

  return (
    <section className="guardian-status" aria-labelledby="guardian-status-title">
      <p className="search-context-label">요청 확인</p>

      <header className="guardian-search-header">
        <button className="search-back-button" type="button" onClick={onBackRequest} aria-label="요청 작성으로 돌아가기">
          ←
        </button>
        <strong>{SERVICE_NAME}</strong>
        <button className="search-bell-button" type="button" aria-label="알림">
          <img src={asset("icon-bell.svg")} alt="" aria-hidden="true" />
        </button>
      </header>

      <div className="request-status-hero">
        <span>요청 전달 준비 완료</span>
        <h1 id="guardian-status-title">
          요청 내용을 확인하고
          <br />
          수락을 기다려요
        </h1>
        <p>가치이웃이 내용을 확인하고 수락하면 일정이 확정됩니다.</p>
      </div>

      {selectedHelper && (
        <article className="status-provider-card" aria-label="요청을 받을 가치이웃">
          <img src={selectedHelper.imageUrl} alt="" />
          <div>
            <span>요청을 받을 가치이웃</span>
            <strong>{selectedHelper.name}</strong>
            <p>★ {selectedHelper.rating.toFixed(1)} · 후기 {selectedHelper.reviewCount}개</p>
          </div>
          <b>
            {formatPrice(selectedHelper.price)}
            <small>/시간</small>
          </b>
        </article>
      )}

      <section className="request-summary-card" aria-labelledby="request-summary-title">
        <h2 id="request-summary-title">요청 내용</h2>
        <dl>
          <div>
            <dt>도움 유형</dt>
            <dd>{careRequest.careType}</dd>
          </div>
          <div>
            <dt>날짜</dt>
            <dd>{careRequest.date}</dd>
          </div>
          <div>
            <dt>시간</dt>
            <dd>{careRequest.time}</dd>
          </div>
          <div>
            <dt>장소</dt>
            <dd>{careRequest.region}</dd>
          </div>
        </dl>
        <p>{careRequest.requestNote || "요청 메모가 아직 입력되지 않았습니다."}</p>
      </section>

      <ol className="request-status-steps" aria-label="요청 진행 단계">
        <li className="is-current">
          <strong>요청 확인</strong>
          <span>작성한 내용을 다시 확인합니다.</span>
        </li>
        <li>
          <strong>가치이웃 수락 대기</strong>
          <span>가치이웃이 가능한 일정을 확인합니다.</span>
        </li>
        <li>
          <strong>일정 확정</strong>
          <span>수락 후 상세 안내가 이어집니다.</span>
        </li>
      </ol>

      <div className="request-consent-note">
        <strong>확정 전 안내</strong>
        <p>요청 확정 전까지 민감 정보는 필요한 범위 이상으로 공개하지 않습니다.</p>
      </div>

      <button className="guardian-request-submit status-inline-submit" type="button" onClick={onOpenSchedule}>
        일정 진행 상태 보기
      </button>

      <nav className="search-bottom-nav status-bottom-nav" aria-label="하단 메뉴">
        <button type="button" onClick={onGoHome}>
          <img src={asset("icon-home.svg")} alt="" aria-hidden="true" />
          홈
        </button>
        <button type="button" onClick={onOpenSearch}>
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
