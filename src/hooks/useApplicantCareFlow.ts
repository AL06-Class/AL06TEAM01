import { useRef, useState } from "react";
import { carePlans } from "../data/carePlans";
import { careReportItems } from "../data/careReportItems";
import { initialMessages } from "../data/messages";
import { initialReviews } from "../data/reviews";
import { helpers } from "../data/providers";
import type { CareRequest } from "../types/careRequest";
import type { ReservationStatus } from "../types/reservation";

const initialCareRequest: CareRequest = {
  region: "제주시 조천읍",
  date: "2026-07-22",
  time: "13:00-16:00",
  careType: "장보기 동행",
  paymentPlan: "single",
  proposedPrice: "15000",
  preferredSkills: "천천히 설명하기, 장보기 동행, 진행 상황 공유",
  requestNote: ""
};

export function useApplicantCareFlow() {
  const [careRequest, setCareRequest] = useState(initialCareRequest);
  const [selectedHelperId, setSelectedHelperId] = useState(helpers[0].id);
  const [selectedPlanId, setSelectedPlanId] = useState(carePlans[0].id);
  const [reservationStatus, setReservationStatus] = useState<ReservationStatus>("pending");
  const [messages, setMessages] = useState(initialMessages);
  const [reviews, setReviews] = useState(initialReviews);

  const requestSectionRef = useRef<HTMLDivElement>(null);
  const guideSectionRef = useRef<HTMLDivElement>(null);
  const messageSectionRef = useRef<HTMLDivElement>(null);

  const selectedHelper = helpers.find((helper) => helper.id === selectedHelperId);

  const scrollTo = (element: HTMLDivElement | null) => {
    element?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleCareRequestChange = (field: keyof CareRequest, value: string) => {
    setCareRequest((currentRequest) => ({
      ...currentRequest,
      [field]: value
    }));
  };

  const handleFindHelpers = () => {
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
        sender: "guardian",
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
    helpers,
    selectedHelperId,
    selectedHelper,
    onSelectHelper: setSelectedHelperId,
    reservationStatus,
    onFindHelpers: handleFindHelpers,
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
