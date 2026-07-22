import type { CareReportItem } from "../../types/careReport";

type LiveCareReportProps = {
  items: CareReportItem[];
};

export function LiveCareReport({ items }: LiveCareReportProps) {
  return (
    <section className="section-card compact-card" aria-labelledby="live-care-report-title">
      <div className="section-card-header">
        <p className="section-kicker">핵심 기능 3 - 진행 / 소통</p>
        <h2 id="live-care-report-title">실시간 진행 리포트</h2>
      </div>

      <ol className="timeline-list">
        {items.map((item) => (
          <li key={`${item.time}-${item.label}`}>
            <time>{item.time}</time>
            <div className="timeline-dot-track" aria-hidden="true">
              <span />
              <i />
            </div>
            <div>
              <strong>{item.label}</strong>
              {item.description && <p>{item.description}</p>}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
