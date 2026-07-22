import { SERVICE_NAME } from "../../constants";

type ApplicantMainHeroProps = {
  onStartRequest: () => void;
  onOpenSearch: () => void;
  onOpenMatch: () => void;
  onOpenChat: () => void;
  onOpenProfile: () => void;
};

export function ApplicantMainHero({
  onStartRequest,
  onOpenSearch,
  onOpenMatch,
  onOpenChat,
  onOpenProfile
}: ApplicantMainHeroProps) {
  const asset = (name: string) => `/figma-assets/${name}`;

  return (
    <section className="guardian-home" aria-labelledby="guardian-home-title">
      <header className="guardian-header">
        <div className="guardian-brand-row">
          <h1 id="guardian-home-title">{SERVICE_NAME}</h1>
          <button className="relation-chip" type="button" aria-label="대상 가족 선택">
            어머니 <img src={asset("icon-chevron.svg")} alt="" aria-hidden="true" />
          </button>
        </div>
        <div className="guardian-header-actions" aria-label="알림과 내 정보">
          <button className="icon-button" type="button" aria-label="알림">
            <img src={asset("icon-bell.svg")} alt="" aria-hidden="true" />
          </button>
          <div className="user-avatar" aria-label="사용자 프로필">
            <img src={asset("profile-user.png")} alt="" />
          </div>
        </div>
      </header>

      <div className="guardian-content">
        <section className="consent-card" aria-label="부모님 동의 상태">
          <div className="consent-title">
            <img className="line-icon" src={asset("icon-shield.svg")} alt="" aria-hidden="true" />
            <strong>부모님 동의 상태</strong>
          </div>
          <span className="consent-pill">서비스 이용 동의 완료</span>
        </section>

        <section className="status-card" aria-labelledby="next-care-title">
          <img className="status-pattern" src={asset("card-pattern.svg")} alt="" aria-hidden="true" />
          <div className="status-meta">
            <span>D-1 내일 예정</span>
            <small>요청 수락 완료</small>
          </div>
          <h2 id="next-care-title">
            내일 오후 2시
            <br />
            <strong>장보기 동행</strong>이 예정되어 있어요
          </h2>

          <div className="matched-provider-inline">
            <div className="provider-face provider-face-small">
              <img src={asset("provider-kim.png")} alt="" />
            </div>
            <div>
              <span>가치이웃</span>
              <strong>김민석</strong>
            </div>
            <button className="chat-circle" type="button" onClick={onOpenChat} aria-label="채팅 열기">
              <img src={asset("icon-chat.svg")} alt="" aria-hidden="true" />
            </button>
          </div>

          <div className="status-actions">
            <button className="status-primary" type="button" onClick={onOpenMatch}>
              일정 확인하기
            </button>
            <button className="status-secondary" type="button" onClick={onOpenChat}>
              채팅하기
            </button>
          </div>
        </section>

        <section className="provider-section" aria-labelledby="matched-provider-title">
          <div className="section-title-row">
            <h2 id="matched-provider-title">매칭된 가치이웃</h2>
            <button type="button" onClick={onOpenMatch}>상세 정보</button>
          </div>

          <article className="provider-summary-card">
            <div className="provider-photo">
              <img src={asset("provider-kim.png")} alt="" />
            </div>
            <div className="provider-summary-main">
              <div className="provider-name-row">
                <div>
                  <strong>김민석</strong>
                  <span className="location-line">
                    <img src={asset("icon-location.svg")} alt="" aria-hidden="true" />
                    제주시 조천읍
                  </span>
                </div>
                <div className="provider-badges">
                  <span className="blue-badge">
                    <img src={asset("icon-verified.svg")} alt="" aria-hidden="true" />
                    본인확인 완료
                  </span>
                  <span>운영검토 완료</span>
                </div>
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
            </div>
          </article>
        </section>

        <section className="quick-action-grid" aria-label="빠른 실행">
          <button className="quick-action-card is-dashed" type="button" onClick={onStartRequest}>
            <span className="action-icon" aria-hidden="true">
              <img src={asset("icon-plus.svg")} alt="" />
            </span>
            <strong>새로운 도움 요청</strong>
          </button>
          <button className="quick-action-card" type="button" onClick={onOpenMatch}>
            <span className="action-icon" aria-hidden="true">
              <img src={asset("icon-history.svg")} alt="" />
            </span>
            <strong>최근 이용 기록</strong>
          </button>
        </section>

        <section className="recent-section" aria-labelledby="recent-provider-title">
          <h2 id="recent-provider-title">최근 만난 가치이웃</h2>
          <article className="recent-provider-card">
            <div className="recent-provider-info">
              <div className="provider-face">
                <img src={asset("provider-kim.png")} alt="" />
              </div>
              <div>
                <strong>김민석</strong>
                <span>지난 주 화요일 이용</span>
              </div>
            </div>
            <button type="button" onClick={onStartRequest}>다시 요청하기</button>
          </article>
        </section>
      </div>

      <button className="floating-chat" type="button" onClick={onOpenChat} aria-label="채팅하기">
        <img src={asset("icon-fab-chat.svg")} alt="" aria-hidden="true" />
      </button>

      <nav className="bottom-nav" aria-label="하단 메뉴">
        <a className="is-active" href="#top">
          <span aria-hidden="true"><img src={asset("icon-home.svg")} alt="" /></span>
          홈
        </a>
        <button type="button" onClick={onOpenSearch}>
          <span aria-hidden="true"><img src={asset("icon-search.svg")} alt="" /></span>
          검색
        </button>
        <button type="button" onClick={onOpenMatch}>
          <span aria-hidden="true"><img src={asset("icon-match.svg")} alt="" /></span>
          매칭현황
        </button>
        <button type="button" onClick={onOpenProfile}>
          <span aria-hidden="true"><img src={asset("icon-user.svg")} alt="" /></span>
          내 정보
        </button>
      </nav>
    </section>
  );
}
