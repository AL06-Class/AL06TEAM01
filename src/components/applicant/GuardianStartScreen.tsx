import { useState } from "react";

type AgreementKey = "service" | "privacy" | "safety" | "payment";

type AgreementDetail = {
  title: string;
  summary: string;
  sections: {
    heading: string;
    items: string[];
  }[];
  notice: string;
};

const agreementItems: { key: AgreementKey; label: string; summary: string }[] = [
  {
    key: "service",
    label: "[필수] 서비스 이용 동의",
    summary: "가치이음의 생활지원 연결 서비스 이용 조건을 확인해요."
  },
  {
    key: "privacy",
    label: "[필수] 개인정보 제공 동의",
    summary: "매칭과 안전관리에 필요한 개인정보 처리 내용을 확인해요."
  },
  {
    key: "safety",
    label: "[필수] 안전수칙 동의",
    summary: "서비스 가능 범위와 금지되는 요청을 확인해요."
  },
  {
    key: "payment",
    label: "[필수] 결제/취소/환불 정책 동의",
    summary: "비용, 취소, 환불, 노쇼 기준을 확인해요."
  }
];

const agreementDetails: Record<AgreementKey, AgreementDetail> = {
  service: {
    title: "서비스 이용 동의",
    summary:
      "가치이음은 보호자와 부모님이 필요한 생활 도움을 신뢰할 수 있는 가치이웃에게 요청할 수 있도록 연결하는 서비스예요.",
    sections: [
      {
        heading: "서비스 성격",
        items: [
          "가치이음은 병원 동행, 장보기 동행, 말벗, 스마트폰·키오스크 보조 등 일상 생활지원 연결을 제공해요.",
          "가치이음은 의료, 간병, 요양, 택시·운송, 법률·금융 대리 서비스를 직접 제공하지 않아요.",
          "가치제공자는 플랫폼이 정한 인증과 확인 절차를 거친 뒤 활동하며, 요청 내용과 일정에 따라 수락 여부를 결정할 수 있어요."
        ]
      },
      {
        heading: "보호자와 부모님의 확인",
        items: [
          "보호자는 부모님 또는 실제 도움을 받는 분의 동의를 받은 뒤 정보를 입력해야 해요.",
          "요청 내용, 방문 주소, 연락처, 건강·생활 유의사항은 정확하게 입력해야 해요.",
          "입력한 정보가 사실과 다르거나 서비스 범위를 벗어나면 매칭이 취소되거나 이용이 제한될 수 있어요."
        ]
      }
    ],
    notice: "위 내용을 확인했고 가치이음 서비스 이용 조건에 동의해요."
  },
  privacy: {
    title: "개인정보 제공 동의",
    summary:
      "가치이음은 매칭, 일정 진행, 안전관리, 결제와 고객지원을 위해 필요한 최소한의 개인정보만 사용해요.",
    sections: [
      {
        heading: "수집·이용하는 정보",
        items: [
          "보호자 정보: 이름, 연락처, 부모님과의 관계, 거주 지역, 서비스 이용 내역을 수집해요.",
          "부모님 정보: 이름, 나이, 주소, 필요한 도움, 생활 유의사항, 선택한 프로필 사진을 수집해요.",
          "요청 정보: 도움 종류, 방문 날짜와 시간, 방문 위치, 채팅 내용, 완료 확인, 후기 내용을 수집해요."
        ]
      },
      {
        heading: "정보 제공 범위",
        items: [
          "매칭이 확정된 가치제공자에게는 방문 수행에 필요한 이름, 주소, 요청 내용, 유의사항만 제공해요.",
          "건강정보와 이동 관련 유의사항은 부모님 또는 실제 도움을 받는 분의 별도 동의가 필요한 정보로 다뤄요.",
          "개인정보는 서비스 운영과 분쟁 대응에 필요한 기간 동안 보관하고, 목적이 끝나면 관련 기준에 따라 파기해요."
        ]
      }
    ],
    notice: "위 내용을 확인했고 개인정보 수집·이용 및 필요한 범위의 제공에 동의해요."
  },
  safety: {
    title: "안전수칙 동의",
    summary:
      "가치이음은 부모님과 가치제공자 모두가 안전하게 만날 수 있도록 가능한 도움과 금지되는 도움을 구분해요.",
    sections: [
      {
        heading: "요청할 수 있는 도움",
        items: [
          "독립 보행이 가능한 분의 병원 일정 동행, 장보기 동행, 산책 동행, 말벗을 요청할 수 있어요.",
          "스마트폰 사용, 키오스크 사용처럼 설명과 작동 보조가 필요한 도움을 요청할 수 있어요.",
          "진료실 동석이나 의료진 설명 메모는 부모님 본인의 명확한 동의가 있을 때만 가능해요."
        ]
      },
      {
        heading: "요청할 수 없는 도움",
        items: [
          "의료 판단, 약 복용 지도, 주사·처치, 간병, 요양, 신체 이동 보조, 목욕·배변 보조는 요청할 수 없어요.",
          "치매 증상, 중증 거동 불편, 낙상 위험 등 전문 돌봄이 필요한 경우에는 가치이음 서비스 대상이 아니에요.",
          "비밀번호 입력, 금융 인증, 현금 인출, 대리서명, 법적 판단처럼 개인정보·재산권 위험이 있는 요청은 할 수 없어요."
        ]
      },
      {
        heading: "문제 상황 대응",
        items: [
          "위급 상황이 발생하면 즉시 119 또는 보호자에게 연락하고, 앱을 통해 가치이음에도 알려야 해요.",
          "요청 범위를 벗어난 부탁이나 안전 문제가 있으면 가치제공자는 수행을 중단하고 신고할 수 있어요."
        ]
      }
    ],
    notice: "위 내용을 확인했고 안전수칙과 서비스 제한 범위에 동의해요."
  },
  payment: {
    title: "결제/취소/환불 정책 동의",
    summary:
      "가치이음은 요청 전 비용과 취소 기준을 안내하고, 완료 확인 후 결제와 환불 절차를 진행해요.",
    sections: [
      {
        heading: "결제 기준",
        items: [
          "서비스 비용은 가치제공자의 시간당 비용, 방문 시간, 요청 내용에 따라 안내돼요.",
          "MVP에서는 도움 완료 확인 후 결제 화면으로 이동하며, 유료 운영 시에는 사전 결제 또는 결제 보류 방식이 적용될 수 있어요.",
          "추가 시간이나 추가 요청이 발생하면 보호자와 가치제공자가 채팅으로 확인한 뒤 반영돼요."
        ]
      },
      {
        heading: "취소와 환불",
        items: [
          "가치제공자가 요청을 수락하기 전에는 부담 없이 취소할 수 있어요.",
          "일정이 확정된 뒤 임박 취소하거나 약속 장소에 나타나지 않으면 운영 기준에 따라 취소 비용이 발생할 수 있어요.",
          "가치제공자의 노쇼, 사전 합의 없는 취소, 서비스 미수행이 확인되면 결제 보류, 환불, 재매칭을 요청할 수 있어요."
        ]
      },
      {
        heading: "분쟁 처리",
        items: [
          "서비스 내용, 완료 여부, 비용에 이견이 있으면 가치이음 고객지원에 문의할 수 있어요.",
          "분쟁이 접수되면 결제 또는 정산이 일시 보류될 수 있고, 채팅 내역과 완료 확인 자료를 바탕으로 검토해요."
        ]
      }
    ],
    notice: "위 내용을 확인했고 결제, 취소, 환불, 노쇼 기준에 동의해요."
  }
};

