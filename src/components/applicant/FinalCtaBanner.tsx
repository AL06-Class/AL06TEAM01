type FinalCtaBannerProps = {
  onStartRequest: () => void;
};

export function FinalCtaBanner({ onStartRequest }: FinalCtaBannerProps) {
  return (
    <section className="final-cta-section" aria-labelledby="final-cta-title">
      <div className="final-cta-inner">
        <h2 id="final-cta-title">
          지금, 부모님께 필요한 돌봄을
          <br />
          가까운 이웃에게 요청하세요
        </h2>
        <p>신원 확인을 마친 이웃 도우미와, 오늘 바로 연결됩니다.</p>
        <button type="button" onClick={onStartRequest}>
          돌봄 신청하기
        </button>
      </div>
    </section>
  );
}
