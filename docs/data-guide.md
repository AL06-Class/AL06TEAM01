# 데이터 가이드

더미 데이터와 DB 연결 기준을 정리하는 문서입니다.

## 목적

- 역할별 화면이 같은 데이터 기준을 사용하게 합니다.
- 더미 데이터와 실제 DB 구조가 크게 달라지지 않게 합니다.
- AI가 화면마다 임의의 데이터 구조를 만들지 않게 합니다.
- 가치이음의 신뢰 기반 연결 서비스 구조가 화면과 데이터에 일관되게 반영되게 합니다.

## 기본값

### 핵심 전제

- 현재 선택된 유저의 `role`을 기준으로 화면을 분기합니다.
- 데이터는 역할별 화면에서 필요한 정보만 필터링해서 보여줍니다.
- 가치이음은 운영자가 도움 제공자를 배정하는 서비스가 아니라, 보호자 또는 신청자가 객관적 정보를 보고 직접 선택하는 연결 서비스입니다.
- 민감 정보, 서비스 대상자 동의, 완료 인증 자료는 필요한 범위에서만 수집하고 노출합니다.

### 역할 기준

역할 값은 아래를 기본으로 합니다.

- `guardian`: 신청자를 대신해 요청, 결제, 확인을 진행하는 보호자 또는 대리인
- `requester`: 실제로 도움을 받는 신청자 또는 서비스 대상자
- `helper`: 도움을 제공하는 가치 제공자
- `operator`: 신고, 검수, 분쟁, 안전 정책을 관리하는 운영자

역할 이름을 바꾸거나 새 역할을 추가하려면 먼저 팀 논의가 필요합니다.

### 데이터 작성 기준

- 필드명은 영어 `camelCase`를 사용합니다.
- 각 데이터에는 가능하면 `id`, `createdAt`, `updatedAt`을 포함합니다.
- 날짜는 문자열 또는 Firebase Timestamp 중 하나로 통일합니다.
- 상태값은 자유 텍스트가 아니라 정해진 값만 사용합니다.
- 화면별로 같은 의미의 필드를 다른 이름으로 만들지 않습니다.
- 법적 오해를 줄이기 위해 `assigned`, `dispatch`, `medicalCare`, `nursingCare`처럼 배정, 파견, 의료, 요양을 암시하는 이름은 사용하지 않습니다.

### 공통 이름 사전 운영

- DB를 처음부터 완성하지 않고, 공통으로 부를 이름만 먼저 맞춥니다.
- 새 컬렉션, 필드, 상태값, 역할 값이 필요하면 구현 전에 이 문서에 먼저 추가합니다.
- 기존 이름과 의미가 같으면 새 이름을 만들지 않습니다.
- 기능별 임시 더미 데이터는 최소로 만들고, 공통 이름은 이 문서의 사전을 따릅니다.
- 아직 확정되지 않은 이름은 초안으로 표시하고, 실제 구현이 반복되면 최종 결정에 반영합니다.

### 더미 데이터

- 더미 데이터는 기능 검증에 필요한 최소만 만듭니다.
- 화면만 맞추기 위한 임시 필드는 나중에 제거 여부를 표시합니다.
- Firebase 연결 전에도 더미 데이터만으로 역할별 화면을 확인할 수 있어야 합니다.

### DB 연결 기준

- DB 구조가 정해지기 전에는 화면 컴포넌트와 데이터 접근 코드를 분리합니다.
- Firebase 연결 코드는 한 곳에서 관리합니다.
- 화면 컴포넌트는 가능한 한 데이터 형태에만 의존하게 만듭니다.

## 논의할 항목

- 주요 데이터 종류
- 컬렉션 이름
- 유저와 역할 구조
- 문서 id 생성 방식
- 필수 필드와 선택 필드
- 날짜 저장 방식
- 상태값 목록
- 더미 데이터 위치
- 화면별 필요한 데이터
- 실제 Firebase 구조와 더미 데이터 구조를 언제 맞출지
- 공통 이름 사전에 새 이름을 추가하는 승인 기준

