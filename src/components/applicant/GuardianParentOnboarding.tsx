import { useState } from "react";
import type { GuardianParentInfo } from "./ApplicantCareFlow";

type GuardianParentOnboardingProps = {
  parentInfo: GuardianParentInfo;
  onParentInfoChange: (parentInfo: GuardianParentInfo) => void;
  onBack: () => void;
  onComplete: () => void;
};

const healthTags = ["귀가 어두우세요", "눈이 침침하세요", "약 복용 확인이 필요해요", "낯선 길을 어려워하세요"];
const helpOptions = [
  { label: "병원 동행", icon: "parent-help-hospital.svg" },
  { label: "장보기 동행", icon: "parent-help-grocery.svg" },
  { label: "산책 동행", icon: "parent-help-walk.svg" },
  { label: "스마트폰 도움", icon: "parent-help-phone.svg" }
];
const addressOptions = ["제주시 조천읍", "제주시 노형동", "제주시 인화동", "서귀포시 대정읍"];

export function GuardianParentOnboarding({
  parentInfo,
  onParentInfoChange,
  onBack,
  onComplete
}: GuardianParentOnboardingProps) {
  const asset = (name: string) => `/figma-assets/${name}`;
  const [isAddressSearchOpen, setIsAddressSearchOpen] = useState(false);
  const [selectedHealthTags, setSelectedHealthTags] = useState<string[]>([]);
  const [selectedHelpOptions, setSelectedHelpOptions] = useState<string[]>(["병원 동행"]);
  const [locationStatus, setLocationStatus] = useState("");

  const updateParentInfo = (field: keyof GuardianParentInfo, value: string) => {
    onParentInfoChange({ ...parentInfo, [field]: value });
  };

  const updateParentPhoto = (file: File | undefined) => {
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        updateParentInfo("photoUrl", reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const findCurrentLocation = () => {
    if (!navigator.geolocation) {
      setLocationStatus("현재 위치를 확인할 수 없어 주소 후보를 열었어요.");
      setIsAddressSearchOpen(true);
      return;
    }

    setLocationStatus("현재 위치를 확인하고 있어요.");
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude.toFixed(5);
        const longitude = position.coords.longitude.toFixed(5);
        updateParentInfo("address", `현재 위치 확인됨 (${latitude}, ${longitude})`);
        setLocationStatus("현재 위치를 확인했어요. 상세 주소를 한 번 더 확인해주세요.");
        setIsAddressSearchOpen(false);
      },
      () => {
        setLocationStatus("위치 권한을 확인하지 못했어요. 아래 주소 후보에서 선택해주세요.");
        setIsAddressSearchOpen(true);
      },
      { enableHighAccuracy: true, timeout: 8000 }
    );
  };

  const toggleHealthTag = (tag: string) => {
    setSelectedHealthTags((current) =>
      current.includes(tag) ? current.filter((item) => item !== tag) : [...current, tag]
    );
  };

  const toggleHelpOption = (option: string) => {
    setSelectedHelpOptions((current) =>
      current.includes(option) ? current.filter((item) => item !== option) : [...current, option]
    );
  };

  return (
    <section className="guardian-onboarding" aria-labelledby="guardian-onboarding-title">
      <header className="simple-app-header onboarding-app-header">
        <button type="button" onClick={onBack} aria-label="이전 화면으로 돌아가기">
          <svg aria-hidden="true" viewBox="0 0 24 24">
            <path d="M15 18L9 12L15 6" />
          </svg>
        </button>
        <strong>부모님 정보 등록</strong>
      </header>

      <div className="onboarding-step-progress" aria-label="가입 단계 2단계">
        <div className="onboarding-step-labels">
          <span>내 정보</span>
          <span className="is-current">부모님 정보</span>
        </div>
        <div className="onboarding-step-track" aria-hidden="true">
          <span />
        </div>
        <p>2 / 2</p>
      </div>

      <main className="onboarding-main">
        <section className="onboarding-copy">
          <h1 id="guardian-onboarding-title">부모님 정보 등록</h1>
          <p>부모님께 꼭 맞는 가치이웃을 매칭해드리기 위해 필요한 정보예요. 천천히 입력해주세요.</p>
        </section>

        <section className="onboarding-card" aria-labelledby="parent-basic-title">
          <div className="parent-photo-field">
            <label>
              <input
                type="file"
                accept="image/*"
                onChange={(event) => updateParentPhoto(event.target.files?.[0])}
              />
              <span>
                {parentInfo.photoUrl ? (
                  <img src={parentInfo.photoUrl} alt="" />
                ) : (
                  <>
                    <img src={asset("parent-photo-camera.svg")} alt="" aria-hidden="true" />
                    <b>사진 등록</b>
                  </>
                )}
              </span>
            </label>
            <small>부모님 사진</small>
          </div>
          <label>
            성함
            <input
              placeholder="예: 홍길동"
              value={parentInfo.name}
              onChange={(event) => updateParentInfo("name", event.target.value)}
            />
          </label>
          <label>
            연령대
            <input
              inputMode="numeric"
              maxLength={3}
              placeholder="예: 75"
              value={parentInfo.age}
              onChange={(event) => updateParentInfo("age", event.target.value.replace(/[^0-9]/g, ""))}
            />
          </label>
        </section>

        <section className="onboarding-card" aria-labelledby="parent-address-title">
          <h2 id="parent-address-title">어디로 방문할까요? <small>필수</small></h2>
          <div className="onboarding-address-row">
            <input
              value={parentInfo.address}
              onChange={(event) => updateParentInfo("address", event.target.value)}
              placeholder="주소를 입력해주세요"
            />
            <button type="button" onClick={findCurrentLocation}>
              위치 찾기
            </button>
          </div>
          {locationStatus && <p className="location-helper-text">{locationStatus}</p>}
          {isAddressSearchOpen && (
            <div className="onboarding-address-results" aria-label="주소 검색 결과">
              {addressOptions.map((option) => (
                <button
                  className={parentInfo.address === option ? "is-selected" : ""}
                  type="button"
                  key={option}
                  onClick={() => {
                    updateParentInfo("address", option);
                    setIsAddressSearchOpen(false);
                  }}
                >
                  {option}
                </button>
              ))}
            </div>
          )}
          <input
            placeholder="상세 주소를 입력해주세요 (예: 101동 201호)"
            value={parentInfo.detailAddress}
            onChange={(event) => updateParentInfo("detailAddress", event.target.value)}
          />
          <div className="request-map-preview onboarding-map-preview" aria-label={`${parentInfo.address || "주소"} 지도 미리보기`}>
            <img className="request-map-image" src={asset("jeju-map-preview.svg")} alt="" />
            <span className="request-map-marker" aria-hidden="true" />
            <span>{parentInfo.address || "주소"}</span>
          </div>
        </section>

        <section className="onboarding-card" aria-labelledby="parent-health-title">
          <h2 id="parent-health-title">건강 및 생활 특이사항</h2>
          <p>해당하는 항목을 모두 선택해주세요.</p>
          <div className="onboarding-chip-row">
            {healthTags.map((tag) => (
              <button
                className={selectedHealthTags.includes(tag) ? "is-selected" : ""}
                type="button"
                key={tag}
                onClick={() => toggleHealthTag(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
          <label>
            추가로 알려주실 내용이 있나요?
            <textarea
              placeholder="예: 당뇨 약을 시간에 맞춰 드셔야 해요."
              value={parentInfo.note}
              onChange={(event) => updateParentInfo("note", event.target.value)}
            />
          </label>
        </section>

        <section className="onboarding-card" aria-labelledby="parent-help-title">
          <h2 id="parent-help-title">자주 필요한 도움</h2>
          <p>어떤 도움이 가장 필요하신가요? 여러 개를 선택할 수 있어요.</p>
          <div className="onboarding-help-grid">
            {helpOptions.map((option) => (
              <button
                className={selectedHelpOptions.includes(option.label) ? "is-selected" : ""}
                type="button"
                key={option.label}
                onClick={() => toggleHelpOption(option.label)}
              >
                <img src={asset(option.icon)} alt="" aria-hidden="true" />
                {option.label}
              </button>
            ))}
          </div>
        </section>
      </main>

      <footer className="fixed-cta-bar">
        <button type="button" onClick={onComplete}>등록 완료하고 시작하기</button>
      </footer>
    </section>
  );
}
