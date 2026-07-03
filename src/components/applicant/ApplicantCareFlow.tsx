import { useApplicantCareFlow } from "../../hooks/useApplicantCareFlow";
import { SERVICE_NAME } from "../../constants";
import { ApplicantMainHero } from "./ApplicantMainHero";
import { ApplicantMyPageCard } from "./ApplicantMyPageCard";
import { CarePlanOptions } from "./CarePlanOptions";
import { CareRequestForm } from "./CareRequestForm";
import { HowItWorksSteps } from "./HowItWorksSteps";
import { LiveCareReport } from "./LiveCareReport";
import { MessagePanel } from "./MessagePanel";
import { ProviderRecommendationList } from "./ProviderRecommendationList";
import { ReservationPaymentCard } from "./ReservationPaymentCard";
import { ReservationStatusCard } from "./ReservationStatusCard";
import { ReviewPanel } from "./ReviewPanel";

export function ApplicantCareFlow() {
  const {
    carePlans,
    selectedPlanId,
    onSelectPlan,
    careRequest,
    onCareRequestChange,
    providers,
    selectedProviderId,
    selectedProvider,
    onSelectProvider,
    reservationStatus,
    onFindProviders,
    onPay,
    careReportItems,
    messages,
    onSendMessage,
    reviews,
    onSaveReview,
    requestSectionRef,
    guideSectionRef,
    messageSectionRef,
    scrollToRequest,
    scrollToGuide,
    scrollToMessages
  } = useApplicantCareFlow();

  return (
    <main className="app-shell" id="top">
      <ApplicantMainHero onStartRequest={scrollToRequest} onShowGuide={scrollToGuide} />

      <HowItWorksSteps sectionRef={guideSectionRef} />

      <div className="content-stack" id="service" ref={requestSectionRef}>
        <CarePlanOptions carePlans={carePlans} selectedPlanId={selectedPlanId} onSelectPlan={onSelectPlan} />

        <section className="journey-section request-journey" aria-labelledby="request-journey-title">
          <div className="journey-header">
            <p className="section-kicker">신청 / 탐색</p>
            <h2 id="request-journey-title">예산과 원하는 역량을 입력하면 맞는 도우미를 보여줍니다</h2>
            <p className="section-description">
              신청자가 먼저 금액과 필요한 역량을 제안하고, 거리와 신뢰 이력을 기준으로 도우미를 비교합니다.
            </p>
          </div>
          <div className="request-layout">
            <CareRequestForm
              careRequest={careRequest}
              onChange={onCareRequestChange}
              onFindProviders={onFindProviders}
            />
            <ProviderRecommendationList
              providers={providers}
              selectedProviderId={selectedProviderId}
              onSelectProvider={onSelectProvider}
            />
          </div>
        </section>

        <section className="journey-section booking-journey" aria-labelledby="booking-journey-title">
          <div className="journey-header narrow-copy">
            <p className="section-kicker">예약 / 결제</p>
            <h2 id="booking-journey-title">선택한 제공자를 기준으로 예약과 결제를 바로 확인합니다</h2>
            <p className="section-description">
              실제 결제 연동 없이도 신청자가 보게 될 예약 요약, 진행 상태, 마이페이지 진입점을 확인할 수 있습니다.
            </p>
          </div>
          <div className="booking-layout">
            <ReservationPaymentCard
              selectedProvider={selectedProvider}
              careRequest={careRequest}
              status={reservationStatus}
              onPay={onPay}
            />
            <div className="booking-side">
              <ReservationStatusCard status={reservationStatus} onShowMessages={scrollToMessages} />
              <ApplicantMyPageCard />
            </div>
          </div>
        </section>

        <section
          className="journey-section care-journey"
          ref={messageSectionRef}
          aria-labelledby="care-journey-title"
        >
          <div className="journey-header">
            <p className="section-kicker">진행 / 소통</p>
            <h2 id="care-journey-title">돌봄이 시작된 뒤에는 리포트, 메시지, 후기가 이어집니다</h2>
            <p className="section-description">
              신청자가 안심할 수 있도록 진행 기록과 제공자 대화를 같은 흐름 안에서 확인하게 구성했습니다.
            </p>
          </div>
          <div className="care-layout">
            <LiveCareReport items={careReportItems} />
            <MessagePanel messages={messages} onSendMessage={onSendMessage} />
            <ReviewPanel reviews={reviews} onSaveReview={onSaveReview} />
          </div>
        </section>
      </div>

      <footer className="app-footer" id="support">
        <strong>{SERVICE_NAME} 고객센터</strong>
        <span>평일 10:00-18:00 · 신청자 예약과 이용 문의를 도와드립니다.</span>
      </footer>
    </main>
  );
}
