const stats = [
  { value: "2,400+", label: "검증 완료 도우미" },
  { value: "38,000회", label: "누적 돌봄 방문" },
  { value: "4.9", label: "평균 만족도 평점" }
];

export function TrustStatsBar() {
  return (
    <section className="trust-stats-section" aria-label="이음케어 신뢰 통계">
      <div className="trust-stats-inner">
        <p className="trust-stats-headline">
          이음케어는 <strong>신원 확인을 마친 이웃 도우미</strong>만 부모님과 연결합니다
        </p>
        <div className="trust-stat-grid">
          {stats.map((stat) => (
            <div className="trust-stat-card" key={stat.label}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
