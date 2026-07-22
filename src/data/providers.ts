import type { Helper } from "../types/helper";

export const helpers: Helper[] = [
  {
    id: "provider-kim",
    name: "김지연",
    imageUrl: "/figma-assets/provider-jiyeon.png",
    distance: "800m 이내",
    price: 15000,
    rating: 4.9,
    reviewCount: 124,
    completedCount: 91,
    badges: ["디지털 기기 교육", "스마트폰 상담"],
    trustItems: ["본인확인 완료", "생활 도움 경험 확인", "진행 기록 공유 가능"],
    quote: "어려운 스마트폰 사용법, 제가 눈높이에 맞춰 차근차근 알려드릴게요! 젊은 감각으로 쉽고 재밌게 도와드립니다.",
    description: "디지털 기기 교육과 스마트폰 상담을 차분하게 돕습니다."
  },
  {
    id: "provider-lee",
    name: "박성호",
    imageUrl: "/figma-assets/provider-sungho.jpg",
    distance: "강남구 거주",
    price: 13000,
    rating: 4.8,
    reviewCount: 89,
    completedCount: 74,
    badges: ["체력 자신", "짐 옮기기 보조"],
    trustItems: ["본인확인 완료", "생활 도움 경험 확인", "시간 약속 준수"],
    quote: "강남구에서 성실함으로 소문난 청년입니다. 무거운 짐이나 복잡한 심부름도 지치지 않는 체력으로 돕겠습니다.",
    description: "장보기 동행과 짐 옮기기 보조를 안정적으로 돕습니다."
  },
  {
    id: "provider-park",
    name: "이서윤",
    imageUrl: "/figma-assets/provider-seoyoon.jpg",
    distance: "2.5km",
    price: 16000,
    rating: 5.0,
    reviewCount: 56,
    completedCount: 43,
    badges: ["행정 서류 보조", "열정 가득"],
    trustItems: ["본인확인 완료", "행정 업무 동행 가능", "꼼꼼한 설명"],
    quote: "복잡한 관공서 일이나 인터넷 예약, 젊은 패기로 빠르고 정확하게 도와드립니다. 항상 웃는 얼굴로 함께하겠습니다.",
    description: "관공서 동행과 온라인 예약 도움을 꼼꼼하게 진행합니다."
  },
  {
    id: "provider-choi",
    name: "최하늘",
    imageUrl: "/figma-assets/provider-haneul.png",
    distance: "3.1km",
    price: 14000,
    rating: 4.7,
    reviewCount: 210,
    completedCount: 156,
    badges: ["산책/운동 동행", "활기찬 소통"],
    trustItems: ["본인확인 완료", "생활 도움 경험 확인", "야외 동행 가능"],
    quote: "산책이나 가벼운 운동이 필요할 때 불러주세요! 즐거운 대화와 밝은 에너지로 가득 채워드립니다.",
    description: "산책 동행과 가벼운 외출 도움을 밝게 진행합니다."
  }
];

export const providers = helpers;