## 공통 이름 사전

아래 이름은 기능 개발 중 같은 의미를 다르게 부르지 않기 위한 출발점입니다. 실제 DB 구조 확정은 별도 논의로 진행합니다.

### 컬렉션 이름

- `users`: 유저
- `guardianProfiles`: 보호자 또는 대리인 프로필
- `requesterProfiles`: 도움을 받는 신청자 프로필
- `helperProfiles`: 가치 제공자 신뢰 프로필
- `serviceRequests`: 도움 요청
- `requestMatches`: 요청과 가치 제공자 선택 또는 수락 상태
- `conversations`: 요청 관련 대화방
- `messages`: 대화 메시지
- `payments`: 결제와 정산 기록
- `serviceCompletions`: 완료 확인 기록
- `reviews`: 후기
- `reports`: 신고와 분쟁 접수
- `consentRecords`: 신청자 동의와 민감 정보 제공 동의 기록

### 공통 필드 이름

- `id`: 문서 또는 항목 식별자
- `userId`: 유저 식별자
- `guardianId`: 보호자 또는 대리인 식별자
- `requesterId`: 도움을 받는 신청자 식별자
- `helperId`: 가치 제공자 식별자
- `operatorId`: 운영자 식별자
- `requestId`: 도움 요청 식별자
- `matchId`: 요청과 가치 제공자 선택 또는 수락 상태 식별자
- `conversationId`: 대화방 식별자
- `messageId`: 메시지 식별자
- `paymentId`: 결제 식별자
- `reviewId`: 후기 식별자
- `reportId`: 신고 또는 분쟁 식별자
- `consentRecordId`: 동의 기록 식별자
- `role`: 유저 역할
- `status`: 상태값
- `title`: 제목
- `description`: 설명
- `category`: 도움 유형
- `location`: 도움 장소
- `scheduledAt`: 약속 시각
- `startedAt`: 시작 시각
- `endedAt`: 종료 시각
- `createdAt`: 생성 시각
- `updatedAt`: 수정 시각

### 역할 값

- `guardian`: 보호자 또는 대리인
- `requester`: 도움을 받는 신청자
- `helper`: 가치 제공자
- `operator`: 운영자

### 상태값 초안

- `draft`: 초안
- `submitted`: 제출됨
- `pending`: 대기 중
- `available`: 선택 가능
- `selected`: 선택됨
- `proposed`: 제안됨
- `accepted`: 수락됨
- `declined`: 거절됨
- `confirmed`: 확정됨
- `scheduled`: 일정 확정
- `inProgress`: 진행 중
- `completed`: 완료
- `cancelled`: 취소됨
- `reported`: 신고됨
- `refunded`: 환불됨

### 동의와 안전 관련 필드 이름

- `consentStatus`: 동의 상태
- `consentedAt`: 동의 시각
- `consentScope`: 동의 범위
- `sensitiveInfoScope`: 민감 정보 제공 범위
- `verificationStatus`: 인증 상태
- `trustBadges`: 신뢰 배지 목록
- `introVideoUrl`: 자기소개 영상 URL
- `reviewCount`: 후기 수
- `averageRating`: 평균 평점
- `completionProofStatus`: 완료 인증 상태
- `reportReason`: 신고 사유

## 데이터 모델 초안

아래는 논의 출발점입니다. 실제 서비스 기획과 Firebase 구조에 맞게 수정합니다.

### users

- `id`
- `name`
- `role`
- `phone`
- `profileImageUrl`
- `createdAt`
- `updatedAt`

### guardianProfiles

- `id`
- `userId`
- `requesterIds`
- `relationship`
- `createdAt`
- `updatedAt`

### requesterProfiles

- `id`
- `userId`
- `guardianId`
- `name`
- `ageGroup`
- `location`
- `consentStatus`
- `sensitiveInfoScope`
- `createdAt`
- `updatedAt`