type GuardianStartScreenProps = {
  onStartGuardian: () => void;
  onStartProvider: () => void;
};

export function GuardianStartScreen({ onStartGuardian, onStartProvider }: GuardianStartScreenProps) {
  const asset = (name: string) => `/figma-assets/${name}`;
  const [agreements, setAgreements] = useState<Record<AgreementKey, boolean>>({
    service: false,
    privacy: false,
    safety: false,
    payment: false
  });
  const [activeAgreement, setActiveAgreement] = useState<AgreementKey | null>(null);
  const isAllAgreed = Object.values(agreements).every(Boolean);
  const activeAgreementDetail = activeAgreement ? agreementDetails[activeAgreement] : null;

  const toggleAgreement = (key: AgreementKey) => {
    setAgreements((current) => ({ ...current, [key]: !current[key] }));
  };

  const agreeCurrentDetail = () => {
    if (!activeAgreement) {
      return;
    }

    setAgreements((current) => ({ ...current, [activeAgreement]: true }));
    setActiveAgreement(null);
  };

  const toggleAllAgreements = () => {
    const nextValue = !isAllAgreed;
    setAgreements({
      service: nextValue,
      privacy: nextValue,
      safety: nextValue,
      payment: nextValue
    });
  };

  const startService = () => {
    if (isAllAgreed) {
      onStartGuardian();
    }
  };

  return (
    <section className="guardian-start" aria-labelledby="guardian-start-title">
      <header className="start-top-header">
        <div>
          <img src={asset("gachi-logo-icon.png")} alt="" aria-hidden="true" />
          <strong>가치이음</strong>
        </div>
      </header>

      <main className="start-screen-main start-intro-main">
        <section className="start-intro-hero" aria-labelledby="guardian-start-title">
          <h1 id="guardian-start-title">
            부모님을 위해 믿을 수 있는 도움을 연결해드려요
          </h1>
          <p>병원 동행, 장보기, 스마트폰 도움 등 필요한 순간 가까운 가치이웃에게 요청할 수 있어요.</p>
          <img src={asset("start-care-cafe.png")} alt="" aria-hidden="true" />
        </section>

        <section className="start-guide-section" aria-labelledby="start-guide-title">
          <h2 id="start-guide-title">서비스 이용 방법</h2>
          <ol>
            {[
              ["부모님 정보 등록", "도움이 필요한 부모님의 기본 정보를 입력해주세요."],
              ["필요한 도움 요청", "어떤 도움이 필요하신지 구체적으로 선택해주세요."],
              ["가치이웃 선택", "신원 확인이 완료된 믿을 수 있는 이웃을 선택하세요."],
              ["일정 확인 후 도움 받기", "매칭이 완료되면 정해진 시간에 안심하고 도움을 받습니다."]
            ].map(([title, description], index) => (
              <li key={title}>
                <span>{index + 1}</span>
                <div>
                  <strong>{title}</strong>
                  <p>{description}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="start-trust-section" aria-label="안심 인증 안내">
          {[
            ["start-trust-id.svg", "신원 검증 완료", "모든 이웃은 철저한 신원 확인을 거칩니다."],
            ["start-trust-record.svg", "범죄 이력 조회", "안전한 연결을 위한 필수 과정입니다."],
            ["start-trust-insurance.svg", "안심 보험 적용", "서비스 중 발생할 수 있는 사고에 대비합니다."]
          ].map(([icon, title, description]) => (
            <article key={title}>
              <img src={asset(icon)} alt="" aria-hidden="true" />
              <strong>{title}</strong>
              <p>{description}</p>
            </article>
          ))}
        </section>

        <section className="start-agreement-card" aria-labelledby="start-agreement-title">
          <label className="start-agreement-all">
            <input type="checkbox" checked={isAllAgreed} onChange={toggleAllAgreements} />
            <strong id="start-agreement-title">약관 전체 동의하기</strong>
          </label>
          <div>
            {agreementItems.map(({ key, label, summary }) => (
              <div className="start-agreement-item" key={key}>
                <label>
                  <input
                    type="checkbox"
                    checked={agreements[key]}
                    onChange={() => toggleAgreement(key)}
                  />
                  <span>
                    <strong>{label}</strong>
                    <small>{summary}</small>
                  </span>
                </label>
                <button
                  type="button"
                  aria-label={`${label} 내용 보기`}
                  onClick={() => setActiveAgreement(key)}
                >
                  <img src={asset("start-agreement-chevron.svg")} alt="" aria-hidden="true" />
                </button>
              </div>
            ))}
          </div>
        </section>

        <button className="start-provider-link" type="button" onClick={onStartProvider}>
          가치제공자로 시작하기
        </button>
      </main>

      <footer className="start-fixed-footer">
        <button className={isAllAgreed ? "is-active" : ""} type="button" onClick={startService}>
          시작하기
        </button>
      </footer>

      {activeAgreementDetail ? (
        <div className="start-terms-backdrop" role="presentation" onClick={() => setActiveAgreement(null)}>
          <section
            className="start-terms-sheet"
            role="dialog"
            aria-modal="true"
            aria-labelledby="start-terms-title"
            onClick={(event) => event.stopPropagation()}
          >
            <header className="start-terms-head">
              <div>
                <small>필수 동의</small>
                <h2 id="start-terms-title">{activeAgreementDetail.title}</h2>
              </div>
              <button type="button" aria-label="약관 닫기" onClick={() => setActiveAgreement(null)}>
                ×
              </button>
            </header>
            <p className="start-terms-summary">{activeAgreementDetail.summary}</p>
            <div className="start-terms-content">
              {activeAgreementDetail.sections.map((section) => (
                <article key={section.heading}>
                  <h3>{section.heading}</h3>
                  <ul>
                    {section.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
            <p className="start-terms-notice">{activeAgreementDetail.notice}</p>
            <button className="start-terms-agree" type="button" onClick={agreeCurrentDetail}>
              확인하고 동의하기
            </button>
          </section>
        </div>
      ) : null}
    </section>
  );
}
