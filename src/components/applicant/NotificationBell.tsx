import { useState } from "react";

type NotificationBellProps = {
  className?: string;
  iconName?: string;
  onOpenChat?: () => void;
  onOpenMatch?: () => void;
  onOpenProgress?: () => void;
};

type NotificationItem = {
  id: string;
  title: string;
  body: string;
  time: string;
  actionLabel: string;
  onClick?: () => void;
};

export function NotificationBell({
  className = "search-bell-button",
  iconName = "icon-bell.svg",
  onOpenChat,
  onOpenMatch,
  onOpenProgress
}: NotificationBellProps) {
  const [isOpen, setIsOpen] = useState(false);
  const asset = (name: string) => `/figma-assets/${name}`;
  const notifications: NotificationItem[] = [
    {
      id: "accepted",
      title: "요청 수락 완료",
      body: "김민석님이 내일 오후 2시 도움 요청을 수락했어요.",
      time: "방금",
      actionLabel: "매칭현황 보기",
      onClick: onOpenMatch
    },
    {
      id: "schedule",
      title: "방문 일정이 가까워요",
      body: "내일 오후 2시 병원 동행 일정이 예정되어 있어요.",
      time: "1시간 전",
      actionLabel: "일정 확인",
      onClick: onOpenMatch
    },
    {
      id: "chat",
      title: "새 채팅 메시지",
      body: "가치이웃이 준비물 확인 메시지를 보냈어요.",
      time: "2시간 전",
      actionLabel: "채팅 보기",
      onClick: onOpenChat
    },
    {
      id: "progress",
      title: "진행 리포트 도착",
      body: "방문 진행 상황을 확인할 수 있어요.",
      time: "어제",
      actionLabel: "리포트 보기",
      onClick: onOpenProgress
    }
  ];

  const openNotification = (notification: NotificationItem) => {
    setIsOpen(false);
    notification.onClick?.();
  };

  return (
    <div className="notification-bell-wrap">
      <button
        className={`${className} notification-bell-button`}
        type="button"
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        aria-label="알림"
        onClick={() => setIsOpen((current) => !current)}
      >
        <img src={asset(iconName)} alt="" aria-hidden="true" />
        <span className="notification-dot" aria-hidden="true" />
      </button>

      {isOpen && (
        <section className="notification-popover" aria-label="최근 알림">
          <div className="notification-popover-head">
            <strong>최근 알림</strong>
            <button type="button" onClick={() => setIsOpen(false)} aria-label="알림 닫기">
              닫기
            </button>
          </div>
          <div className="notification-list">
            {notifications.map((notification) => (
              <button
                className="notification-item"
                key={notification.id}
                type="button"
                onClick={() => openNotification(notification)}
              >
                <span>{notification.time}</span>
                <strong>{notification.title}</strong>
                <p>{notification.body}</p>
                {notification.onClick && <b>{notification.actionLabel}</b>}
              </button>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
