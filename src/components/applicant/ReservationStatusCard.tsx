import type { ReservationStatus } from "../../types/reservation";

type ReservationStatusCardProps = {
  status: ReservationStatus;
  onShowMessages: () => void;
};

const statusLabel: Record<ReservationStatus, string> = {
  pending: "대기",
  confirmed: "예약 확정",
  paid: "결제 완료"
};

export function ReservationStatusCard({ status, onShowMessages }: ReservationStatusCardProps) {
  return (
    <section className="section-card compact-card" aria-labelledby="reservation-status-title">
      <div className="section-card-header">
        <p className="section-kicker">예약 관리 페이지</p>
        <h2 id="reservation-status-title">예약 진행 상태</h2>
      </div>

      <dl className="info-list">
        <div>
          <dt>예약 번호</dt>
          <dd>REQ-20250517-001</dd>
        </div>
        <div>
          <dt>진행 상태</dt>
          <dd>
            <span className={`status-pill status-${status}`}>{statusLabel[status]}</span>
          </dd>
        </div>
      </dl>

      <div className="button-row">
        <button className="secondary-button" type="button" onClick={onShowMessages}>
          메시지 보기
        </button>
        <button className="secondary-button" type="button">
          상세 보기
        </button>
      </div>
    </section>
  );
}
