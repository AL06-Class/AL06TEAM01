import type { CarePlan } from "../types/carePlan";

export const carePlans: CarePlan[] = [
  {
    id: "single-care",
    title: "건별 생활 도움",
    type: "single",
    priceLabel: "1회 요청",
    description: "필요한 날에만 예산을 제안하고 가까운 가치이웃을 찾습니다.",
    features: ["건별 결제", "신청자 제안 금액", "진행 리포트"]
  },
  {
    id: "weekly-package",
    title: "주 1회 안심 패키지",
    type: "subscription",
    priceLabel: "월 구독",
    description: "정기 방문이 필요한 가족을 위해 매주 같은 흐름으로 관리합니다.",
    features: ["월 단위 구독", "정기 방문", "가치이웃 신뢰 카드"]
  },
  {
    id: "daily-support",
    title: "생활 도움 패키지",
    type: "subscription",
    priceLabel: "맞춤 구독",
    description: "식사, 가사, 디지털 기기 도움을 묶어 생활 루틴을 채웁니다.",
    features: ["맞춤 업무", "추가 도움 제안", "히스토리 보관"]
  }
];
