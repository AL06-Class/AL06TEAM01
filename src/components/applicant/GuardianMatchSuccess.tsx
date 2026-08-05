import type { Helper } from "../../types/helper";

type GuardianMatchSuccessProps = {
  selectedHelper?: Helper;
  onBackHome: () => void;
  onOpenChat: () => void;
  onOpenPlan: () => void;
};

export function GuardianMatchSuccess({ selectedHelper, onBackHome, onOpenChat, onOpenPlan }: GuardianMatchSuccessProps) {
  const asset = (name: string) => `/figma-assets/${name}`;
  const helperName = selectedHelper?.name || "가치제공자";

  return (
    <section className="guardian-match-success" aria-labelledby="match-success-title">
      <header className="simple-app-header">
        <button type="button" onClick={onBackHome} aria-label="홈으로 돌아가기">
          <img src={asset("figma-header-close.svg")} alt="" aria-hidden="true" />
        </button>
        <strong>가치이음</strong>
      </header>

      <main className="match-success-main">
        <section className="match-success-copy">
          <span>
            <img src={asset("icon-verified.svg")} alt="" aria-hidden="true" />
          </span>
          <h1 id="match-success-title">매칭 성공!</h1>
          <p>요청하신 서비스에 적합한 가치제공자가 매칭되었습니다.</p>
        </section>

        {selectedHelper && (
          <article className="match-success-provider">
            <img src={selectedHelper.imageUrl} alt="" />
            <div>
              <div>
                <strong>{helperName} 님</strong>
                <small>신원 인증 완료</small>
              </div>
              <p>★ {selectedHelper.rating.toFixed(1)} · 후기 {selectedHelper.reviewCount}개</p>
              <div className="match-success-tags">
                {selectedHelper.badges.slice(0, 2).map((badge) => (
                  <span key={badge}>{badge}</span>
                ))}
              </div>
            </div>
          </article>
        )}

        <aside className="match-success-alert">
          <img src={asset("icon-verified.svg")} alt="" aria-hidden="true" />
          <div>
            <strong>가치제공자가 수행 계획을 작성 중이에요.</strong>
            <p>계획이 완료되면 알림을 보내드릴게요. 잠시만 기다려주세요.</p>
          </div>
        </aside>
      </main>

      <footer className="match-success-actions">
        <button type="button" onClick={onOpenChat}>
          <img src={asset("icon-chat.svg")} alt="" aria-hidden="true" />
          채팅으로 먼저 인사하기
        </button>
        <button type="button" onClick={onOpenPlan}>수행 계획 확인하기</button>
      </footer>
    </section>
  );
}
