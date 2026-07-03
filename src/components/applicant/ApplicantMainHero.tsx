import { SERVICE_NAME } from "../../constants";

type ApplicantMainHeroProps = {
  onStartRequest: () => void;
  onShowGuide: () => void;
};

const featureItems = ["구독 패키지", "건별 결제", "신청자 제안 금액", "검증 도우미"];

export function ApplicantMainHero({ onStartRequest, onShowGuide }: ApplicantMainHeroProps) {
  return (
    <section className="app-hero" aria-labelledby="applicant-hero-title">
      <nav className="top-nav" aria-label="주요 메뉴">
        <a className="brand" href="#top" aria-label={`${SERVICE_NAME} 홈`}>
          {SERVICE_NAME}
        </a>
        <div className="nav-links">
          <a href="#service">서비스</a>
          <a href="#how-to-use">이용방법</a>
          <a href="#reviews">후기</a>
          <a href="#support">고객센터</a>
        </div>
        <a className="mypage-link" href="#my-page">
          My Page
        </a>
      </nav>

      <div className="hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">{SERVICE_NAME} 돌봄 신청자 view</p>
          <h1 id="applicant-hero-title">
            우리 가족에게 필요한 돌봄을,
            <br />
            가까운 이웃에게 쉽게 요청하세요
          </h1>
          <p className="hero-description">
            복잡한 절차 없이 필요한 시간에 돌봄을 신청하세요.
          </p>
          <div className="hero-actions">
            <button className="primary-button" type="button" onClick={onStartRequest}>
              돌봄 신청하기
            </button>
            <button className="secondary-button" type="button" onClick={onShowGuide}>
              서비스 안내
            </button>
          </div>
        </div>

        <div className="hero-panel" aria-label="돌봄 신청 흐름 요약">
          <div className="flow-step is-active">
            <span>1</span>
            <strong>요청</strong>
            <p>지역과 시간을 입력합니다</p>
          </div>
          <div className="flow-step">
            <span>2</span>
            <strong>탐색</strong>
            <p>검증된 이웃 제공자를 비교합니다</p>
          </div>
          <div className="flow-step">
            <span>3</span>
            <strong>예약</strong>
            <p>건별 결제 또는 구독 패키지로 확정합니다</p>
          </div>
          <div className="flow-step">
            <span>4</span>
            <strong>소통</strong>
            <p>리포트와 메시지로 진행을 확인합니다</p>
          </div>
        </div>
      </div>

      <ul className="feature-list" aria-label="서비스 특징">
        {featureItems.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}
