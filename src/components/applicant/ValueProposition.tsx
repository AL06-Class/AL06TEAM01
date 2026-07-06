const checklistItems = [
  "신원·자격을 확인한 이웃 도우미만 추천",
  "방문 중 실시간 리포트로 하루를 함께 확인",
  "건별·구독 중 상황에 맞는 결제 방식 선택"
];

export function ValueProposition() {
  return (
    <section className="value-section" id="service" aria-labelledby="value-proposition-title">
      <div className="value-grid">
        <div className="value-visual">
          <svg
            viewBox="0 0 520 420"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label="부모님이 멀리 있는 가족과 연결된 따뜻한 일상 일러스트"
          >
            <rect x="18" y="44" width="484" height="322" rx="64" fill="#eaf4ee" />
            <circle cx="66" cy="96" r="24" fill="#dcefe1" />
            <ellipse cx="270" cy="352" rx="150" ry="16" fill="#000000" opacity="0.05" />
            <g>
              <path d="M424 356 h40 l-6 40 h-28 z" fill="#d98b6a" />
              <path d="M444 356 q6 -42 28 -52" stroke="#5aa877" strokeWidth="6" fill="none" strokeLinecap="round" />
              <path d="M444 356 q-8 -40 -30 -48" stroke="#5aa877" strokeWidth="6" fill="none" strokeLinecap="round" />
              <ellipse cx="410" cy="300" rx="19" ry="11" fill="#6bbf8f" transform="rotate(34 410 300)" />
              <ellipse cx="478" cy="298" rx="19" ry="11" fill="#7cc99d" transform="rotate(-32 478 298)" />
            </g>
            <rect x="150" y="176" width="230" height="84" rx="24" fill="#8ccaa4" />
            <rect x="120" y="212" width="52" height="128" rx="22" fill="#7cc39a" />
            <rect x="358" y="212" width="52" height="128" rx="22" fill="#7cc39a" />
            <rect x="140" y="252" width="250" height="92" rx="24" fill="#9bd0b0" />
            <g>
              <path d="M226 250 q44 -18 88 0 l6 66 q-50 16 -100 0 z" fill="#e6b84f" />
              <path d="M266 246 l9 20 l9 -20 z" fill="#ffffff" />
              <rect x="266" y="228" width="18" height="20" rx="8" fill="#f0c19c" />
              <circle cx="275" cy="200" r="37" fill="#f4caa3" />
              <circle cx="239" cy="204" r="7" fill="#f0c19c" />
              <circle cx="311" cy="204" r="7" fill="#f0c19c" />
              <path
                d="M240 194 q-3 -46 35 -48 q40 2 36 48 q-9 -22 -36 -22 q-27 0 -35 22 z"
                fill="#d9b7a0"
              />
              <circle cx="262" cy="200" r="12" fill="#ffffff" stroke="#54606b" strokeWidth="3" />
              <circle cx="288" cy="200" r="12" fill="#ffffff" stroke="#54606b" strokeWidth="3" />
              <line x1="274" y1="200" x2="276" y2="200" stroke="#54606b" strokeWidth="3" />
              <path d="M257 200 q5 5 10 0" stroke="#3a3f45" strokeWidth="3" fill="none" strokeLinecap="round" />
              <path d="M283 200 q5 5 10 0" stroke="#3a3f45" strokeWidth="3" fill="none" strokeLinecap="round" />
              <circle cx="252" cy="214" r="6" fill="#f2a7a0" />
              <circle cx="298" cy="214" r="6" fill="#f2a7a0" />
              <path d="M263 221 q12 12 24 0" stroke="#c86f66" strokeWidth="3" fill="none" strokeLinecap="round" />
              <path d="M312 268 q26 2 40 -14" stroke="#e6b84f" strokeWidth="20" fill="none" strokeLinecap="round" />
              <g transform="rotate(18 356 250)">
                <rect x="344" y="230" width="26" height="44" rx="6" fill="#39424a" />
                <rect x="348" y="236" width="18" height="32" rx="3" fill="#cfeae0" />
              </g>
            </g>
            <g>
              <rect x="352" y="98" width="112" height="70" rx="20" fill="#ffffff" stroke="#cfe3d6" strokeWidth="2" />
              <path d="M372 168 l-4 20 l22 -14 z" fill="#ffffff" stroke="#cfe3d6" strokeWidth="2" />
              <path
                transform="translate(371,116) scale(1.05)"
                d="M12 20 C6 15 0 11 0 6 C0 2.7 2.7 0 6 0 C8.2 0 10.4 1.4 12 3.7 C13.6 1.4 15.8 0 18 0 C21.3 0 24 2.7 24 6 C24 11 18 15 12 20 Z"
                fill="#ef958d"
              />
              <text
                x="404"
                y="140"
                fontFamily="-apple-system,'Apple SD Gothic Neo',sans-serif"
                fontSize="19"
                fontWeight="700"
                fill="#2c8b53"
              >
                가족
              </text>
            </g>
          </svg>
        </div>

        <div className="value-copy">
          <p className="eyebrow">왜 이음케어일까요</p>
          <h2 id="value-proposition-title">
            낯선 걱정 없이,
            <br />
            신뢰로 시작하는 돌봄
          </h2>
          <p>
            멀리 사는 자녀의 미안함과, 낯선 사람에 대한 부모님의 경계심. 이음케어는 검증된 이웃 도우미와
            투명한 기록으로 그 사이의 거리를 좁힙니다.
          </p>
          <ul className="value-checklist">
            {checklistItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
