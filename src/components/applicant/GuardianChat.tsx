import { useEffect, useRef, useState } from "react";
import { SERVICE_NAME } from "../../constants";
import type { CareRequest } from "../../types/careRequest";
import type { Helper } from "../../types/helper";
import type { Message } from "../../types/message";

type GuardianChatProps = {
  careRequest: CareRequest;
  messages: Message[];
  selectedHelper?: Helper;
  onBackSchedule: () => void;
  onGoHome: () => void;
  onOpenSearch: () => void;
  onOpenMatch: () => void;
  onOpenProfile: () => void;
  onOpenProgress: () => void;
  onSendMessage: (content: string) => void;
};

export function GuardianChat({
  careRequest,
  messages,
  selectedHelper,
  onBackSchedule,
  onGoHome,
  onOpenSearch,
  onOpenMatch,
  onOpenProfile,
  onOpenProgress,
  onSendMessage
}: GuardianChatProps) {
  const [draftMessage, setDraftMessage] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);
  const asset = (name: string) => `/figma-assets/${name}`;

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
          ←
        </button>
        <strong>{SERVICE_NAME}</strong>
        <button className="search-bell-button" type="button" aria-label="알림">
          <img src={asset("icon-bell.svg")} alt="" aria-hidden="true" />
        </button>
      </header>

      {selectedHelper && (
        <article className="chat-provider-header" aria-labelledby="guardian-chat-title">
          <img src={selectedHelper.imageUrl} alt="" />
          <div>
            <span>가치이웃</span>
            <h1 id="guardian-chat-title">{selectedHelper.name}</h1>
            <p>
              {careRequest.date} · {careRequest.time}
            </p>
          </div>
          <strong>수락 완료</strong>
        </article>
      )}

      <div className="chat-safety-note">
        <strong>기록 안내</strong>
        <p>약속 장소, 준비물, 추가 요청은 채팅으로 남기면 진행 상황 확인에 도움이 됩니다.</p>
        <button type="button" onClick={onOpenProgress}>
          진행 리포트 보기
        </button>
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
          <img src={asset("icon-home.svg")} alt="" aria-hidden="true" />
          홈
        </button>
        <button type="button" onClick={onOpenSearch}>
          <img src={asset("icon-search.svg")} alt="" aria-hidden="true" />
          검색
        </button>
        <button className="is-active" type="button" onClick={onOpenMatch}>
          <img src={asset("icon-match.svg")} alt="" aria-hidden="true" />
          매칭현황
        </button>
        <button type="button" onClick={onOpenProfile}>
          <img src={asset("icon-user.svg")} alt="" aria-hidden="true" />
          내 정보
        </button>
      </nav>
    </section>
  );
}
