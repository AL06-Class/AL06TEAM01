import type { CareRequest } from "../../types/careRequest";
import type { Helper } from "../../types/helper";

type GuardianRequestConfirmProps = {
  careRequest: CareRequest;
  selectedHelper?: Helper;
  onBack: () => void;
  onSubmit: () => void;
};

const formatPrice = (price?: number) => `${(price || 15000).toLocaleString("ko-KR")}원`;

const formatVisitDateTime = (date: string, time: string) => {
  const [startTime] = time.split("-");
  const dateText = date || "2026-07-22";
  const timeText = startTime || "13:00";

  return `${dateText} ${timeText}`;
};

export function GuardianRequestConfirm({
  careRequest,
  selectedHelper,
  onBack,
  onSubmit
}: GuardianRequestConfirmProps) {
  const asset = (name: string) => `/figma-assets/${name}`;
  const helperName = selectedHelper?.name || "가치이웃";
  const helperPrice = selectedHelper?.price || Number(careRequest.proposedPrice) || 15000;

  return (
    <section className="guardian-request-confirm" aria-labelledby="request-confirm-title">
      <header className="request-confirm-header">
        <button type="button" onClick={onBack} aria-label="요청서로 돌아가기">
          <img src={asset("request-confirm-icon-02.svg")} alt="" aria-hidden="true" />
        </button>
        <h1>요청 확인</h1>
      </header>

      <main className="request-confirm-main">
        <section className="request-confirm-copy" aria-labelledby="request-confirm-title">
          <h2 id="request-confirm-title">마지막으로 확인해주세요</h2>
          <p>선택하신 이웃님께 도움 요청을 보낼까요?</p>
        </section>

        <section className="request-confirm-card" aria-labelledby="request-confirm-detail-title">
          <h3 id="request-confirm-detail-title">
            <img src={asset("request-confirm-icon-10.svg")} alt="" aria-hidden="true" />
            도움 상세 정보
          </h3>
          <dl className="request-confirm-detail-list">
            <div>
              <img src={asset("request-confirm-icon-03.svg")} alt="" aria-hidden="true" />
              <dt>도움 종류</dt>
              <dd>{careRequest.careType}</dd>
            </div>
            <div>
              <img src={asset("request-confirm-icon-04.svg")} alt="" aria-hidden="true" />
              <dt>날짜 및 시간</dt>
              <dd>{formatVisitDateTime(careRequest.date, careRequest.time)}</dd>
            </div>
            <div>
              <img src={asset("request-confirm-icon-06.svg")} alt="" aria-hidden="true" />
              <dt>장소</dt>
              <dd>{careRequest.region}</dd>
            </div>
          </dl>
        </section>

        <section className="request-confirm-card" aria-labelledby="request-confirm-helper-title">
          <h3 id="request-confirm-helper-title">
            <img src={asset("request-confirm-icon-07.svg")} alt="" aria-hidden="true" />
            매칭된 이웃
          </h3>
          <article className="request-confirm-helper-card">
            {selectedHelper && <img className="request-confirm-helper-photo" src={selectedHelper.imageUrl} alt="" />}
            <div>
              <div className="request-confirm-helper-name">
                <strong>{helperName} 님</strong>
                <span>인증회원</span>
              </div>
              <p>
                <img src={asset("request-confirm-icon-08.svg")} alt="" aria-hidden="true" />
                {selectedHelper ? `${selectedHelper.rating.toFixed(1)} (후기 ${selectedHelper.reviewCount}개)` : "4.9 (후기 42개)"}
                <small>매칭 {selectedHelper?.completedCount || 128}회</small>
              </p>
            </div>
            <img className="request-confirm-chevron" src={asset("request-confirm-icon-09.svg")} alt="" aria-hidden="true" />
          </article>
        </section>

        <section className="request-confirm-cost" aria-labelledby="request-confirm-cost-title">
          <img className="request-confirm-cost-pattern" src={asset("request-confirm-icon-11.svg")} alt="" aria-hidden="true" />
          <p id="request-confirm-cost-title">예상 지불 비용</p>
          <strong>{formatPrice(helperPrice)}</strong>
          <span>봉사료 포함</span>
          <small>정확한 비용은 서비스 완료 후 확정됩니다.</small>
        </section>

        <aside className="request-confirm-safety">
          <img src={asset("request-confirm-icon-05.svg")} alt="" aria-hidden="true" />
          <p>
            가치이음은 모든 이웃의 신원을 범죄 경력 조회 및 실명 인증을 통해 검증합니다. 서비스 중 발생하는 모든 활동은 안심 보호 시스템의 보호를 받습니다.
          </p>
        </aside>
      </main>

      <footer className="request-confirm-footer">
        <button type="button" onClick={onSubmit}>
          요청 보내기
          <img src={asset("request-confirm-icon-01.svg")} alt="" aria-hidden="true" />
        </button>
      </footer>
    </section>
  );
}
