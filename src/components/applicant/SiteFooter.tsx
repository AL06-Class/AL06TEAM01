import { SERVICE_NAME } from "../../constants";

const footerColumns = [
  {
    title: "서비스",
    items: ["서비스 소개", "이용 방법", "요금 안내", "이용 후기"]
  },
  {
    title: "회사",
    items: ["공지사항", "이용약관", "개인정보 처리방침"]
  },
  {
    title: "고객센터",
    items: ["평일 10:00–18:00", "help@eeumcare.co.kr"]
  }
];

export function SiteFooter() {
  return (
    <footer className="app-footer" id="support">
      <div className="footer-inner">
        <div className="footer-grid">
          <div className="footer-col">
            <strong>{SERVICE_NAME}</strong>
            <p className="footer-brand-desc">
              멀리 있어도 가까운 이웃처럼, 신뢰로 잇는 부모님 방문 돌봄 서비스.
            </p>
          </div>
          {footerColumns.map((column) => (
            <div className="footer-col" key={column.title}>
              <span className="footer-col-title">{column.title}</span>
              {column.items.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          ))}
        </div>
        <div className="footer-bottom">© 2026 {SERVICE_NAME}. 신청자 예약과 이용 문의를 도와드립니다.</div>
      </div>
    </footer>
  );
}
