import { SERVICE_NAME } from "../../constants";

type ApplicantMainHeroProps = {
  onStartRequest: () => void;
  onShowGuide: () => void;
};

const trustChips = ["신원 확인 도우미", "실시간 케어 리포트", "안전 결제 보호"];

export function ApplicantMainHero({ onStartRequest, onShowGuide }: ApplicantMainHeroProps) {
  return (
    <>
      <nav className="top-nav" aria-label="주요 메뉴">
        <a className="brand" href="#top" aria-label={`${SERVICE_NAME} 홈`}>
          {SERVICE_NAME}
        </a>
        <div className="nav-links">
          <a href="#service">서비스</a>
          <a href="#how">이용방법</a>
          <a href="#reviews">후기</a>
          <a href="#pricing">요금</a>
        </div>
        <div className="nav-actions">
          <a className="mypage-link" href="#my-page">
            My Page
          </a>
          <button className="primary-button small-button" type="button" onClick={onStartRequest}>
            돌봄 신청하기
          </button>
        </div>
      </nav>

      <section className="hero-section" aria-labelledby="applicant-hero-title">
        <div className="hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">멀리 있어도, 가까운 이웃처럼</p>
            <h1 id="applicant-hero-title">
              우리 가족에게 필요한 돌봄을,
              <br />
              가까운 이웃에게
              <br />
              쉽게 요청하세요
            </h1>
            <p className="hero-description">
              복잡한 절차 없이 필요한 시간에 돌봄을 신청하고, 신원 확인을 마친 이웃 도우미님과 안전하게
              연결됩니다.
            </p>
            <div className="hero-actions">
              <button className="primary-button" type="button" onClick={onStartRequest}>
                돌봄 신청하기
              </button>
              <button className="secondary-button" type="button" onClick={onShowGuide}>
                서비스 안내
              </button>
            </div>
            <div className="hero-trust-chips">
              {trustChips.map((chip) => (
                <span key={chip}>{chip}</span>
              ))}
            </div>
          </div>

          <div className="hero-visual">
            <svg
              viewBox="0 0 560 470"
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              aria-label="이웃 도우미가 부모님을 따뜻하게 돌보는 일러스트"
            >
              <rect x="24" y="60" width="512" height="330" rx="72" fill="#e2f0e6" />
              <circle cx="476" cy="120" r="30" fill="#cfe8d6" />
              <circle cx="86" cy="112" r="18" fill="#cfe8d6" />
              <ellipse cx="300" cy="360" rx="150" ry="18" fill="#000000" opacity="0.05" />
              <g fill="#ef958d">
                <path
                  transform="translate(178,116) scale(1.05)"
                  d="M12 20 C6 15 0 11 0 6 C0 2.7 2.7 0 6 0 C8.2 0 10.4 1.4 12 3.7 C13.6 1.4 15.8 0 18 0 C21.3 0 24 2.7 24 6 C24 11 18 15 12 20 Z"
                />
                <path
                  transform="translate(432,150) scale(0.8)"
                  d="M12 20 C6 15 0 11 0 6 C0 2.7 2.7 0 6 0 C8.2 0 10.4 1.4 12 3.7 C13.6 1.4 15.8 0 18 0 C21.3 0 24 2.7 24 6 C24 11 18 15 12 20 Z"
                  fill="#f4b7b0"
                />
                <path
                  transform="translate(250,92) scale(0.62)"
                  d="M12 20 C6 15 0 11 0 6 C0 2.7 2.7 0 6 0 C8.2 0 10.4 1.4 12 3.7 C13.6 1.4 15.8 0 18 0 C21.3 0 24 2.7 24 6 C24 11 18 15 12 20 Z"
                />
              </g>
              <g>
                <path d="M110 356 h44 l-7 44 h-30 z" fill="#d98b6a" />
                <path d="M132 356 q-8 -46 -34 -58" stroke="#5aa877" strokeWidth="6" fill="none" strokeLinecap="round" />
                <path d="M132 356 q10 -42 36 -50" stroke="#5aa877" strokeWidth="6" fill="none" strokeLinecap="round" />
                <ellipse cx="94" cy="292" rx="21" ry="12" fill="#6bbf8f" transform="rotate(-34 94 292)" />
                <ellipse cx="170" cy="300" rx="21" ry="12" fill="#7cc99d" transform="rotate(32 170 300)" />
              </g>
              <g>
                <rect x="250" y="300" width="92" height="58" rx="24" fill="#8894a6" />
                <path d="M254 262 q42 -18 84 0 l7 54 q-49 16 -98 0 z" fill="#e6b84f" />
                <path d="M287 258 l9 20 l9 -20 z" fill="#ffffff" />
                <rect x="287" y="240" width="18" height="20" rx="8" fill="#f0c19c" />
                <rect x="246" y="272" width="20" height="62" rx="10" fill="#e6b84f" />
                <circle cx="256" cy="336" r="11" fill="#f4caa3" />
                <circle cx="296" cy="212" r="37" fill="#f4caa3" />
                <circle cx="260" cy="216" r="7" fill="#f0c19c" />
                <circle cx="332" cy="216" r="7" fill="#f0c19c" />
                <path
                  d="M261 206 q-3 -46 35 -48 q40 2 36 48 q-9 -22 -36 -22 q-27 0 -35 22 z"
                  fill="#eceff0"
                />
                <circle cx="283" cy="212" r="12" fill="#ffffff" stroke="#54606b" strokeWidth="3" />
                <circle cx="309" cy="212" r="12" fill="#ffffff" stroke="#54606b" strokeWidth="3" />
                <line x1="295" y1="212" x2="297" y2="212" stroke="#54606b" strokeWidth="3" />
                <path d="M278 212 q5 5 10 0" stroke="#3a3f45" strokeWidth="3" fill="none" strokeLinecap="round" />
                <path d="M304 212 q5 5 10 0" stroke="#3a3f45" strokeWidth="3" fill="none" strokeLinecap="round" />
                <circle cx="273" cy="226" r="6" fill="#f2a7a0" />
                <circle cx="319" cy="226" r="6" fill="#f2a7a0" />
                <path d="M284 233 q12 12 24 0" stroke="#c86f66" strokeWidth="3" fill="none" strokeLinecap="round" />
              </g>
              <g>
                <rect x="366" y="332" width="62" height="30" rx="14" fill="#3f7f8c" />
                <path d="M360 250 q37 -16 72 0 l7 88 q-43 16 -86 0 z" fill="#5cb78d" />
                <rect x="388" y="214" width="16" height="22" rx="7" fill="#f0c19c" />
                <path d="M356 264 q-30 6 -50 4" stroke="#5cb78d" strokeWidth="18" fill="none" strokeLinecap="round" />
                <circle cx="306" cy="266" r="10" fill="#f4caa3" />
                <circle cx="396" cy="184" r="33" fill="#f4caa3" />
                <path
                  d="M363 184 q0 -44 33 -44 q33 0 33 44 q-10 -19 -33 -19 q-23 0 -33 19 z"
                  fill="#5f4636"
                />
                <path d="M366 178 q-8 20 -4 40 l10 -4 q-4 -18 2 -34 z" fill="#5f4636" />
                <path d="M426 178 q8 20 4 40 l-10 -4 q4 -18 -2 -34 z" fill="#5f4636" />
                <circle cx="383" cy="188" r="3.4" fill="#3a3f45" />
                <circle cx="409" cy="188" r="3.4" fill="#3a3f45" />
                <circle cx="377" cy="197" r="5" fill="#f2a7a0" />
                <circle cx="415" cy="197" r="5" fill="#f2a7a0" />
                <path d="M388 201 q8 8 16 0" stroke="#c86f66" strokeWidth="3" fill="none" strokeLinecap="round" />
              </g>
            </svg>
          </div>
        </div>
      </section>
    </>
  );
}
