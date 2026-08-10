type CommonGatewayProps = {
  onOpenGuardian: () => void;
  onOpenProvider: () => void;
};

export function CommonGateway({ onOpenGuardian, onOpenProvider }: CommonGatewayProps) {
  return (
    <main className="common-gateway" aria-labelledby="common-gateway-title">
      <section className="common-gateway-panel">
        <div className="common-brand">
          <span className="common-brand-mark">가</span>
          <strong>가치이음</strong>
        </div>

        <div className="common-copy">
          <p>공통 진입</p>
          <h1 id="common-gateway-title">어떤 역할로 이용하시나요?</h1>
          <span>역할을 선택하면 해당 서비스 화면으로 이동합니다.</span>
        </div>

        <div className="common-role-list" aria-label="역할 선택">
          <button className="common-role-card" type="button" onClick={onOpenGuardian}>
            <span className="common-role-icon guardian" aria-hidden="true">
              보호
            </span>
            <strong>보호자</strong>
            <p>가족을 위한 도움을 요청하고 매칭 현황을 확인해요.</p>
            <em>보호자 화면으로 이동</em>
          </button>

          <button className="common-role-card" type="button" onClick={onOpenProvider}>
            <span className="common-role-icon provider" aria-hidden="true">
              제공
            </span>
            <strong>가치제공자</strong>
            <p>어르신께 도움을 제공하고 요청과 일정을 관리해요.</p>
            <em>가치제공자 화면으로 이동</em>
          </button>
        </div>
      </section>
    </main>
  );
}
