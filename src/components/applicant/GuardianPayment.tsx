type GuardianPaymentProps = {
  onBack: () => void;
  onPay: () => void;
};

export function GuardianPayment({ onBack, onPay }: GuardianPaymentProps) {
  const asset = (name: string) => `/figma-assets/${name}`;

  return (
    <section className="guardian-payment" aria-labelledby="guardian-payment-title">
      <header className="payment-header">
        <button type="button" onClick={onBack} aria-label="완료 승인 화면으로 돌아가기">
          <img src={asset("request-back-icon.png")} alt="" aria-hidden="true" />
        </button>
        <h1 id="guardian-payment-title">결제하기</h1>
      </header>

      <main className="payment-main">
        <section className="payment-amount-card" aria-label="최종 결제 금액">
          <span>최종 결제 금액</span>
          <strong>85,000<small>원</small></strong>
        </section>

        <section className="payment-method-section" aria-labelledby="payment-method-title">
          <h2 id="payment-method-title">MVP 결제 안내</h2>
          <article className="payment-guide-card">
            <span aria-hidden="true">
              <img src={asset("profile-icon-payment.svg")} alt="" />
            </span>
            <div>
              <strong>카드정보는 앱에 입력하지 않아요</strong>
              <p>
                현재 MVP에서는 도움 완료 확인 후 카카오톡 또는 문자로 결제 링크를 보내드려요.
                링크에서 카드, 간편결제, 계좌이체 중 편한 방식으로 결제할 수 있어요.
              </p>
            </div>
          </article>
          <ol className="payment-guide-steps" aria-label="결제 진행 순서">
            <li>완료 승인 후 결제 안내가 발송돼요.</li>
            <li>결제 링크에서 원하는 결제수단을 선택해요.</li>
            <li>결제 완료 후 영수증과 이용 내역을 확인할 수 있어요.</li>
          </ol>
        </section>

        <section className="receipt-card payment-receipt-guide">
          <div>
            <strong>영수증 발급 안내</strong>
            <p>결제 완료 후 등록된 이메일 또는 문자로 안내드려요.</p>
          </div>
        </section>
      </main>

      <footer className="fixed-cta-bar">
        <button type="button" onClick={onPay}>결제 안내 확인하기</button>
      </footer>
    </section>
  );
}
