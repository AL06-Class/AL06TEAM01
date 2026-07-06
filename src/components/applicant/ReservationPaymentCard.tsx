import type { CareRequest } from "../../types/careRequest";
import type { Provider } from "../../types/provider";
import type { ReservationStatus } from "../../types/reservation";

type ReservationPaymentCardProps = {
  selectedProvider?: Provider;
  careRequest: CareRequest;
  status: ReservationStatus;
  onPay: () => void;
};

const formatPrice = (price: number) => `${price.toLocaleString("ko-KR")}원`;

export function ReservationPaymentCard({
  selectedProvider,
  careRequest,
  status,
  onPay
}: ReservationPaymentCardProps) {
  const proposedPrice = Number(careRequest.proposedPrice);
  const finalPrice = proposedPrice > 0 ? proposedPrice : selectedProvider?.price ?? 33000;
  const paymentPlanLabel = careRequest.paymentPlan === "subscription" ? "구독 패키지" : "건별 결제";

  return (
    <section className="section-card compact-card" aria-labelledby="reservation-payment-title">
      <div className="section-card-header">
        <p className="section-kicker">핵심기능 2 - 예약 / 결제</p>
        <h2 id="reservation-payment-title">예약 상세 / 결제 페이지</h2>
      </div>

      <dl className="info-list">
        <div>
          <dt>예약 일시</dt>
          <dd>2025-05-17 09:00-12:00</dd>
        </div>
        <div>
          <dt>돌봄 유형</dt>
          <dd>{careRequest.careTypes.length > 0 ? careRequest.careTypes.join(", ") : "가사 도움"}</dd>
        </div>
        <div>
          <dt>결제 방식</dt>
          <dd>{paymentPlanLabel}</dd>
        </div>
        <div>
          <dt>선택 제공자</dt>
          <dd>{selectedProvider?.name ?? "제공자를 선택해주세요"}</dd>
        </div>
        <div>
          <dt>신청자 제안 금액</dt>
          <dd className="price-text">{formatPrice(finalPrice)}</dd>
        </div>
      </dl>

      <button className="primary-button full-button" type="button" onClick={onPay}>
        {status === "paid" ? "결제 완료" : `${paymentPlanLabel} 진행하기`}
      </button>
    </section>
  );
}
