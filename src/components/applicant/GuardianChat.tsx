import { useEffect, useRef, useState } from "react";
import { SERVICE_NAME } from "../../constants";
import type { CareRequest } from "../../types/careRequest";
import type { Helper } from "../../types/helper";
import type { Message } from "../../types/message";
import { NotificationBell } from "./NotificationBell";

type GuardianChatProps = {
  careRequest: CareRequest;
  messages: Message[];
  selectedHelper?: Helper;
  onBackSchedule: () => void;
  onGoHome: () => void;
  onOpenSearch: () => void;
  onOpenMatch: () => void;
  onOpenChat: () => void;
  onOpenProfile: () => void;
  onOpenProgress: () => void;
  onSendMessage: (content: string) => void;
  canOpenReport: boolean;
};

export function GuardianChat({
  careRequest,
  messages,
  selectedHelper,
  onBackSchedule,
  onGoHome,
  onOpenSearch,
  onOpenMatch,
  onOpenChat,
  onOpenProfile,
  onOpenProgress,
  onSendMessage,
  canOpenReport
}: GuardianChatProps) {
  const [draftMessage, setDraftMessage] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);
  const asset = (name: string) => `/figma-assets/${name}`;
  const visitSchedule = [careRequest.date, careRequest.time].filter(Boolean).join(" · ");

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages.length]);

  const handleSend = () => {
    const trimmedMessage = draftMessage.trim();

    if (!trimmedMessage) {
      return;
    }

    onSendMessage(trimmedMessage);
    setDraftMessage("");
  };

  return (
    <section className="guardian-chat" aria-labelledby="guardian-chat-title">
      <p className="search-context-label">채팅</p>

      <header className="guardian-search-header">
        <button className="search-back-button" type="button" onClick={onBackSchedule} aria-label="매칭현황으로 돌아가기">
          <svg aria-hidden="true" viewBox="0 0 24 24">
            <path d="M15 18L9 12L15 6" />
          </svg>
        </button>
        <strong>{SERVICE_NAME}</strong>
        <NotificationBell onOpenChat={onOpenChat} onOpenMatch={onOpenMatch} onOpenProgress={onOpenProgress} />
      </header>

      {selectedHelper && (
        <article className="chat-provider-header" aria-labelledby="guardian-chat-title">
          <img src={selectedHelper.imageUrl} alt="" />
          <div>
            <span>가치이웃</span>
            <h1 id="guardian-chat-title">{selectedHelper.name}</h1>
            {visitSchedule && <p>{visitSchedule}</p>}
          </div>
          <strong>{canOpenReport ? "수락 완료" : "요청 전"}</strong>
        </article>
      )}

      <div className="chat-safety-note">
        <strong>기록 안내</strong>
        <p>약속 장소, 준비물, 추가 요청은 채팅으로 남기면 진행 상황 확인에 도움이 됩니다.</p>
        {canOpenReport && (
          <button type="button" onClick={onOpenProgress}>
            계획리포트
          </button>
        )}
      </div>

      <div className="guardian-chat-list" aria-label="채팅 메시지">
        {messages.map((message) => (
          <article className={`guardian-chat-bubble ${message.sender}`} key={message.id}>
            <span>{message.sender === "helper" ? selectedHelper?.name || "가치이웃" : "보호자"}</span>
            <p>{message.content}</p>
            {message.time && <time>{message.time}</time>}
          </article>
        ))}
        <div className="chat-scroll-anchor" ref={chatEndRef} aria-hidden="true" />
      </div>

      <div className="guardian-chat-input chat-input-above-nav" aria-label="메시지 입력">
        <input
          value={draftMessage}
          onChange={(event) => setDraftMessage(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              handleSend();
            }
          }}
          placeholder="메시지를 입력하세요"
        />
        <button type="button" onClick={handleSend}>
          전송
        </button>
      </div>

      <nav className="search-bottom-nav chat-bottom-nav" aria-label="하단 메뉴">
        <button type="button" onClick={onGoHome}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M4 10.8 12 4l8 6.8V20a1 1 0 0 1-1 1h-4.5v-6h-5v6H5a1 1 0 0 1-1-1v-9.2Z" />
          </svg>
          홈
        </button>
        <button type="button" onClick={onOpenSearch}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="11" cy="11" r="7" />
            <path d="M21 21l-4.3-4.3" />
          </svg>
          검색
        </button>
        <button className="is-active" type="button" onClick={onOpenMatch}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
          매칭현황
        </button>
        <button type="button" onClick={onOpenProfile}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM4 21a8 8 0 0 1 16 0" />
          </svg>
          내 정보
        </button>
      </nav>
    </section>
  );
}
