import { useState } from "react";
import type { Helper } from "../../types/helper";

type GuardianProviderDetailProps = {
  selectedHelper?: Helper;
  onBackSearch: () => void;
  onOpenChat: () => void;
  onOpenReview: () => void;
  onStartRequest: () => void;
};

type DetailHistory = {
  icon: string;
  title: string;
  body: string;
  rate: string;
};

type DetailReview = {
  name: string;
  meta: string;
  content: string;
};

type ProviderDetailContent = {
  meta: string;
  tags: string[];
  matchRate: string;
  responseSpeed: string;
  reason: string;
  histories: DetailHistory[];
  reviews: DetailReview[];
};

const trustBadges = [
  ["본인인증", "helper-badge-identity.png"],
  ["신원인증", "helper-badge-idcheck.png"],
  ["범죄경력", "helper-badge-record.png"],
  ["응급처치", "helper-badge-emergency.png"],
  ["지역인증", "helper-location-pin.png"]
];

const detailContentByHelperId: Record<string, ProviderDetailContent> = {
  "provider-kim": {
    meta: "제주시 인화동 거주 · 1년 경력",
    tags: ["#디지털 기기 교육", "#스마트폰 상담", "#산책 동행", "#말벗"],
    matchRate: "94%",
    responseSpeed: "10분 이내",
    reason:
      "제주에서 할머니와 함께 지내며 어르신들이 스마트폰이나 생활 앱을 어려워하는 순간을 자주 보았습니다. 눈높이에 맞춰 천천히 설명하고, 편안하게 다시 물어볼 수 있는 시간을 만들고 싶습니다.",
    histories: [
      {
        icon: "helper-history-phone.png",
        title: "스마트폰 영상통화 교육",
        body: "카카오톡, 영상통화, 사진 전송 방법을 반복 안내",
        rate: "만족도 100%"
      },
      {
        icon: "helper-history-box.png",
        title: "제주 동네 산책 동행",
        body: "인화동 주변 산책과 귀가 확인까지 동행",
        rate: "만족도 99%"
      }
    ],
    reviews: [
      {
        name: "김영* (본인)",
        meta: "2023.11.15 · 디지털 교육",
        content:
          "손녀 같은 지연이가 스마트폰 기능을 하나하나 아주 친절하게 설명해주셨어요. 덕분에 이제 친구들이랑 영상통화도 자신 있게 합니다."
      },
      {
        name: "오미* (보호자)",
        meta: "2023.11.08 · 산책 동행",
        content:
          "어머니 걸음에 맞춰 천천히 걸어주고, 끝나고 나서 사진과 상황을 알려줘서 안심이 됐습니다."
      }
    ]
  },
  "provider-minseok": {
    meta: "제주시 조천읍 거주 · 2년 경력",
    tags: ["#약보기 동행", "#병원 동행", "#보호자 공유", "#생활 보조"],
    matchRate: "96%",
    responseSpeed: "8분 이내",
    reason:
      "제주 조천읍에서 부모님 병원 동행을 도우며 보호자에게 진행 상황을 정확히 공유하는 일이 얼마나 중요한지 알게 되었습니다. 이동부터 접수, 귀가까지 차분하게 챙기는 도움을 드립니다.",
    histories: [
      {
        icon: "helper-history-phone.png",
        title: "병원 접수 및 약국 동행",
        body: "제주시 병원 접수, 수납, 약 수령 과정을 함께 진행",
        rate: "만족도 98%"
      },
      {
        icon: "helper-history-box.png",
        title: "보호자 진행 상황 공유",
        body: "이동 시작, 진료 대기, 귀가 완료까지 단계별 안내",
        rate: "만족도 97%"
      }
    ],
    reviews: [
      {
        name: "강순* (본인)",
        meta: "2024.01.12 · 병원 동행",
        content:
          "민석 씨가 접수부터 약 받는 곳까지 차근차근 같이 가줘서 혼자 갈 때보다 훨씬 편했습니다."
      },
      {
        name: "문정* (보호자)",
        meta: "2024.01.05 · 약보기 동행",
        content:
          "중간중간 상황을 알려줘서 멀리 있어도 안심됐습니다. 말투도 차분하고 어머니께 예의 있게 대해주셨어요."
      }
    ]
  },
  "provider-lee": {
    meta: "제주시 노형동 거주 · 3년 경력",
    tags: ["#무거운 짐 옮기기", "#생활 정리", "#장보기 동행", "#체력 지원"],
    matchRate: "92%",
    responseSpeed: "12분 이내",
    reason:
      "제주에서 이사와 생활 정리 아르바이트를 하며 어르신들이 혼자 하기 어려운 힘쓰는 일을 자주 보았습니다. 무리하지 않도록 안전하게 옮기고, 필요한 부분만 깔끔하게 정리해드립니다.",
    histories: [
      {
        icon: "helper-history-box.png",
        title: "무거운 짐 이동 보조",
        body: "쌀, 생수, 소형 가구 이동과 실내 배치 보조",
        rate: "만족도 96%"
      },
      {
        icon: "helper-history-phone.png",
        title: "장보기 동행 및 귀가 확인",
        body: "마트 동행 후 물품 정리와 보호자 완료 알림",
        rate: "만족도 95%"
      }
    ],
    reviews: [
      {
        name: "현복* (본인)",
        meta: "2024.02.03 · 짐 옮기기",
        content:
          "무거운 박스를 조심스럽게 옮겨주고 어디에 둘지도 다시 확인해줘서 믿음이 갔습니다."
      },
      {
        name: "양지* (보호자)",
        meta: "2024.01.28 · 장보기 동행",
        content:
          "아버지가 무거운 장바구니를 들지 않게 잘 챙겨주셨어요. 끝난 뒤 정리된 사진까지 보내줘서 좋았습니다."
      }
    ]
  },
  "provider-park": {
    meta: "서귀포시 대정읍 거주 · 2년 경력",
    tags: ["#행정 서류 보조", "#온라인 예약", "#관공서 동행", "#꼼꼼한 설명"],
    matchRate: "95%",
    responseSpeed: "9분 이내",
    reason:
      "서귀포에서 가족들의 행정 업무와 온라인 예약을 자주 도우며 작은 서류 하나도 어르신께는 큰 부담이 될 수 있다는 것을 느꼈습니다. 필요한 절차를 쉽게 설명하고 끝까지 확인합니다.",
    histories: [
      {
        icon: "helper-history-phone.png",
        title: "온라인 예약 및 민원 안내",
        body: "병원 예약, 관공서 방문 전 준비 서류 확인",
        rate: "만족도 99%"
      },
      {
        icon: "helper-history-box.png",
        title: "행정 서류 정리 보조",
        body: "필요 서류 구분, 접수 순서 안내, 보호자 공유",
        rate: "만족도 98%"
      }
    ],
    reviews: [
      {
        name: "고옥* (본인)",
        meta: "2024.02.14 · 서류 보조",
        content:
          "서윤 씨가 어떤 서류가 필요한지 미리 알려주고 같이 확인해줘서 헷갈리지 않았습니다."
      },
      {
        name: "부현* (보호자)",
        meta: "2024.02.07 · 온라인 예약",
        content:
          "예약 시간과 준비물을 정리해서 보내줘서 가족끼리 다시 확인하기 쉬웠습니다. 설명이 정말 꼼꼼했어요."
      }
    ]
  },
  "provider-choi": {
    meta: "제주시 애월읍 거주 · 1년 6개월 경력",
    tags: ["#산책 동행", "#가벼운 외출", "#말벗", "#제주 길 안내"],
    matchRate: "93%",
    responseSpeed: "11분 이내",
    reason:
      "제주 애월에서 오래 지내며 동네 길과 쉬어가기 좋은 장소를 잘 알고 있습니다. 어르신이 부담 없이 바깥 공기를 쐴 수 있도록 속도를 맞추고, 대화가 편한 동행을 지향합니다.",
    histories: [
      {
        icon: "helper-history-phone.png",
        title: "해안 산책 동행",
        body: "애월 인근 산책로 동행과 휴식 시간 관리",
        rate: "만족도 97%"
      },
      {
        icon: "helper-history-box.png",
        title: "가벼운 외출 보조",
        body: "카페, 시장, 동네 모임 이동과 귀가 확인",
        rate: "만족도 96%"
      }
    ],
    reviews: [
      {
        name: "이춘* (본인)",
        meta: "2024.03.02 · 산책 동행",
        content:
          "하늘 씨가 제 걸음에 맞춰 천천히 걸어주고 중간중간 쉬자고 먼저 말해줘서 편했습니다."
      },
      {
        name: "송민* (보호자)",
        meta: "2024.02.24 · 외출 동행",
        content:
          "어머니가 다녀와서 기분이 좋아 보였어요. 이동 경로와 귀가 시간을 알려줘서 가족도 안심했습니다."
      }
    ]
  }
};

