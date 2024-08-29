import React, { useEffect, useState, useCallback } from "react";
import styled from "styled-components";

const ModalOverlay = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  background-color: rgba(0, 0, 0, 0.8);
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  width: 90%;
  max-height: 90vh;
  display: flex;
  background-color: white;
  border-radius: 10px;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
`;

const ModalContentTop = styled.div`
  width: 100%;
  height: 70%;
`;

const ModalContentBottom = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-around;
  padding: 20px;
  
  & > span {
    margin-top: 10px;
  }
`;

const StyledHr = styled.hr`
  width: 100%;
  border: 1px solid gray;
  margin: 20px 0;
`;

const ButtonArea = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
`;

const StyledButton = styled.button`
  width: 48%;
  height: 40px;
  border: none;
  border-radius: 5px;
  background-color: lightsalmon;
  font-size: 15px;
  font-weight: bold;
  color: black;
  cursor: pointer;
`;

const ShareButton = styled.button`
  background-color: #FEE500;
  color: #000000;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
`;

const DetailModal = ({ performance, onClose }) => {
  const [isKakaoInitialized, setIsKakaoInitialized] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://developers.kakao.com/sdk/js/kakao.js';
    script.async = true;
    script.onload = () => {
      if (window.Kakao) {
        if (!window.Kakao.isInitialized()) {
          window.Kakao.init('ed218e43e083f32fc9b2e645cbee237d');
        }
        setIsKakaoInitialized(true);
      }
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleClick = useCallback(() => {
    if (performance?.relates?.[0]?.relate?.[0]?.relateurl?.[0]) {
      window.open(performance.relates[0].relate[0].relateurl[0], '_blank');
    } else {
      console.error('Invalid performance data structure for ticket URL');
      alert('예매 링크를 찾을 수 없습니다.');
    }
  }, [performance]);

  const handleShare = useCallback(() => {
    if (!isKakaoInitialized) {
      console.error('Kakao SDK is not initialized');
      alert('카카오톡 공유 기능을 초기화하는 중입니다. 잠시 후 다시 시도해주세요.');
      return;
    }

    if (!window.Kakao || !window.Kakao.Link) {
      console.error('Kakao SDK is not available');
      alert('카카오톡 공유 기능을 사용할 수 없습니다. 잠시 후 다시 시도해주세요.');
      return;
    }

    const shareUrl = performance?.relates?.[0]?.relate?.[0]?.relateurl?.[0] || window.location.href;

    try {
      window.Kakao.Link.sendDefault({
        objectType: 'text',
        text: '공연 정보를 확인해보세요!',
        link: {
          mobileWebUrl: shareUrl,
          webUrl: shareUrl,
        },
      });
    } catch (error) {
      console.error('Failed to share via Kakao:', error);
      alert('카카오톡 공유에 실패했습니다. 잠시 후 다시 시도해주세요.');
    }
  }, [isKakaoInitialized, performance]);

  if (!performance) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalContentTop>
          {performance.poster && (
            <img src={performance.poster} style={{ width: "100%", height: "100%", objectFit: "cover" }} alt="Performance Poster" />
          )}
        </ModalContentTop>
        <ModalContentBottom>
          <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent:"space-between", alignItems: "center"}}>
            <h2 style={{ textAlign: "center", margin: 0 }}>{performance.prfnm || '제목 없음'}</h2>
            <ShareButton onClick={handleShare}>카카오톡 공유</ShareButton>
          </div>
          <StyledHr />

          {[
            { label: "장르", value: performance.genrenm },
            { label: "장소", value: performance.fcltynm },
            { label: "예매가격", value: performance.pcseguidance },
            { label: "상영시간", value: `${performance.dtguidance || ''} ${performance.prfruntime || ''}` },
            { label: "날짜", value: performance.prfpdfrom && performance.prfpdto ? `${performance.prfpdfrom} ~ ${performance.prfpdto}` : '날짜 정보 없음' },
            { label: "출현진", value: performance.prfcast },
            { label: "제작진", value: performance.prfcrew }
          ].map(({ label, value }) => (
            <React.Fragment key={label}>
              <span style={{ color: "gray", fontWeight: "bold" }}>{label}</span>
              <span>{value || '정보 없음'}</span>
            </React.Fragment>
          ))}

          <ButtonArea>
            <StyledButton onClick={onClose}>닫기</StyledButton>
            <StyledButton onClick={handleClick} style={{ backgroundColor: "lightgray" }}>
              예매하기
            </StyledButton>
          </ButtonArea>
        </ModalContentBottom>
      </ModalContent>
    </ModalOverlay>
  );
};

export default DetailModal;