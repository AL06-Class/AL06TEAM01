import type { CareReportItem } from "../types/careReport";

export const careReportItems: CareReportItem[] = [
  {
    time: "09:00",
    label: "방문 시작",
    description: "도착 후 오늘 필요한 도움을 함께 확인했습니다."
  },
  {
    time: "10:10",
    label: "식사 도움",
    description: "식사 준비와 정리를 도와드렸습니다."
  },
  {
    time: "11:20",
    label: "산책 동행",
    description: "가까운 길을 천천히 걸으며 컨디션을 확인했습니다."
  },
  {
    time: "12:00",
    label: "종료 리포트",
    description: "오늘 진행 내용과 다음 요청사항을 남겼습니다."
  }
];