export function GuardianProviderDetail({
  selectedHelper,
  onBackSearch,
  onOpenChat,
  onOpenReview,
  onStartRequest
}: GuardianProviderDetailProps) {
  const [shareMessage, setShareMessage] = useState("");
  const [isReviewExpanded, setIsReviewExpanded] = useState(false);
  const asset = (name: string) => `/figma-assets/${name}`;
  const helperName = selectedHelper?.name && !selectedHelper.name.includes("�") ? selectedHelper.name : "김지연";
  const profileImage = selectedHelper?.imageUrl || asset("helper-detail-profile.png");
  const content = detailContentByHelperId[selectedHelper?.id || "provider-kim"] || detailContentByHelperId["provider-kim"];
  const introVideo =
    selectedHelper?.id === "provider-kim"
      ? asset("helper-intro-jiyeon.mp4")
      : selectedHelper?.id === "provider-minseok"
        ? asset("helper-intro-minseok.mp4")
        : selectedHelper?.id === "provider-lee"
        ? asset("helper-intro-haneul.mp4")
        : selectedHelper?.id === "provider-choi"
          ? asset("helper-intro-sungho.mp4")
          : selectedHelper?.id === "provider-park"
            ? asset("helper-intro-seoyoon.mp4")
          : "";
  const completedCount = `${(selectedHelper?.completedCount || 91).toLocaleString("ko-KR")}건`;
  const rating = (selectedHelper?.rating || 4.9).toFixed(1);
  const reviewCount = selectedHelper?.reviewCount || content.reviews.length;
  const detailReviews = [
    ...content.reviews,
    {
      name: "박정* (보호자)",
      meta: "2024.03.18 · 생활 도움",
      content: `${helperName}님이 약속 시간을 잘 지켜주시고 진행 상황을 차분히 알려주셔서 안심할 수 있었습니다.`
    },
    {
      name: "한복* (본인)",
      meta: "2024.03.09 · 동행 도움",
      content: "말을 천천히 해주고 필요한 내용을 다시 확인해줘서 편하게 도움을 받을 수 있었습니다."
    }
  ];
  const visibleReviews = isReviewExpanded ? detailReviews : detailReviews.slice(0, 2);
  const stats = [
    ["매칭 완료", completedCount, ""],
    ["재매칭 비율", content.matchRate, "is-green"],
    ["평균 별점", rating, "with-star"],
    ["응답 속도", content.responseSpeed, ""]
  ];

  const handleShare = async () => {
    const shareUrl = window.location.href;
    const shareText = `${helperName} 가치이웃 상세 정보\n${content.meta}\n${content.tags.join(" ")}\n${shareUrl}`;

    try {
      if (navigator.share) {
        await navigator.share({
          title: `${helperName} 가치이웃 상세 정보`,
          text: `${content.meta}\n${content.tags.join(" ")}`,
          url: shareUrl
        });
        setShareMessage("공유창을 열었어요.");
      } else {
        await navigator.clipboard.writeText(shareText);
        setShareMessage("공유 내용이 복사됐어요.");
      }
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        return;
      }

      setShareMessage("공유를 다시 시도해주세요.");
    }

    window.setTimeout(() => setShareMessage(""), 1800);
  };

  return (
    <section className="guardian-provider-detail-page" aria-labelledby="provider-detail-title">
      <header className="provider-detail-header">
        <button className="provider-detail-back-button" type="button" onClick={onBackSearch} aria-label="검색으로 돌아가기">
          <svg aria-hidden="true" viewBox="0 0 24 24">
            <path d="M15 18L9 12L15 6" />
          </svg>
        </button>
        <h1 id="provider-detail-title">가치이웃 상세 정보</h1>
        <button type="button" onClick={handleShare} aria-label="공유하기">
          <svg aria-hidden="true" viewBox="0 0 24 24">
            <circle cx="18" cy="5" r="3" />
            <circle cx="6" cy="12" r="3" />
            <circle cx="18" cy="19" r="3" />
            <path d="M8.6 10.7L15.4 6.3" />
            <path d="M8.6 13.3L15.4 17.7" />
          </svg>
        </button>
        {shareMessage && <p className="provider-share-feedback" role="status">{shareMessage}</p>}
      </header>

      <main className="provider-detail-main">
        <section className="provider-detail-hero" aria-label={`${helperName} 프로필`}>
          <div className="detail-profile-image-wrap">
            <img className="detail-profile-image" src={profileImage} alt="" />
            <span className="detail-profile-verified" aria-label="본인확인 완료">
              <img src={asset("helper-blue-check.png")} alt="" aria-hidden="true" />
            </span>
          </div>
          <h2>{helperName}</h2>
          <p>{content.meta}</p>
          <div className="detail-tags" aria-label="제공 가능 서비스">
            {content.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        </section>

        <section className="detail-section detail-trust-section" aria-labelledby="trust-badge-title">
          <h2 id="trust-badge-title">신뢰 인증 뱃지</h2>
          <div className="detail-badge-row">
            {trustBadges.map(([label, icon]) => (
              <div className="detail-badge-item" key={label}>
                <span>
                  <img src={asset(icon)} alt="" aria-hidden="true" />
                </span>
                <strong>{label}</strong>
              </div>
            ))}
          </div>
        </section>

        <section className="detail-stats-grid" aria-label="주요 지표">
          {stats.map(([label, value, modifier]) => (
            <div className={`detail-stat-card ${modifier}`} key={label}>
              <span>{label}</span>
              <strong>
                {value}
                {modifier === "with-star" && <img src={asset("helper-star.png")} alt="" aria-hidden="true" />}
              </strong>
            </div>
          ))}
        </section>

        <section className="detail-section" aria-labelledby="intro-video-title">
          <h2 id="intro-video-title">자기소개 영상</h2>
          <div className="detail-video-card">
            {introVideo ? (
              <video className="detail-intro-video" controls poster={profileImage} preload="metadata">
                <source src={introVideo} type="video/mp4" />
              </video>
            ) : (
              <>
                <img src={asset("helper-video-cover.png")} alt="" />
                <button type="button" aria-label="자기소개 영상 재생">
                  <img src={asset("helper-play.png")} alt="" aria-hidden="true" />
                </button>
              </>
            )}
          </div>
        </section>

        <section className="detail-reason-card" aria-labelledby="reason-title">
          <h2 id="reason-title">도움을 드리는 이유</h2>
          <p>{content.reason}</p>
        </section>

        <section className="detail-section" aria-labelledby="history-title">
          <h2 id="history-title">주요 서비스 이력</h2>
          <div className="detail-history-list">
            {content.histories.map((history) => (
              <article className="detail-history-card" key={history.title}>
                <span>
                  <img src={asset(history.icon)} alt="" aria-hidden="true" />
                </span>
                <div>
                  <strong>{history.title}</strong>
                  <p>{history.body}</p>
                </div>
                <b>{history.rate}</b>
              </article>
            ))}
          </div>
        </section>

        <section className="detail-section detail-review-section" aria-labelledby="review-title">
          <div className="detail-section-title-row">
            <h2 id="review-title">이용자 후기 <span>({reviewCount})</span></h2>
            <div className="detail-review-actions">
              <button type="button" onClick={() => setIsReviewExpanded((current) => !current)}>
                {isReviewExpanded ? "접기" : "전체보기"}
              </button>
              <button type="button" onClick={onOpenReview}>후기 쓰기</button>
            </div>
          </div>
          {visibleReviews.map((review, index) => (
            <article className="detail-review-card" key={review.name}>
              <div className="detail-review-head">
                <div className="detail-review-user">
                  <span aria-hidden="true">
                    <img src={asset("helper-review-user.png")} alt="" aria-hidden="true" />
                  </span>
                  <div>
                    <strong>{review.name}</strong>
                    <small>{review.meta}</small>
                  </div>
                </div>
                <div className="detail-stars" aria-label="별점 5점">
                  {Array.from({ length: 5 }).map((_, starIndex) => (
                    <img src={asset("helper-star.png")} alt="" aria-hidden="true" key={starIndex} />
                  ))}
                </div>
              </div>
              <p>"{review.content}"</p>
              {index === 0 && <img className="detail-review-photo" src={asset("helper-review-photo.png")} alt="" />}
            </article>
          ))}
        </section>
      </main>

      <footer className="provider-detail-footer">
        <button className="provider-detail-chat" type="button" onClick={onOpenChat} aria-label="채팅하기">
          <img src={asset("helper-chat-icon.png")} alt="" aria-hidden="true" />
        </button>
        <button className="provider-detail-request" type="button" onClick={onStartRequest}>
          도움 요청하기
          <img src={asset("helper-arrow-right.png")} alt="" aria-hidden="true" />
        </button>
      </footer>
    </section>
  );
}
