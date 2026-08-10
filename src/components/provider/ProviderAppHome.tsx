import { useState } from "react";
import { NotificationBell } from "../applicant/NotificationBell";

type ProviderAppHomeProps = {
  onSwitchToGuardian: () => void;
};

export function ProviderAppHome({ onSwitchToGuardian }: ProviderAppHomeProps) {
  const asset = (name: string) => `/figma-assets/${name}`;
  const [isRoleMenuOpen, setIsRoleMenuOpen] = useState(false);

  return (
    <section className="provider-app-home" aria-label="가치제공자 홈">
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
              가치제공자
              <span aria-hidden="true" />
            </button>
            {isRoleMenuOpen && (
              <div className="role-select-menu" role="menu" aria-label="역할 선택">
                <button type="button" role="menuitem" onClick={onSwitchToGuardian}>
                  보호자
                </button>
                <button className="is-active" type="button" role="menuitem" onClick={() => setIsRoleMenuOpen(false)}>
                  가치제공자
                </button>
              </div>
            )}
          </div>
        </div>
        <NotificationBell className="icon-button" />
      </header>

      <main className="provider-app-content">
        <section className="provider-app-welcome">
          <h1>안녕하세요, 민수님!</h1>
          <p>오늘도 따뜻한 가치를 전달해 주세요.</p>
        </section>

        <section aria-labelledby="provider-app-schedule-title">
          <div className="provider-app-title-row">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M7 3v3M17 3v3M4 9h16M6 5h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z" />
            </svg>
            <h2 id="provider-app-schedule-title">오늘의 일정</h2>
          </div>
          <article className="provider-app-card provider-app-schedule-card">
            <div className="provider-app-media-row">
              <span className="provider-app-round-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M6 7h13l-1.4 8.2a2 2 0 0 1-2 1.7H8.4a2 2 0 0 1-2-1.7L5.2 3.8H3" />
                  <path d="M9 21h.01M17 21h.01M9 11h8" />
                </svg>
              </span>
              <div>
                <h3>장보기 대행</h3>
                <p>박순옥 어르신 · 14:00 - 15:30</p>
              </div>
            </div>
            <div className="provider-app-two-buttons">
              <button type="button" className="provider-app-soft-button">
                채팅
              </button>
              <button type="button" className="provider-app-soft-button">
                상세보기
              </button>
            </div>
            <button type="button" className="provider-app-primary-button">
              도착 알림
            </button>
          </article>
        </section>

        <aside className="provider-app-deadline-card">
          <span className="provider-app-alert-bubble" aria-hidden="true">
            !
          </span>
          <p>
            <strong>서비스 계획서 작성 마감 알림</strong>
            <br />
            다음 도움을 위해 계획서가 필요합니다.
          </p>
          <button type="button">작성하기</button>
        </aside>

        <section aria-labelledby="provider-app-request-title">
          <div className="provider-app-title-row provider-app-title-row-between">
            <div>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9Z" />
                <path d="M10 21h4" />
              </svg>
              <h2 id="provider-app-request-title">새로운 서비스 요청</h2>
            </div>
            <button type="button" className="provider-app-more-link">
              전체보기
            </button>
          </div>
          <article className="provider-app-card provider-app-request-preview">
            <span className="provider-app-badge">맞춤 제안</span>
            <div className="provider-app-media-row">
              <span className="provider-app-round-icon provider-app-round-icon-square" aria-hidden="true">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M6 7h13l-1.4 8.2a2 2 0 0 1-2 1.7H8.4a2 2 0 0 1-2-1.7L5.2 3.8H3" />
                  <path d="M9 21h.01M17 21h.01M9 11h8" />
                </svg>
              </span>
              <div>
                <h3>장보기 동행</h3>
                <p className="provider-app-location">조천읍 인근</p>
              </div>
            </div>
            <dl className="provider-app-meta-list">
              <div>
                <dt>일시</dt>
                <dd>7월 18일 오후 2시 (2시간)</dd>
              </div>
              <div>
                <dt>서비스 대상</dt>
                <dd>70대 여성 어르신</dd>
              </div>
              <div>
                <dt>활동 보상</dt>
                <dd className="provider-app-money">36,000원</dd>
              </div>
            </dl>
            <div className="provider-app-note-box">
              <strong>보호자 유의사항</strong>
              <p>"청력이 조금 약하셔서 천천히 크게 대화해주시면 감사하겠습니다."</p>
            </div>
            <p className="provider-app-fine">
              * 가치이음은 상호 신뢰를 위해 서비스 대상자의 최소한의 정보만 제공합니다. 상세 주소 및 연락처는 매칭 확정 후
              '내 일정'에서 확인 가능합니다.
            </p>
            <div className="provider-app-split-actions">
              <button type="button" className="provider-app-outline-button">
                거절하기
              </button>
              <button type="button" className="provider-app-primary-button provider-app-no-margin">
                요청 자세히 보기
              </button>
            </div>
          </article>
        </section>
      </main>

      <nav className="provider-app-bottom-nav" aria-label="가치제공자 하단 메뉴">
        <span className="is-active">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M4 10.8 12 4l8 6.8V20a1 1 0 0 1-1 1h-4.5v-6h-5v6H5a1 1 0 0 1-1-1v-9.2Z" />
          </svg>
          홈
        </span>
        <span>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M5 5h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-7l-5 4v-4H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z" />
          </svg>
          요청
        </span>
        <span>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M7 3v3M17 3v3M4 9h16M6 5h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z" />
            <path d="M8 13h.01M12 13h.01M16 13h.01M8 17h.01M12 17h.01" />
          </svg>
          일정
        </span>
        <span>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM4 21a8 8 0 0 1 16 0" />
          </svg>
          내 정보
        </span>
      </nav>
    </section>
  );
}
