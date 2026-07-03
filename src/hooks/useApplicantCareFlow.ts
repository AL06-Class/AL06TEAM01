import { useRef, useState } from "react";
import { carePlans } from "../data/carePlans";
import { careReportItems } from "../data/careReportItems";
import { initialMessages } from "../data/messages";
import { initialReviews } from "../data/reviews";
import { providers } from "../data/providers";
import type { CareRequest } from "../types/careRequest";
import type { ReservationStatus } from "../types/reservation";

const initialCareRequest: CareRequest = {
  region: "서울 강남구",
  date: "2025-05-17",
  time: "09:00-12:00",
  careType: "가사 도움",
  paymentPlan: "single",
  proposedPrice: "30000",
  preferredSkills: "요양보호사 자격증, 디지털 기기 도움, 산책·취미 동행 가능",
  requestNote: ""
};

export function useApplicantCareFlow() {
  const [careRequest, setCareRequest] = useState(initialCareRequest);
  const [selectedProviderId, setSelectedProviderId] = useState(providers[0].id);
  const [selectedPlanId, setSelectedPlanId] = useState(carePlans[0].id);
  const [reservationStatus, setReservationStatus] = useState<ReservationStatus>("pending");
  const [messages, setMessages] = useState(initialMessages);
  const [reviews, setReviews] = useState(initialReviews);

  const requestSectionRef = useRef<HTMLDivElement>(null);
  const guideSectionRef = useRef<HTMLDivElement>(null);
  const messageSectionRef = useRef<HTMLDivElement>(null);

  const selectedProvider = providers.find((provider) => provider.id === selectedProviderId);

  const scrollTo = (element: HTMLDivElement | null) => {
    element?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleCareRequestChange = (field: keyof CareRequest, value: string) => {
    setCareRequest((currentRequest) => ({
      ...currentRequest,
      [field]: value
    }));
  };

  const handleFindProviders = () => {
    setReservationStatus("confirmed");
  };

  const handlePay = () => {
    setReservationStatus("paid");
  };

  const handlePlanSelect = (planId: string) => {
    const selectedPlan = carePlans.find((plan) => plan.id === planId);

    setSelectedPlanId(planId);

    if (selectedPlan) {
      setCareRequest((currentRequest) => ({
        ...currentRequest,
        paymentPlan: selectedPlan.type
      }));
    }
  };

  const handleSendMessage = (content: string) => {
    setMessages((currentMessages) => [
      ...currentMessages,
      {
        id: `message-${currentMessages.length + 1}`,
        sender: "applicant",
        content,
        time: "방금"
      }
    ]);
  };

  const handleSaveReview = (content: string) => {
    setReviews((currentReviews) => [
      {
        id: `review-${currentReviews.length + 1}`,
        rating: 5,
        content
      },
      ...currentReviews
    ]);
  };

  return {
    carePlans,
    selectedPlanId,
    onSelectPlan: handlePlanSelect,
    careRequest,
    onCareRequestChange: handleCareRequestChange,
    providers,
    selectedProviderId,
    selectedProvider,
    onSelectProvider: setSelectedProviderId,
    reservationStatus,
    onFindProviders: handleFindProviders,
    onPay: handlePay,
    careReportItems,
    messages,
    onSendMessage: handleSendMessage,
    reviews,
    onSaveReview: handleSaveReview,
    requestSectionRef,
    guideSectionRef,
    messageSectionRef,
    scrollToRequest: () => scrollTo(requestSectionRef.current),
    scrollToGuide: () => scrollTo(guideSectionRef.current),
    scrollToMessages: () => scrollTo(messageSectionRef.current)
  };
}
