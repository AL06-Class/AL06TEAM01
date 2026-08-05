export type ProviderRequestStatus = "new" | "accepted" | "rejected";

export type ProviderPlanStep = {
  title: string;
  description: string;
};

export type ProviderCarePlan = {
  id: string;
  requestId: string;
  providerId: string;
  estimatedDuration: string;
  steps: ProviderPlanStep[];
  checklist: string[];
  messageToGuardian: string;
  updatedAt: string;
};

export type ProviderIncomingRequest = {
  id: string;
  providerId: string;
  guardianName: string;
  parentName: string;
  careType: string;
  region: string;
  address: string;
  date: string;
  time: string;
  expectedPay: number;
  requestNote: string;
  caution: string;
  status: ProviderRequestStatus;
  plan?: ProviderCarePlan;
};

export const providerRequests: ProviderIncomingRequest[] = [
  {
    id: "request-240730-01",
    providerId: "provider-minseok",
    guardianName: "이민정",
    parentName: "김영자",
    careType: "병원 동행",
    region: "제주시 조천읍",
    address: "제주시 조천읍 함덕로 24",
    date: "2026-07-31",
    time: "오후 02:00",
    expectedPay: 30000,
    requestNote: "정기 병원 검진에 동행해주시고 접수와 수납을 함께 도와주세요.",
    caution: "오래 걸으면 무릎이 불편하셔서 중간중간 쉬어야 합니다.",
    status: "new"
  },
  {
    id: "request-240730-02",
    providerId: "provider-minseok",
    guardianName: "박선영",
    parentName: "박정순",
    careType: "장보기 동행",
    region: "제주시 노형동",
    address: "제주시 노형동 월랑로 18",
    date: "2026-07-30",
    time: "오후 05:00",
    expectedPay: 22000,
    requestNote: "마트에서 생필품을 함께 고르고 무거운 짐을 집까지 옮겨주세요.",
    caution: "엘리베이터가 있어 이동은 어렵지 않습니다.",
    status: "accepted",
    plan: {
      id: "plan-240730-02",
      requestId: "request-240730-02",
      providerId: "provider-minseok",
      estimatedDuration: "1시간 30분",
      steps: [
        { title: "방문 전 연락", description: "출발 전 보호자에게 도착 예정 시간을 알려드립니다." },
        { title: "장보기 동행", description: "구매 목록을 확인하고 무거운 물품을 함께 옮깁니다." },
        { title: "완료 보고", description: "도움 완료 후 보호자에게 사진과 함께 진행 내용을 전달합니다." }
      ],
      checklist: ["구매 목록 확인", "장바구니 준비", "영수증 전달"],
      messageToGuardian: "장보기 목록을 미리 보내주시면 더 빠르게 도와드릴 수 있어요.",
      updatedAt: "2026-07-30"
    }
  }
];