### helperProfiles

- `id`
- `userId`
- `name`
- `profileImageUrl`
- `introVideoUrl`
- `description`
- `serviceCategories`
- `serviceAreas`
- `verificationStatus`
- `trustBadges`
- `reviewCount`
- `averageRating`
- `createdAt`
- `updatedAt`

### serviceRequests

- `id`
- `guardianId`
- `requesterId`
- `category`
- `title`
- `description`
- `location`
- `scheduledAt`
- `status`
- `createdAt`
- `updatedAt`

### requestMatches

- `id`
- `requestId`
- `helperId`
- `status`
- `proposedAt`
- `acceptedAt`
- `confirmedAt`
- `createdAt`
- `updatedAt`

### conversations

- `id`
- `requestId`
- `guardianId`
- `helperId`
- `status`
- `createdAt`
- `updatedAt`

### messages

- `id`
- `conversationId`
- `senderId`
- `senderRole`: `guardian`, `requester`, `helper`, `operator` 중 하나
- `message`
- `createdAt`
- `updatedAt`

### payments

- `id`
- `requestId`
- `guardianId`
- `helperId`
- `status`
- `amount`
- `createdAt`
- `updatedAt`

### serviceCompletions

- `id`
- `requestId`
- `helperId`
- `guardianId`
- `completionProofStatus`
- `completedAt`
- `createdAt`
- `updatedAt`

### reviews

- `id`
- `requestId`
- `guardianId`
- `helperId`
- `score`
- `comment`
- `createdAt`
- `updatedAt`

### reports

- `id`
- `requestId`
- `reporterId`
- `reportReason`
- `status`
- `createdAt`
- `updatedAt`

### consentRecords

- `id`
- `requesterId`
- `guardianId`
- `consentStatus`
- `consentScope`
- `sensitiveInfoScope`
- `consentedAt`
- `createdAt`
- `updatedAt`

## 최종 결정

- 주요 컬렉션: 가치이음 MVP 기준의 `users`, `guardianProfiles`, `requesterProfiles`, `helperProfiles`, `serviceRequests`, `requestMatches`, `conversations`, `messages`, `payments`, `serviceCompletions`, `reviews`, `reports`, `consentRecords`
- 역할 기준: `guardian`, `requester`, `helper`, `operator`
- 필드명 규칙: 영어 `camelCase`
- 날짜 저장 방식: 문자열 또는 Firebase Timestamp 중 하나로 통일
- 상태값 기준: 자유 텍스트가 아니라 정해진 값만 사용
- 더미 데이터 기준: 기능 검증에 필요한 최소만 작성
- DB 연결 기준: 화면 컴포넌트와 데이터 접근 코드를 분리하고 Firebase 연결 코드는 한 곳에서 관리
- 공통 이름 사전 기준: 새 컬렉션, 필드, 상태값, 역할 값은 구현 전에 이 문서에 먼저 추가
- 표현 기준: 운영자 배정, 의료·요양 제공, 파견을 암시하는 데이터 이름은 사용하지 않음
- 메시지 발신 역할 기준: `senderRole`은 공통 역할 값인 `guardian`, `requester`, `helper`, `operator`를 사용

## 변경 이력

- 2026-05-29: SPA와 역할 기반 데이터 기준 반영
- 2026-05-29: 기본 데이터 기준을 최종 결정에 반영
- 2026-05-29: 공통 이름 사전과 데이터 이름 추가 절차 반영
- 2026-05-29: 일정 조율, 면접 질문 생성, 평가 과업에 필요한 공통 이름 보강
- 2026-07-21: 가치이음 PRD 기준에 맞춰 역할, 컬렉션, 필드, 상태값 기준을 보호자·신청자·가치 제공자·운영자 구조로 정리
- 2026-07-22: 메시지 발신 역할 값 기준을 `senderRole` 항목에 명시
