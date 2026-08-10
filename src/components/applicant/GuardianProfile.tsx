import { useState } from "react";
import type { GuardianParentInfo, GuardianProfileInfo } from "./ApplicantCareFlow";
import { NotificationBell } from "./NotificationBell";

type GuardianProfileProps = {
  profileInfo: GuardianProfileInfo;
  onProfileInfoChange: (profileInfo: GuardianProfileInfo) => void;
  parentInfo: GuardianParentInfo;
  onParentInfoChange: (parentInfo: GuardianParentInfo) => void;
  onGoHome: () => void;
  onOpenSearch: () => void;
  onOpenMatch: () => void;
  onOpenChat: () => void;
  onOpenProgress: () => void;
};

type ProfilePanel =
  | "profile"
  | "parent"
  | "payment"
  | "notification"
  | "font"
  | "faq"
  | "contact"
  | "terms"
  | "";
type ProfileFontSize = "standard" | "large" | "xlarge";

type ProfileMenuItem = {
  label: string;
  icon: string;
  action?: ProfilePanel;
  helper?: string;
};

const SUPPORT_EMAIL = "help@gachi-ieum.kr";

export function GuardianProfile({
  profileInfo,
  onProfileInfoChange,
  parentInfo,
  onParentInfoChange,
  onGoHome,
  onOpenSearch,
  onOpenMatch,
  onOpenChat,
  onOpenProgress
}: GuardianProfileProps) {
  const asset = (name: string) => `/figma-assets/${name}`;
  const [activePanel, setActivePanel] = useState<ProfilePanel>("");
  const [saveMessage, setSaveMessage] = useState("");
  const [paymentInfo, setPaymentInfo] = useState({
    method: "결제 링크 안내",
    phone: profileInfo.phone,
    receiptEmail: "guardian@gachi-ieum.kr"
  });
  const [notificationSettings, setNotificationSettings] = useState({
    request: true,
    schedule: true,
    chat: true,
    marketing: false
  });
  const [fontSize, setFontSize] = useState<ProfileFontSize>("standard");
  const [contactForm, setContactForm] = useState({
    category: "이용 문의",
    phone: profileInfo.phone,
    email: "guardian@gachi-ieum.kr",
    message: ""
  });

  const updateParentInfo = (field: keyof GuardianParentInfo, value: string) => {
    onParentInfoChange({ ...parentInfo, [field]: value });
  };

  const updateProfileInfo = (field: keyof GuardianProfileInfo, value: string) => {
    onProfileInfoChange({ ...profileInfo, [field]: value });
  };

  const enabledNotificationCount = Object.values(notificationSettings).filter(Boolean).length;
  const fontSizeLabel: Record<ProfileFontSize, string> = {
    standard: "기본",
    large: "크게",
    xlarge: "아주 크게"
  };

  const menuGroups: { title: string; items: ProfileMenuItem[] }[] = [
    {
      title: "내 정보 관리",
      items: [
        { label: "프로필 수정", icon: "profile-icon-edit.svg", action: "profile", helper: profileInfo.phone },
        {
          label: "부모님 정보 등록/관리",
          icon: "profile-icon-parent.svg",
          action: "parent",
          helper: `${parentInfo.name} · ${parentInfo.age}세 · ${parentInfo.address}`
        },
        {
          label: "결제 수단 관리",
          icon: "profile-icon-payment.svg",
          action: "payment",
          helper: paymentInfo.method
        }
      ]
    },
    {
      title: "서비스 설정",
      items: [
        {
          label: "알림 설정",
          icon: "profile-icon-notification.svg",
          action: "notification",
          helper: enabledNotificationCount ? `${enabledNotificationCount}개 알림 켜짐` : "모든 알림 꺼짐"
        },
        {
          label: "글자 크기 설정",
          icon: "profile-icon-font.svg",
          action: "font",
          helper: fontSizeLabel[fontSize]
        }
      ]
    },
    {
      title: "고객 지원",
      items: [
        { label: "자주 묻는 질문", icon: "profile-icon-faq.svg", action: "faq", helper: "이용 전 궁금한 점" },
        { label: "가치이음 문의하기", icon: "profile-icon-contact.svg", action: "contact", helper: "평일 09:00-18:00" },
        { label: "약관 및 정책", icon: "profile-icon-terms.svg", action: "terms", helper: "개인정보·서비스 약관" }
      ]
    }
  ];

  const closePanel = () => {
    setActivePanel("");
    setSaveMessage("");
  };

  const savePanel = () => {
    if (activePanel === "contact") {
      const subject = `[가치이음 문의] ${contactForm.category}`;
      const body = [
        `문의 유형: ${contactForm.category}`,
        `연락받을 번호: ${contactForm.phone}`,
        `답변 받을 이메일: ${contactForm.email}`,
        "",
        "문의 내용",
        contactForm.message.trim() || "문의 내용을 입력하지 않았어요."
      ].join("\n");

      window.location.href = `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      setSaveMessage("이메일 앱으로 문의 내용을 열었어요.");
      window.setTimeout(closePanel, 1200);
      return;
    }

    setSaveMessage("확인되었습니다");
    window.setTimeout(closePanel, 700);
  };

  const panelTitle =
    activePanel === "profile"
      ? "프로필 수정"
      : activePanel === "parent"
        ? "부모님 정보 등록/관리"
        : activePanel === "payment"
          ? "결제 수단 관리"
          : activePanel === "notification"
            ? "알림 설정"
            : activePanel === "font"
              ? "글자 크기 설정"
              : activePanel === "faq"
                ? "자주 묻는 질문"
                : activePanel === "contact"
                  ? "가치이음 문의하기"
                  : "약관 및 정책";
  const sheetActionLabel =
    activePanel === "contact"
      ? "문의 접수하기"
      : activePanel === "faq" || activePanel === "terms"
        ? "확인했어요"
        : "저장하기";

  return (
    <section className={`guardian-profile profile-font-${fontSize}`} aria-labelledby="guardian-profile-title">
      <header className="profile-app-header">
        <h1 id="guardian-profile-title">내 정보 및 설정</h1>
        <NotificationBell iconName="profile-icon-bell.svg" onOpenChat={onOpenChat} onOpenMatch={onOpenMatch} onOpenProgress={onOpenProgress} />
      </header>

      <section className="profile-guardian-card" aria-label="보호자 계정">
        <div className="profile-avatar-wrap">
          <img src={profileInfo.photoUrl || asset("profile-user.png")} alt="" />
          <span aria-hidden="true">
            <img src={asset("profile-icon-verified.svg")} alt="" />
          </span>
        </div>
        <div>
          <div className="profile-name-row">
            <strong>{profileInfo.name}</strong>
            <span>{profileInfo.relation}</span>
          </div>
          <p>{parentInfo.name}님을 위한 도움 요청을 관리하고 있습니다.</p>
          <small>
            <img src={asset("profile-icon-consent.svg")} alt="" aria-hidden="true" />
            서비스 이용 동의 완료
          </small>
        </div>
      </section>

      {menuGroups.map((group) => (
        <section className="profile-menu-section" aria-labelledby={`profile-${group.title}`} key={group.title}>
          <h2 id={`profile-${group.title}`}>{group.title}</h2>
          <div className="profile-menu-card">
            {group.items.map((item) => (
              <button
                type="button"
                key={item.label}
                onClick={() => {
                  if (item.action) {
                    setActivePanel(item.action);
                    setSaveMessage("");
                  }
                }}
              >
                <span>
                  <img src={asset(item.icon)} alt="" aria-hidden="true" />
                </span>
                <strong>
                  {item.label}
                  {item.helper && <small>{item.helper}</small>}
                </strong>
                <b aria-hidden="true">
                  <img src={asset("profile-icon-chevron.svg")} alt="" />
                </b>
              </button>
            ))}
          </div>
        </section>
      ))}

      <button className="profile-logout-button" type="button">
        <img src={asset("profile-icon-logout.svg")} alt="" aria-hidden="true" />
        로그아웃
      </button>
      <p className="profile-version">버전 1.2.4 (최신 버전)</p>

      {activePanel && (
        <div className="profile-sheet-backdrop" role="presentation" onClick={closePanel}>
          <section
            className="profile-setting-sheet"
            aria-labelledby="profile-setting-title"
            role="dialog"
            aria-modal="true"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="profile-setting-head">
              <h2 id="profile-setting-title">{panelTitle}</h2>
              <button type="button" onClick={closePanel} aria-label="닫기">×</button>
            </div>

            {activePanel === "profile" && (
              <div className="profile-setting-form">
                <label>
                  이름
                  <input
                    value={profileInfo.name}
                    onChange={(event) => updateProfileInfo("name", event.target.value)}
                  />
                </label>
                <label>
                  연락처
                  <input
                    value={profileInfo.phone}
                    onChange={(event) => updateProfileInfo("phone", event.target.value)}
                  />
                </label>
                <label>
                  관계
                  <div className="profile-relation-options" role="radiogroup" aria-label="프로필 관계">
                    {["자녀", "며느리/사위", "친척", "기타"].map((relation) => (
                      <button
                        className={profileInfo.relation === relation ? "is-selected" : ""}
                        type="button"
                        role="radio"
                        aria-checked={profileInfo.relation === relation}
                        key={relation}
                        onClick={() => updateProfileInfo("relation", relation)}
                      >
                        {relation}
                      </button>
                    ))}
                  </div>
                </label>
                <label>
                  거주 지역
                  <input
                    value={profileInfo.address}
                    onChange={(event) => updateProfileInfo("address", event.target.value)}
                  />
                </label>
                <label>
                  상세 주소
                  <input
                    value={profileInfo.detailAddress}
                    onChange={(event) => updateProfileInfo("detailAddress", event.target.value)}
                  />
                </label>
              </div>
            )}

            {activePanel === "parent" && (
              <div className="profile-setting-form">
                <label>
                  부모님 성함
                  <input
                    value={parentInfo.name}
                    onChange={(event) => updateParentInfo("name", event.target.value)}
                  />
                </label>
                <label>
                  나이
                  <input
                    inputMode="numeric"
                    maxLength={3}
                    value={parentInfo.age}
                    onChange={(event) => updateParentInfo("age", event.target.value.replace(/[^0-9]/g, ""))}
                  />
                </label>
                <label>
                  관계
                  <div className="profile-relation-options" role="radiogroup" aria-label="부모님과의 관계">
                    {["어머니", "아버지", "배우자", "기타"].map((relation) => (
                      <button
                        className={parentInfo.relation === relation ? "is-selected" : ""}
                        type="button"
                        role="radio"
                        aria-checked={parentInfo.relation === relation}
                        key={relation}
                        onClick={() => updateParentInfo("relation", relation)}
                      >
                        {relation}
                      </button>
                    ))}
                  </div>
                </label>
                <label>
                  거주 지역
                  <input
                    value={parentInfo.address}
                    onChange={(event) => updateParentInfo("address", event.target.value)}
                  />
                </label>
                <label>
                  상세 주소
                  <input
                    value={parentInfo.detailAddress}
                    onChange={(event) => updateParentInfo("detailAddress", event.target.value)}
                  />
                </label>
                <label>
                  도움 참고사항
                  <textarea
                    value={parentInfo.note}
                    onChange={(event) => updateParentInfo("note", event.target.value)}
                  />
                </label>
              </div>
            )}

            {activePanel === "payment" && (
              <div className="profile-setting-form">
                <div className="profile-payment-guide">
                  <strong>카드정보는 저장하지 않아요</strong>
                  <p>
                    MVP에서는 도움 완료 후 결제 링크를 문자 또는 카카오톡으로 보내드려요.
                    실제 카드번호는 PG 결제창에서만 입력합니다.
                  </p>
                </div>
                <label>
                  결제 안내 방식
                  <select
                    value={paymentInfo.method}
                    onChange={(event) => setPaymentInfo({ ...paymentInfo, method: event.target.value })}
                  >
                    <option>결제 링크 안내</option>
                    <option>카카오톡 안내</option>
                    <option>문자 안내</option>
                    <option>계좌이체 안내</option>
                  </select>
                </label>
                <label>
                  결제 안내 받을 번호
                  <input
                    value={paymentInfo.phone}
                    onChange={(event) => setPaymentInfo({ ...paymentInfo, phone: event.target.value })}
                  />
                </label>
                <label>
                  영수증 이메일
                  <input
                    value={paymentInfo.receiptEmail}
                    onChange={(event) => setPaymentInfo({ ...paymentInfo, receiptEmail: event.target.value })}
                  />
                </label>
              </div>
            )}

            {activePanel === "notification" && (
              <div className="profile-setting-options">
                <label className="profile-toggle-row">
                  <span>
                    요청 진행 알림
                    <small>요청 수락, 거절, 재요청 상태를 알려드려요.</small>
                  </span>
                  <input
                    type="checkbox"
                    checked={notificationSettings.request}
                    onChange={(event) =>
                      setNotificationSettings({ ...notificationSettings, request: event.target.checked })
                    }
                  />
                </label>
                <label className="profile-toggle-row">
                  <span>
                    일정 알림
                    <small>방문 전 확인과 일정 변경을 알려드려요.</small>
                  </span>
                  <input
                    type="checkbox"
                    checked={notificationSettings.schedule}
                    onChange={(event) =>
                      setNotificationSettings({ ...notificationSettings, schedule: event.target.checked })
                    }
                  />
                </label>
                <label className="profile-toggle-row">
                  <span>
                    채팅 알림
                    <small>가치이웃이 보낸 새 메시지를 알려드려요.</small>
                  </span>
                  <input
                    type="checkbox"
                    checked={notificationSettings.chat}
                    onChange={(event) =>
                      setNotificationSettings({ ...notificationSettings, chat: event.target.checked })
                    }
                  />
                </label>
                <label className="profile-toggle-row">
                  <span>
                    소식 알림
                    <small>이벤트와 서비스 안내를 받을 수 있어요.</small>
                  </span>
                  <input
                    type="checkbox"
                    checked={notificationSettings.marketing}
                    onChange={(event) =>
                      setNotificationSettings({ ...notificationSettings, marketing: event.target.checked })
                    }
                  />
                </label>
              </div>
            )}

            {activePanel === "font" && (
              <div className="profile-setting-options">
                <div className="profile-font-picker" role="radiogroup" aria-label="글자 크기">
                  {(["standard", "large", "xlarge"] as ProfileFontSize[]).map((size) => (
                    <button
                      className={fontSize === size ? "is-selected" : ""}
                      key={size}
                      type="button"
                      role="radio"
                      aria-checked={fontSize === size}
                      onClick={() => setFontSize(size)}
                    >
                      {fontSizeLabel[size]}
                    </button>
                  ))}
                </div>
                <div className="profile-font-preview">
                  <strong>글자 크기 미리보기</strong>
                  <p>부모님을 위한 도움 요청과 일정 정보를 더 편하게 확인할 수 있어요.</p>
                </div>
              </div>
            )}

            {activePanel === "faq" && (
              <div className="profile-faq-list">
                <details open>
                  <summary>도움 요청 후 일정은 어떻게 확정되나요?</summary>
                  <p>가치이웃이 요청을 확인하면 매칭현황에서 수락 여부와 방문 일정을 확인할 수 있어요.</p>
                </details>
                <details>
                  <summary>요청을 취소하면 비용이 발생하나요?</summary>
                  <p>방문 전 취소는 기본적으로 비용이 발생하지 않으며, 확정된 일정의 취소 기준은 약관에서 확인할 수 있어요.</p>
                </details>
                <details>
                  <summary>가치이웃은 어떤 인증을 거치나요?</summary>
                  <p>본인인증, 신원인증, 법적경력 확인, 응급처치 교육 등 신뢰 정보를 프로필에서 확인할 수 있습니다.</p>
                </details>
                <details>
                  <summary>부모님 대신 보호자가 요청해도 되나요?</summary>
                  <p>네. 보호자가 요청서를 작성하고 매칭현황에서 진행 상황을 확인할 수 있습니다.</p>
                </details>
              </div>
            )}

            {activePanel === "contact" && (
              <div className="profile-setting-form profile-contact-form">
                <label>
                  문의 유형
                  <select
                    value={contactForm.category}
                    onChange={(event) => setContactForm({ ...contactForm, category: event.target.value })}
                  >
                    <option>이용 문의</option>
                    <option>매칭 문의</option>
                    <option>결제 문의</option>
                    <option>불편 신고</option>
                  </select>
                </label>
                <label>
                  연락받을 번호
                  <input
                    value={contactForm.phone}
                    onChange={(event) => setContactForm({ ...contactForm, phone: event.target.value })}
                  />
                </label>
                <label>
                  답변 받을 이메일
                  <input
                    type="email"
                    value={contactForm.email}
                    onChange={(event) => setContactForm({ ...contactForm, email: event.target.value })}
                  />
                </label>
                <label>
                  문의 내용
                  <textarea
                    placeholder="궁금한 점이나 도움이 필요한 내용을 적어주세요."
                    value={contactForm.message}
                    onChange={(event) => setContactForm({ ...contactForm, message: event.target.value })}
                  />
                </label>
                <p className="profile-contact-note">문의 내용은 이메일로 전달돼요. 접수 후 평일 기준 1일 이내에 연락드릴게요.</p>
              </div>
            )}

            {activePanel === "terms" && (
              <div className="profile-terms-list">
                <details open>
                  <summary>서비스 이용약관</summary>
                  <p>가치이음 서비스 이용, 매칭 요청, 예약 변경, 취소 기준에 대한 기본 약관입니다.</p>
                </details>
                <details>
                  <summary>개인정보 처리방침</summary>
                  <p>보호자와 가치이웃의 개인정보 수집, 이용, 보관, 삭제 기준을 안내합니다.</p>
                </details>
                <details>
                  <summary>안심 보호 정책</summary>
                  <p>방문 동행, 일정 공유, 신고 접수, 신뢰 인증 정보 운영 기준을 확인할 수 있습니다.</p>
                </details>
              </div>
            )}

            {saveMessage && <p className="profile-save-message">{saveMessage}</p>}
            <button className="profile-sheet-save" type="button" onClick={savePanel}>{sheetActionLabel}</button>
          </section>
        </div>
      )}

      <nav className="search-bottom-nav profile-bottom-nav" aria-label="하단 메뉴">
        <button type="button" onClick={onGoHome}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M4 10.8 12 4l8 6.8V20a1 1 0 0 1-1 1h-4.5v-6h-5v6H5a1 1 0 0 1-1-1v-9.2Z" />
          </svg>
          홈
        </button>
        <button type="button" onClick={onOpenSearch}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="11" cy="11" r="7" />
            <path d="M21 21l-4.3-4.3" />
          </svg>
          검색
        </button>
        <button type="button" onClick={onOpenMatch}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
          매칭현황
        </button>
        <button className="is-active" type="button">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM4 21a8 8 0 0 1 16 0" />
          </svg>
          내 정보
        </button>
      </nav>
    </section>
  );
}
