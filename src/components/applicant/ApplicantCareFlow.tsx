import { useLayoutEffect, useState } from "react";
import { useApplicantCareFlow } from "../../hooks/useApplicantCareFlow";
import { ApplicantMainHero } from "./ApplicantMainHero";
import { GuardianCarePlanConfirm } from "./GuardianCarePlanConfirm";
import { GuardianChat } from "./GuardianChat";
import { GuardianCompletionApproval } from "./GuardianCompletionApproval";
import { GuardianCompletionReview } from "./GuardianCompletionReview";
import { GuardianInfoOnboarding } from "./GuardianInfoOnboarding";
import { GuardianMatchSuccess } from "./GuardianMatchSuccess";
import { GuardianOnboardingComplete } from "./GuardianOnboardingComplete";
import { GuardianParentOnboarding } from "./GuardianParentOnboarding";
import { GuardianPayment } from "./GuardianPayment";
import { GuardianProgressReport } from "./GuardianProgressReport";
import { GuardianProfile } from "./GuardianProfile";
import { GuardianProviderDetail } from "./GuardianProviderDetail";
import { GuardianProviderSearch } from "./GuardianProviderSearch";
import { GuardianRequestConfirm } from "./GuardianRequestConfirm";
import { GuardianRequestForm } from "./GuardianRequestForm";
import { GuardianRequestStatus } from "./GuardianRequestStatus";
import { GuardianReviewForm } from "./GuardianReviewForm";
import { GuardianScheduleStatus } from "./GuardianScheduleStatus";
import { GuardianStartScreen } from "./GuardianStartScreen";
import { ProviderAppHome } from "../provider/ProviderAppHome";

type Screen =
  | "start"
  | "guardianInfo"
  | "parentInfo"
  | "onboardingComplete"
  | "home"
  | "search"
  | "providerDetail"
  | "request"
  | "confirm"
  | "status"
  | "matchSuccess"
  | "carePlan"
  | "schedule"
  | "chat"
  | "progress"
  | "completionApproval"
  | "payment"
  | "review"
  | "completion"
  | "profile";

export type GuardianParentInfo = {
  name: string;
  age: string;
  relation: string;
  address: string;
  detailAddress: string;
  note: string;
  photoUrl: string;
};

export type GuardianProfileInfo = {
  name: string;
  phone: string;
  relation: string;
  address: string;
  detailAddress: string;
  photoUrl: string;
};

type ApplicantCareFlowProps = {
  role: "guardian" | "provider";
  onRoleChange: (role: "guardian" | "provider") => void;
};

