import { useState } from "react";
import { NotificationBell } from "./NotificationBell";

type ApplicantMainHeroProps = {
  onStartRequest: () => void;
  onSwitchToProvider: () => void;
  onOpenSearch: () => void;
  onOpenMatch: () => void;
  onOpenMatchedDetail: () => void;
  onOpenChat: () => void;
  onOpenProgress: () => void;
  onOpenProfile: () => void;
};

export function ApplicantMainHero({
  onStartRequest,
  onSwitchToProvider,
  onOpenSearch,
  onOpenMatch,
  onOpenMatchedDetail,
  onOpenChat,
  onOpenProgress,
  onOpenProfile
}: ApplicantMainHeroProps) {
  const asset = (name: string) => `/figma-assets/${name}`;
  const [isRoleMenuOpen, setIsRoleMenuOpen] = useState(false);

  return (
    <section className="guardian-home" aria-labelledby="guardian-home-title">
      <header className="guardian-header">
        <div className="guardian-brand-row">
          <img className="guardian-logo-mark" src={asset("gachi-logo-icon.png")} alt="가치이음" />
          <div className="role-select-wrap">
            <button
              className="role-select-button"
              type="button"
              aria-haspopup="menu"
              aria-expanded={isRoleMenuOpen}
              onClick={() => setIsRoleMenuOpen((current) => !current)}
            >
              보호자
              <span aria-hidden="true" />
            </button>
            {isRoleMenuOpen && (
              <div className="role-select-menu" role="menu" aria-label="역할 선택">
                <button className="is-active" type="button" role="menuitem" onClick={() => setIsRoleMenuOpen(false)}>
                  보호자
                </button>
                <button type="button" role="menuitem" onClick={onSwitchToProvider}>
                  가치제공자
                </button>
              </div>
            )}
          </div>
        </div>
        <NotificationBell className="icon-button" onOpenChat={onOpenChat} onOpenMatch={onOpenMatch} onOpenProgress={onOpenProgress} />
      </header>

      <main className="guardian-content">
        <section className="status-card" aria-labelledby="next-care-title">
          <div className="status-meta">
            <span>D-1 내일 예정</span>
            <small>요청 수락 완료</small>
          </div>
          <h2 id="next-care-title">
            내일 오후 2시
            <br />
            <strong>장보기 동행</strong>이 예정되어 있어요
          </h2>

          <article className="home-status-provider-card" aria-label="매칭된 가치이웃 김민석">
            <div className="provider-mini-profile">
              <div className="provider-face provider-face-small">
                <img src={asset("provider-minseok.jpg")} alt="" />
              </div>
              <div>
                <strong>김민석</strong>
                <span className="location-line">
                  <img src={asset("icon-location-figma.png")} alt="" aria-hidden="true" />
                  제주시 조천읍
                </span>
              </div>
            </div>
            <div className="provider-certifications" aria-label="인증 상태">
              <span className="blue-badge">본인확인 완료</span>
              <span>운영검토 완료</span>
            </div>
            <div className="provider-stats">
              <div>
                <span>완료 횟수</span>
                <strong>12회</strong>
              </div>
              <div>
                <span>후기</span>
                <strong>8개</strong>
              </div>
            </div>
          </article>

          <div className="status-actions">
            <button className="status-primary" type="button" onClick={onOpenMatchedDetail}>
              상세정보 보기
            </button>
            <button className="status-secondary" type="button" onClick={onOpenChat}>
              채팅하기
            </button>
          </div>
        </section>

        <section className="home-request-card" aria-labelledby="new-request-title">
          <img src={asset("home-request-illustration.png")} alt="" aria-hidden="true" />
          <h2 id="new-request-title">새로운 도움 요청하기</h2>
          <p>
            가치이웃에게 도움을 요청해보세요.
            <br />
            장보기, 말동무 등 다양한 도움을
            <br />
            간편하게 요청할 수 있어요!
          </p>
          <button type="button" onClick={onStartRequest}>도움 요청 하기</button>
        </section>

        <section className="recent-section" aria-labelledby="recent-provider-title">
          <h2 id="recent-provider-title">최근 만난 가치 이웃</h2>
          <article className="recent-provider-card">
            <div className="recent-provider-info">
              <div className="provider-face">
                <img src={asset("provider-minseok.jpg")} alt="" />
              </div>
              <div>
                <strong>김민석</strong>
                <span>지난 주 화요일 이용</span>
              </div>
            </div>
            <button type="button" onClick={onStartRequest}>다시 요청</button>
          </article>
        </section>
      </main>

      <button className="floating-chat" type="button" onClick={onOpenChat} aria-label="채팅하기">
        <img src={asset("icon-fab-chat.svg")} alt="" aria-hidden="true" />
      </button>

      <nav className="bottom-nav" aria-label="하단 메뉴">
        <a className="is-active" href="#top">
          <span aria-hidden="true">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4 10.8 12 4l8 6.8V20a1 1 0 0 1-1 1h-4.5v-6h-5v6H5a1 1 0 0 1-1-1v-9.2Z" />
            </svg>
          </span>
          홈
        </a>
        <button type="button" onClick={onOpenSearch}>
          <span aria-hidden="true">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="11" cy="11" r="7" />
              <path d="M21 21l-4.3-4.3" />
            </svg>
          </span>
          검색
        </button>
        <button type="button" onClick={onOpenMatch}>
          <span aria-hidden="true">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </span>
          매칭현황
        </button>
        <button type="button" onClick={onOpenProfile}>
          <span aria-hidden="true">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM4 21a8 8 0 0 1 16 0" />
            </svg>
          </span>
          내 정보
        </button>
      </nav>
    </section>
  );
}
