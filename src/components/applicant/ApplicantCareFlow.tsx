import { useLayoutEffect, useState } from "react";
import { useApplicantCareFlow } from "../../hooks/useApplicantCareFlow";
import { ApplicantMainHero } from "./ApplicantMainHero";
import { GuardianChat } from "./GuardianChat";
import { GuardianCompletionReview } from "./GuardianCompletionReview";
import { GuardianProgressReport } from "./GuardianProgressReport";
import { GuardianProfile } from "./GuardianProfile";
import { GuardianProviderDetail } from "./GuardianProviderDetail";
import { GuardianProviderSearch } from "./GuardianProviderSearch";
import { GuardianRequestConfirm } from "./GuardianRequestConfirm";
import { GuardianRequestForm } from "./GuardianRequestForm";
import { GuardianRequestStatus } from "./GuardianRequestStatus";
import { GuardianScheduleStatus } from "./GuardianScheduleStatus";

export function ApplicantCareFlow() {
  const [activeScreen, setActiveScreen] = useState<
    "home" | "search" | "providerDetail" | "request" | "confirm" | "status" | "schedule" | "chat" | "progress" | "completion" | "profile"
  >("home");
  const [isRequestSearch, setIsRequestSearch] = useState(false);
  const [directRequestHelperId, setDirectRequestHelperId] = useState("");
  const [directRequestSubmitLabel, setDirectRequestSubmitLabel] = useState("");
  const {
    careRequest,
    onCareRequestChange,
    helpers,
    selectedHelperId,
    selectedHelper,
    onSelectHelper,
    onFindHelpers,
    careReportItems,
    messages,
    onSendMessage,
    onSaveReview
  } = useApplicantCareFlow();

  const openRequestFlow = () => {
    setDirectRequestHelperId("");
    setDirectRequestSubmitLabel("");
    setActiveScreen("request");
  };

  const openRepeatRequestFlow = (helperId: string) => {
    onSelectHelper(helperId);
    setDirectRequestHelperId(helperId);
    setDirectRequestSubmitLabel("다시 요청하기");
    setIsRequestSearch(false);
    setActiveScreen("request");
  };

  const openSelectedHelperRequestFlow = () => {
    setDirectRequestHelperId(selectedHelperId);
    setDirectRequestSubmitLabel("도움 요청하기");
    setIsRequestSearch(false);
    setActiveScreen("request");
  };

  const openHomeMatchedDetail = () => {
    onSelectHelper("provider-minseok");
    setActiveScreen("providerDetail");
  };

  const submitRequestFlow = () => {
    if (directRequestHelperId) {
      setActiveScreen("confirm");
      return;
    }

    onFindHelpers();
    setIsRequestSearch(true);
    setActiveScreen("search");
  };

  const submitSelectedHelperRequest = () => {
    if (isRequestSearch) {
      setActiveScreen("confirm");
      return;
    }

    openSelectedHelperRequestFlow();
  };

  const sendConfirmedRequest = () => {
    onFindHelpers();
    setDirectRequestHelperId("");
    setDirectRequestSubmitLabel("");
    setIsRequestSearch(false);
    setActiveScreen("status");
  };

  useLayoutEffect(() => {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }

    window.scrollTo({ top: 0, left: 0 });
    const frameId = window.requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0 });
    });
    const timeoutId = window.setTimeout(() => {
      window.scrollTo({ top: 0, left: 0 });
    }, 120);
    const secondTimeoutId = window.setTimeout(() => {
      window.scrollTo({ top: 0, left: 0 });
    }, 300);
    const finalTimeoutId = window.setTimeout(() => {
      window.scrollTo({ top: 0, left: 0 });
    }, 600);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.clearTimeout(timeoutId);
      window.clearTimeout(secondTimeoutId);
      window.clearTimeout(finalTimeoutId);
    };
  }, [activeScreen]);

  return (
    <main className="app-shell" id="top">
      {activeScreen === "home" ? (
        <ApplicantMainHero
          onStartRequest={openRequestFlow}
          onOpenSearch={() => {
            setIsRequestSearch(false);
            setActiveScreen("search");
          }}
          onOpenMatch={() => setActiveScreen("schedule")}
          onOpenMatchedDetail={openHomeMatchedDetail}
          onOpenChat={() => setActiveScreen("chat")}
          onOpenProfile={() => setActiveScreen("profile")}
        />
      ) : activeScreen === "search" ? (
        <GuardianProviderSearch
          helpers={helpers}
          isRequestSearch={isRequestSearch}
          selectedHelperId={selectedHelperId}
          onSelectHelper={onSelectHelper}
          onOpenHelperDetail={() => setActiveScreen("providerDetail")}
          onBackHome={() => {
            setIsRequestSearch(false);
            setActiveScreen("home");
          }}
          onOpenMatch={() => setActiveScreen("schedule")}
          onOpenProfile={() => setActiveScreen("profile")}
          onStartRequest={openRequestFlow}
        />
      ) : activeScreen === "providerDetail" ? (
        <GuardianProviderDetail
          selectedHelper={selectedHelper}
          onBackSearch={() => setActiveScreen("search")}
          onOpenChat={() => setActiveScreen("chat")}
          onStartRequest={submitSelectedHelperRequest}
        />
      ) : activeScreen === "request" ? (
        <GuardianRequestForm
          careRequest={careRequest}
          selectedHelper={directRequestHelperId ? selectedHelper : undefined}
          submitLabel={directRequestSubmitLabel || undefined}
          onChange={onCareRequestChange}
          onGoHome={() => setActiveScreen("home")}
          onBackSearch={() => setActiveScreen("search")}
          onOpenMatch={() => setActiveScreen("schedule")}
          onOpenProfile={() => setActiveScreen("profile")}
          onSubmitRequest={submitRequestFlow}
        />
      ) : activeScreen === "confirm" ? (
        <GuardianRequestConfirm
          careRequest={careRequest}
          selectedHelper={selectedHelper}
          onBack={() => setActiveScreen(directRequestHelperId ? "request" : "providerDetail")}
          onSubmit={sendConfirmedRequest}
        />
      ) : activeScreen === "status" ? (
        <GuardianRequestStatus
          careRequest={careRequest}
          selectedHelper={selectedHelper}
          onBackRequest={() => setActiveScreen("request")}
          onGoHome={() => setActiveScreen("home")}
          onOpenSearch={() => setActiveScreen("search")}
          onOpenMatch={() => setActiveScreen("schedule")}
          onOpenProfile={() => setActiveScreen("profile")}
          onOpenSchedule={() => setActiveScreen("schedule")}
        />
      ) : activeScreen === "schedule" ? (
        <GuardianScheduleStatus
          careRequest={careRequest}
          selectedHelper={selectedHelper}
          onBackStatus={() => setActiveScreen("status")}
          onGoHome={() => setActiveScreen("home")}
          onOpenSearch={() => setActiveScreen("search")}
          onOpenChat={() => setActiveScreen("chat")}
          onOpenProfile={() => setActiveScreen("profile")}
          onRepeatRequest={openRepeatRequestFlow}
        />
      ) : activeScreen === "chat" ? (
        <GuardianChat
          careRequest={careRequest}
          messages={messages}
          selectedHelper={selectedHelper}
          onBackSchedule={() => setActiveScreen("schedule")}
          onGoHome={() => setActiveScreen("home")}
          onOpenSearch={() => setActiveScreen("search")}
          onOpenMatch={() => setActiveScreen("schedule")}
          onOpenProfile={() => setActiveScreen("profile")}
          onOpenProgress={() => setActiveScreen("progress")}
          onSendMessage={onSendMessage}
        />
      ) : activeScreen === "progress" ? (
        <GuardianProgressReport
          careRequest={careRequest}
          reportItems={careReportItems}
          selectedHelper={selectedHelper}
          onBackChat={() => setActiveScreen("chat")}
          onGoHome={() => setActiveScreen("home")}
          onOpenSearch={() => setActiveScreen("search")}
          onOpenMatch={() => setActiveScreen("schedule")}
          onOpenProfile={() => setActiveScreen("profile")}
          onComplete={() => setActiveScreen("completion")}
        />
      ) : activeScreen === "completion" ? (
        <GuardianCompletionReview
          careRequest={careRequest}
          selectedHelper={selectedHelper}
          onBackProgress={() => setActiveScreen("progress")}
          onGoHome={() => setActiveScreen("home")}
          onOpenSearch={() => setActiveScreen("search")}
          onOpenMatch={() => setActiveScreen("schedule")}
          onOpenProfile={() => setActiveScreen("profile")}
          onRequestAgain={() => setActiveScreen("home")}
          onSaveReview={onSaveReview}
        />
      ) : (
        <GuardianProfile
          onGoHome={() => setActiveScreen("home")}
          onOpenSearch={() => setActiveScreen("search")}
          onOpenMatch={() => setActiveScreen("schedule")}
        />
      )}
    </main>
  );
}
