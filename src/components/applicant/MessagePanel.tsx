import { useState } from "react";
import type { Message } from "../../types/message";

type MessagePanelProps = {
  messages: Message[];
  onSendMessage: (content: string) => void;
};

export function MessagePanel({ messages, onSendMessage }: MessagePanelProps) {
  const [draftMessage, setDraftMessage] = useState("");

  const handleSendMessage = () => {
    const trimmedMessage = draftMessage.trim();

    if (!trimmedMessage) {
      return;
    }

    onSendMessage(trimmedMessage);
    setDraftMessage("");
  };

  return (
    <section className="section-card compact-card" id="messages" aria-labelledby="message-panel-title">
      <div className="section-card-header">
        <p className="section-kicker">메시지 / 소통</p>
        <h2 id="message-panel-title">제공자와 대화</h2>
      </div>

      <div className="message-list" aria-label="메시지 목록">
        {messages.map((message) => (
          <article className={`message-bubble ${message.sender}`} key={message.id}>
            <span>{message.sender === "provider" ? "제공자" : "신청자"}</span>
            <p>{message.content}</p>
            {message.time && <time>{message.time}</time>}
          </article>
        ))}
      </div>

      <label className="message-input-label" htmlFor="message-input">
        메시지 입력
      </label>
      <div className="message-input-row">
        <input
          id="message-input"
          type="text"
          placeholder="메시지를 입력하세요"
          value={draftMessage}
          onChange={(event) => setDraftMessage(event.target.value)}
        />
        <button className="primary-button" type="button" onClick={handleSendMessage}>
          보내기
        </button>
      </div>
    </section>
  );
}
