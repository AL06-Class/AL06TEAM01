const myPageItems = ["예약 내역", "결제 관리", "가족 정보", "리뷰 관리"];

export function ApplicantMyPageCard() {
  return (
    <section className="section-card compact-card" id="my-page" aria-labelledby="applicant-my-page-title">
      <div className="section-card-header">
        <p className="section-kicker">신청자 My Page</p>
        <h2 id="applicant-my-page-title">내 돌봄 관리</h2>
      </div>

      <ul className="simple-list">
        {myPageItems.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}