export function ApplicantCareFlow({ role, onRoleChange }: ApplicantCareFlowProps) {
  const [activeScreen, setActiveScreen] = useState<Screen>("start");
  const [screenHistory, setScreenHistory] = useState<Screen[]>([]);
  const [isRequestSearch, setIsRequestSearch] = useState(false);
  const [directRequestHelperId, setDirectRequestHelperId] = useState("");
  const [directRequestSubmitLabel, setDirectRequestSubmitLabel] = useState("");
  const [matchedHelperId, setMatchedHelperId] = useState("provider-minseok");
  const [profileInfo, setProfileInfo] = useState<GuardianProfileInfo>({
    name: "이민정",
    phone: "010-1234-5678",
    relation: "자녀",
    address: "제주시 조천읍",
    detailAddress: "",
    photoUrl: ""
  });
  const [parentInfo, setParentInfo] = useState<GuardianParentInfo>({
    name: "김영자",
    age: "72",
    relation: "어머니",
    address: "제주시 조천읍",
    detailAddress: "",
    note: "장거리 이동은 동행이 필요해요.",
    photoUrl: ""
  });
  const {
    careRequest,
    onCareRequestChange,
    helpers,
    selectedHelperId,
    selectedHelper,
    onSelectHelper,
    onFindHelpers,
    onClearRequestNote,
    onResetCareRequest,
    onPay,
    careReportItems,
    messages,
    onSendMessage,
    onSaveReview
  } = useApplicantCareFlow();

  const navigate = (screen: Screen) => {
    setActiveScreen((currentScreen) => {
      if (currentScreen === screen) {
        return currentScreen;
      }

      setScreenHistory((currentHistory) => [...currentHistory, currentScreen].slice(-20));
      return screen;
    });
  };

  const goBack = (fallback: Screen = "home") => {
    setScreenHistory((currentHistory) => {
      const previousScreen = currentHistory[currentHistory.length - 1];

      setActiveScreen(previousScreen || fallback);
      return currentHistory.slice(0, -1);
    });
  };

  const openRequestFlow = () => {
    setDirectRequestHelperId("");
    setDirectRequestSubmitLabel("");
    setIsRequestSearch(false);
    onResetCareRequest();
    navigate("request");
  };

  const openRepeatRequestFlow = (helperId: string) => {
    onSelectHelper(helperId);
    setDirectRequestHelperId(helperId);
    setDirectRequestSubmitLabel("다시 요청하기");
    setIsRequestSearch(false);
    onClearRequestNote();
    navigate("request");
  };

  const openSelectedHelperRequestFlow = () => {
    setDirectRequestHelperId(selectedHelperId);
    setDirectRequestSubmitLabel("도움 요청하기");
    setIsRequestSearch(false);
    onClearRequestNote();
    navigate("request");
  };

  const openHomeMatchedDetail = () => {
    onSelectHelper("provider-minseok");
    navigate("providerDetail");
  };

  const openHomeMatchedChat = () => {
    onSelectHelper("provider-minseok");
    navigate("chat");
  };

  const openMatchedSchedule = () => {
    onSelectHelper(matchedHelperId);
    navigate("schedule");
  };

  const openMatchedChat = () => {
    onSelectHelper(matchedHelperId);
    navigate("chat");
  };

  const openMatchedProgress = () => {
    onSelectHelper(matchedHelperId);
    navigate("progress");
  };

  const submitRequestFlow = () => {
    if (directRequestHelperId) {
      navigate("confirm");
      return;
    }

    onFindHelpers();
    setIsRequestSearch(true);
    navigate("search");
  };

  const submitSelectedHelperRequest = () => {
    if (isRequestSearch) {
      navigate("confirm");
      return;
    }

    openSelectedHelperRequestFlow();
  };

  const sendConfirmedRequest = () => {
    setDirectRequestHelperId("");
    setDirectRequestSubmitLabel("");
    setIsRequestSearch(false);
    navigate("status");
  };

  const completePayment = () => {
    onPay();
    navigate("review");
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
      {role === "provider" ? (
        <ProviderAppHome
          onSwitchToGuardian={() => {
            onRoleChange("guardian");
            navigate("home");
          }}
        />
      ) : activeScreen === "start" ? (
        <GuardianStartScreen
          onStartGuardian={() => navigate("guardianInfo")}
          onStartProvider={() => onRoleChange("provider")}
        />
      ) : activeScreen === "guardianInfo" ? (
        <GuardianInfoOnboarding
          profileInfo={profileInfo}
          onProfileInfoChange={setProfileInfo}
          onBack={() => goBack("start")}
          onComplete={() => navigate("parentInfo")}
        />
      ) : activeScreen === "parentInfo" ? (
        <GuardianParentOnboarding
          parentInfo={parentInfo}
          onParentInfoChange={setParentInfo}
          onBack={() => goBack("guardianInfo")}
          onComplete={() => navigate("onboardingComplete")}
        />
      ) : activeScreen === "onboardingComplete" ? (
        <GuardianOnboardingComplete onStart={() => navigate("home")} />
      ) : activeScreen === "home" ? (
        <ApplicantMainHero
          onStartRequest={openRequestFlow}
          onSwitchToProvider={() => onRoleChange("provider")}
          onOpenSearch={() => {
            setIsRequestSearch(false);
            navigate("search");
          }}
          onOpenMatch={() => navigate("schedule")}
          onOpenMatchedDetail={openHomeMatchedDetail}
          onOpenChat={openHomeMatchedChat}
          onOpenProgress={openMatchedProgress}
          onOpenProfile={() => navigate("profile")}
        />
      ) : activeScreen === "search" ? (
        <GuardianProviderSearch
          helpers={helpers}
          careRequest={careRequest}
          isRequestSearch={isRequestSearch}
          selectedHelperId={selectedHelperId}
          onSelectHelper={onSelectHelper}
          onOpenHelperDetail={() => navigate("providerDetail")}
          onBackHome={() => {
            setIsRequestSearch(false);
            navigate("home");
          }}
          onOpenMatch={openMatchedSchedule}
          onOpenChat={openMatchedChat}
          onOpenProgress={openMatchedProgress}
          onOpenProfile={() => navigate("profile")}
          onStartRequest={openRequestFlow}
        />
      ) : activeScreen === "providerDetail" ? (
        <GuardianProviderDetail
          selectedHelper={selectedHelper}
          onBackSearch={() => goBack("search")}
          onOpenChat={() => navigate("chat")}
          onOpenReview={() => navigate("review")}
          onStartRequest={submitSelectedHelperRequest}
        />
      ) : activeScreen === "request" ? (
        <GuardianRequestForm
          careRequest={careRequest}
          selectedHelper={directRequestHelperId ? selectedHelper : undefined}
          submitLabel={directRequestSubmitLabel || undefined}
          onChange={onCareRequestChange}
          onGoHome={() => navigate("home")}
          onBackSearch={() => goBack("search")}
          onOpenMatch={() => navigate("schedule")}
          onOpenProfile={() => navigate("profile")}
          onSubmitRequest={submitRequestFlow}
        />
      ) : activeScreen === "confirm" ? (
        <GuardianRequestConfirm
          careRequest={careRequest}
          selectedHelper={selectedHelper}
          onBack={() => goBack(directRequestHelperId ? "request" : "providerDetail")}
          onSubmit={sendConfirmedRequest}
        />
      ) : activeScreen === "status" ? (
        <GuardianRequestStatus
          careRequest={careRequest}
          selectedHelper={selectedHelper}
          onBackRequest={() => goBack("request")}
          onGoHome={() => navigate("home")}
          onOpenSearch={() => navigate("search")}
          onOpenMatch={openMatchedSchedule}
          onOpenChat={openMatchedChat}
          onOpenProgress={openMatchedProgress}
          onOpenProfile={() => navigate("profile")}
          onOpenSchedule={openMatchedSchedule}
        />
      ) : activeScreen === "matchSuccess" ? (
        <GuardianMatchSuccess
          selectedHelper={selectedHelper}
          onBackHome={() => goBack("home")}
          onOpenChat={() => navigate("chat")}
          onOpenPlan={() => navigate("carePlan")}
        />
      ) : activeScreen === "carePlan" ? (
        <GuardianCarePlanConfirm
          careRequest={careRequest}
          selectedHelper={selectedHelper}
          onBack={() => goBack("matchSuccess")}
          onConfirm={() => navigate("schedule")}
          onOpenChat={() => navigate("chat")}
        />
      ) : activeScreen === "schedule" ? (
        <GuardianScheduleStatus
          careRequest={careRequest}
          selectedHelper={selectedHelper}
          reportItems={careReportItems}
          onBackStatus={() => goBack("status")}
          onGoHome={() => navigate("home")}
          onOpenSearch={() => navigate("search")}
          onOpenMatch={openMatchedSchedule}
          onOpenChat={openMatchedChat}
          onOpenProgress={openMatchedProgress}
          onOpenProfile={() => navigate("profile")}
          onRepeatRequest={openRepeatRequestFlow}
          onOpenReview={() => navigate("review")}
        />
      ) : activeScreen === "chat" ? (
        <GuardianChat
          careRequest={careRequest}
          messages={messages}
          selectedHelper={selectedHelper}
          canOpenReport={selectedHelperId === matchedHelperId}
          onBackSchedule={() => goBack("schedule")}
          onGoHome={() => navigate("home")}
          onOpenSearch={() => navigate("search")}
          onOpenMatch={openMatchedSchedule}
          onOpenChat={openMatchedChat}
          onOpenProfile={() => navigate("profile")}
          onOpenProgress={openMatchedProgress}
          onSendMessage={onSendMessage}
        />
      ) : activeScreen === "progress" ? (
        <GuardianProgressReport
          careRequest={careRequest}
          reportItems={careReportItems}
          selectedHelper={selectedHelper}
          onBackChat={() => goBack("chat")}
          onGoHome={() => navigate("home")}
          onOpenSearch={() => navigate("search")}
          onOpenMatch={openMatchedSchedule}
          onOpenChat={openMatchedChat}
          onOpenProgress={openMatchedProgress}
          onOpenProfile={() => navigate("profile")}
          onComplete={() => navigate("completionApproval")}
        />
      ) : activeScreen === "completionApproval" ? (
        <GuardianCompletionApproval
          careRequest={careRequest}
          onBack={() => goBack("progress")}
          onApprove={() => navigate("payment")}
          onReportProblem={() => navigate("chat")}
        />
      ) : activeScreen === "payment" ? (
        <GuardianPayment
          onBack={() => goBack("completionApproval")}
          onPay={completePayment}
        />
      ) : activeScreen === "review" ? (
        <GuardianReviewForm
          selectedHelper={selectedHelper}
          onBack={() => goBack("payment")}
          onSubmitReview={(content) => {
            onSaveReview(content);
            navigate("schedule");
          }}
        />
      ) : activeScreen === "completion" ? (
        <GuardianCompletionReview
          careRequest={careRequest}
          selectedHelper={selectedHelper}
          onBackProgress={() => goBack("progress")}
          onGoHome={() => navigate("home")}
          onOpenSearch={() => navigate("search")}
          onOpenMatch={openMatchedSchedule}
          onOpenChat={openMatchedChat}
          onOpenProgress={openMatchedProgress}
          onOpenProfile={() => navigate("profile")}
          onRequestAgain={() => navigate("home")}
          onSaveReview={onSaveReview}
        />
      ) : (
        <GuardianProfile
          profileInfo={profileInfo}
          onProfileInfoChange={setProfileInfo}
          parentInfo={parentInfo}
          onParentInfoChange={setParentInfo}
          onGoHome={() => navigate("home")}
          onOpenSearch={() => navigate("search")}
          onOpenMatch={openMatchedSchedule}
          onOpenChat={openMatchedChat}
          onOpenProgress={openMatchedProgress}
        />
      )}
    </main>
  );
}
