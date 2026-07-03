import type { Message } from "../types/message";

export const initialMessages: Message[] = [
  {
    id: "message-1",
    sender: "provider",
    content: "오늘은 컨디션이 좋으셨어요.",
    time: "11:35"
  },
  {
    id: "message-2",
    sender: "applicant",
    content: "네, 감사합니다.",
    time: "11:38"
  },
  {
    id: "message-3",
    sender: "provider",
    content: "종료 리포트를 남겨두었습니다.",
    time: "12:05"
  }
];
