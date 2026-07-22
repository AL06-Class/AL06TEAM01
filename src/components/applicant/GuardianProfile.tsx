import { SERVICE_NAME } from "../../constants";

type GuardianProfileProps = {
  onGoHome: () => void;
  onOpenSearch: () => void;
  onOpenMatch: () => void;
};

export function GuardianProfile({ onGoHome, onOpenSearch, onOpenMatch }: GuardianProfileProps) {
  const asset = (name: string) => `/figma-assets/${name}`;
  const menuGroups = [
    {
      title: "내 정보 관리",
      items: [
        ["프로필 수정", "icon-user.svg"],
        ["부모님 정보 등록/관리", "icon-match.svg"],
        ["결제 수단 관리", "icon-search.svg"]
      ]
    },
    {
      title: "서비스 설정",
      items: [
        ["알림 설정", "icon-bell.svg"],
        ["글자 크기 설정", "icon-user.svg"]
      ]
    },
    {
      title: "고객 지원",
      items: [
        ["공지사항", "icon-chat.svg"],
        ["자주 묻는 질문", "icon-plus.svg"],
        ["가치이음 문의하기", "icon-fab-chat.svg"],
        ["약관 및 정책", "icon-shield.svg"]
      ]
    }
  ];

  return (
    <section className="guardian-profile" aria-labelledby="guardian-profile-title">
      <header className="profile-app-header">
        <h1 id="guardian-profile-title">{SERVICE_NAME}</h1>
        <button className="search-bell-button" type="button" aria-label="알림">
          <img src={asset("icon-bell.svg")} alt="" aria-hidden="true" />
        </button>
      </header>

      <section className="profile-guardian-card" aria-label="보호자 계정">
        <img src={asset("profile-user.png")} alt="" />
        <div>
          <div className="profile-name-row">
            <strong>어머니</strong>
            <span>보호자</span>
          </div>
          <p>가치이음과 함께 부모님을 돌보고 있습니다.</p>
          <small>서비스 이용 동의 완료</small>
        </div>
      </section>

      {menuGroups.map((group) => (
        <section className="profile-menu-section" aria-labelledby={`profile-${group.title}`} key={group.title}>
          <h2 id={`profile-${group.title}`}>{group.title}</h2>
          <div className="profile-menu-card">
            {group.items.map(([label, icon]) => (
              <button type="button" key={label}>
                <span>
                  <img src={asset(icon)} alt="" aria-hidden="true" />
                </span>
                <strong>{label}</strong>
                <b aria-hidden="true">›</b>
              </button>
            ))}
          </div>
        </section>
      ))}

      <button className="profile-logout-button" type="button">로그아웃</button>
      <p className="profile-version">버전 1.2.4 (최신 버전)</p>

      <nav className="search-bottom-nav profile-bottom-nav" aria-label="하단 메뉴">
        <button type="button" onClick={onGoHome}>
          <img src={asset("icon-home.svg")} alt="" aria-hidden="true" />
          홈
        </button>
        <button type="button" onClick={onOpenSearch}>
          <img src={asset("icon-search.svg")} alt="" aria-hidden="true" />
          검색
        </button>
        <button type="button" onClick={onOpenMatch}>
          <img src={asset("icon-match.svg")} alt="" aria-hidden="true" />
          매칭현황
        </button>
        <button className="is-active" type="button">
          <img src={asset("icon-user.svg")} alt="" aria-hidden="true" />
          내 정보
        </button>
      </nav>
    </section>
  );
}
