import type { Message } from "../types/message";

export const initialMessages: Message[] = [
  {
    id: "message-1",
    sender: "helper",
    content: "안녕하세요. 내일 장보기 동행 일정 확인했습니다. 만나실 장소는 조천읍 주민센터 앞이 맞을까요?",
    time: "오전 10:12"
  },
  {
    id: "message-2",
    sender: "guardian",
    content: "네, 맞습니다. 어머니가 천천히 걸으셔서 여유 있게 이동 부탁드려요.",
    time: "오전 10:15"
  },
  {
    id: "message-3",
    sender: "helper",
    content: "알겠습니다. 장보기 목록은 도착 전에 채팅으로 보내주시면 확인해두겠습니다.",
    time: "오전 10:16"
  }
];
