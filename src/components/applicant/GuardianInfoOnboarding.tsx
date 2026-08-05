import { useState } from "react";
import type { GuardianProfileInfo } from "./ApplicantCareFlow";

type GuardianInfoOnboardingProps = {
  profileInfo: GuardianProfileInfo;
  onProfileInfoChange: (profileInfo: GuardianProfileInfo) => void;
  onBack: () => void;
  onComplete: () => void;
};

const RELATION_OPTIONS = ["자녀", "며느리/사위", "친척", "기타"];
const ADDRESS_OPTIONS = ["제주시 조천읍", "제주시 노형동", "제주시 인화동", "서귀포시 대정읍"];

export function GuardianInfoOnboarding({
  profileInfo,
  onProfileInfoChange,
  onBack,
  onComplete
}: GuardianInfoOnboardingProps) {
  const [isPhoneSent, setIsPhoneSent] = useState(false);
  const [isAddressSearchOpen, setIsAddressSearchOpen] = useState(false);
  const [locationStatus, setLocationStatus] = useState("");
  const asset = (name: string) => `/figma-assets/${name}`;

  const updateProfileInfo = (field: keyof GuardianProfileInfo, value: string) => {
    onProfileInfoChange({ ...profileInfo, [field]: value });
  };

  const updateProfilePhoto = (file: File | undefined) => {
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        updateProfileInfo("photoUrl", reader.result);
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
        updateProfileInfo("address", `현재 위치 확인됨 (${latitude}, ${longitude})`);
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

  return (
    <section className="guardian-info-onboarding" aria-labelledby="guardian-info-title">
      <header className="info-onboarding-header">
        <button type="button" onClick={onBack} aria-label="이전 화면으로 돌아가기">
          <svg aria-hidden="true" viewBox="0 0 24 24">
            <path d="M15 18L9 12L15 6" />
          </svg>
        </button>
        <h1 id="guardian-info-title">내 정보 등록</h1>
      </header>

      <div className="info-onboarding-progress" aria-label="가입 단계 1단계">
        <div className="info-progress-labels">
          <span className="is-current">내 정보</span>
          <span>부모님 정보</span>
        </div>
        <div className="info-progress-track" aria-hidden="true">
          <span />
        </div>
        <p>1 / 2</p>
      </div>

      <main className="info-onboarding-main">
        <div className="info-onboarding-copy">
          <h2>
            반가워요!
            <br />
            보호자님의 정보를 알려주세요.
          </h2>
          <p>안전한 매칭을 위해 꼭 필요한 정보예요.</p>
        </div>

        <div className="info-form">
          <section className="info-form-card info-photo-card">
            <strong>프로필 사진</strong>
            <label className="info-photo-uploader">
              <input
                type="file"
                accept="image/*"
                onChange={(event) => updateProfilePhoto(event.target.files?.[0])}
              />
              <span>
                <img src={profileInfo.photoUrl || asset("default-profile-avatar.svg")} alt="" />
              </span>
              <b>{profileInfo.photoUrl ? "사진 변경하기" : "사진 등록하기"}</b>
              <small>보호자님을 확인할 수 있는 사진을 올려주세요.</small>
            </label>
          </section>

          <section className="info-form-card">
            <label htmlFor="guardian-name">성함</label>
            <input
              id="guardian-name"
              className="info-input"
              value={profileInfo.name}
              placeholder="예: 홍길동"
              onChange={(event) => updateProfileInfo("name", event.target.value)}
            />
          </section>

          <section className="info-form-card">
            <label htmlFor="guardian-phone">연락처</label>
            <div className="info-phone-row">
              <input
                id="guardian-phone"
                value={profileInfo.phone}
                inputMode="tel"
                placeholder="010-0000-0000"
                onChange={(event) => updateProfileInfo("phone", event.target.value)}
              />
              <button type="button" onClick={() => setIsPhoneSent(true)}>
                {isPhoneSent ? "전송 완료" : "인증번호 전송"}
              </button>
            </div>
          </section>

          <section className="info-form-card">
            <strong>부모님과의 관계</strong>
            <div className="info-relationship-grid" role="radiogroup" aria-label="부모님과의 관계">
              {RELATION_OPTIONS.map((relation) => (
                <button
                  className={profileInfo.relation === relation ? "is-selected" : ""}
                  type="button"
                  role="radio"
                  aria-checked={profileInfo.relation === relation}
                  key={relation}
                  onClick={() => updateProfileInfo("relation", relation)}
                >
                  <span className="info-radio" aria-hidden="true">
                    {profileInfo.relation === relation && (
                      <img src={asset("onboarding-radio-check.svg")} alt="" />
                    )}
                  </span>
                  {relation}
                </button>
              ))}
            </div>
          </section>

          <section className="info-form-card">
            <label htmlFor="guardian-address">거주 지역</label>
            <div className="info-address-row">
              <input
                id="guardian-address"
                value={profileInfo.address}
                placeholder="제주시 조천읍"
                onChange={(event) => updateProfileInfo("address", event.target.value)}
              />
              <button type="button" onClick={findCurrentLocation}>
                위치 찾기
              </button>
            </div>
            {locationStatus && <p className="location-helper-text">{locationStatus}</p>}
            {isAddressSearchOpen && (
              <div className="info-address-results" aria-label="주소 검색 결과">
                {ADDRESS_OPTIONS.map((address) => (
                  <button
                    className={profileInfo.address === address ? "is-selected" : ""}
                    type="button"
                    key={address}
                    onClick={() => {
                      updateProfileInfo("address", address);
                      setIsAddressSearchOpen(false);
                    }}
                  >
                    {address}
                  </button>
                ))}
              </div>
            )}
            <input
              value={profileInfo.detailAddress}
              placeholder="상세 주소를 입력해주세요 (예: 101동 202호)"
              onChange={(event) => updateProfileInfo("detailAddress", event.target.value)}
            />
            <div className="request-map-preview info-map-preview" aria-label={`${profileInfo.address || "거주 지역"} 지도 미리보기`}>
              <img className="request-map-image" src={asset("jeju-map-preview.svg")} alt="" />
              <span className="request-map-marker" aria-hidden="true" />
              <span>{profileInfo.address || "거주 지역"}</span>
            </div>
          </section>
        </div>
      </main>

      <footer className="info-onboarding-footer">
        <button type="button" onClick={onComplete}>
          등록 완료하고 시작하기
        </button>
      </footer>
    </section>
  );
}
