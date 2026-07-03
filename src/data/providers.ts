import type { Provider } from "../types/provider";

export const providers: Provider[] = [
  {
    id: "provider-kim",
    name: "김민정 제공자",
    distance: "1.2km",
    price: 30000,
    badges: ["검증 완료", "요양보호사 자격증", "실시간 리포트 가능"],
    trustItems: ["신원 확인 완료", "요양보호사 자격증 등록", "방문 리포트 작성 가능"],
    description: "가까운 거리에서 안정적인 가사 도움과 생활 돌봄을 제공합니다."
  },
  {
    id: "provider-lee",
    name: "이영숙 제공자",
    distance: "1.8km",
    price: 28000,
    badges: ["검증 완료", "디지털 기기 능숙", "시니어 친화"],
    trustItems: ["신원 확인 완료", "스마트폰 사용 도움 가능", "시니어 대화 경험"],
    description: "천천히 설명하고 편안하게 소통하는 돌봄을 지향합니다."
  },
  {
    id: "provider-park",
    name: "박선영 제공자",
    distance: "2.3km",
    price: 25000,
    badges: ["검증 완료", "취미 동행", "쉬운 소통"],
    trustItems: ["신원 확인 완료", "산책·독서 동행 가능", "일상 대화 중심 케어"],
    description: "예약 전 요청사항을 꼼꼼히 확인하고 진행 상황을 공유합니다."
  }
];
