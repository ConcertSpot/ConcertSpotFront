import React, { useEffect } from "react";
import styled from "styled-components";

// 카카오 SDK 초기화
const KakaoAppKey = "ed218e43e083f32fc9b2e645cbee237d";  // 여기에 실제 카카오 앱 키를 입력하세요.

const ModalOverlay = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  top: 0;
  background-color: rgba(0, 0, 0, 0.8);
  justify-content: center;
  align-items: center;
  overflow-y: scroll;
  z-index: 1000;
`;

const ModalContent = styled.div`
  width: 90%;
  height: 90dvh;
  display: flex;
  background-color: white;
  border-radius: 10px;
  flex-direction: column;
  align-items: center;
  overflow-y: scroll;
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
  padding: 10px;
  span {
    margin-top: 30px;
  }
`;

const StyledHr = styled.hr`
  width: 100%;
  border: 1px solid gray;
  margin-top: 20px;
`;

const ButtonArea = styled.div`
  width: 100%;
  height: 90px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
`;

const StyledButton = styled.button`
  width: 48%;
  height: 40px;
  border: none;
  border-radius: 5px;
  background-color: lightsalmon;
  margin-top: 10px;
  font-size: 15px;
  font-weight: bold;
  color: black;
`;

const DetailModal = ({ performance, onClose }) => {
  useEffect(() => {
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(KakaoAppKey);
    }
  }, []);

  if (!performance) return null;

  const handleClick = () => {
    window.open(performance.relates[0].relate[0].relateurl[0], '_blank');
  };

  const handleShare = () => {
    if (performance.relates && performance.relates[0] && performance.relates[0].relate[0].relateurl[0]) {
      window.Kakao.Link.sendCustom({
        templateId: 111634,  // 여기에 템플릿 ID를 사용하세요.
        templateArgs: {
          'title': performance.prfnm,
          'description': `${performance.genrenm} - ${performance.fcltynm}`,
          'imageUrl': performance.poster,
          'linkUrl': performance.relates[0].relate[0].relateurl[0]
        }
      }).then(() => {
        console.log('공유 성공');
      }).catch(error => {
        console.error("카카오톡 공유에 실패했습니다.", error);
        alert("카카오톡 공유에 실패했습니다. 잠시 후 다시 시도해주세요.");
      });
    } else {
      console.error("공연 링크가 없습니다.");
      alert("공연 링크가 존재하지 않습니다.");
    }
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalContentTop>
          {performance.poster && (
            <img src={performance.poster} style={{ width: "100%", height: "100%" }} alt="Performance Poster" />
          )}
        </ModalContentTop>
        <ModalContentBottom>
          <div style={{ width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
            <h2 style={{ textAlign: "center" }}>{performance.prfnm}</h2>
            <button onClick={handleShare}>공유하기</button>
          </div>
          <StyledHr />

          <span style={{ color: "gray", fontWeight: "bold" }}>장르 </span>
          <span style={{ marginTop: "0px" }}>{performance.genrenm}</span>

          <span style={{ color: "gray", fontWeight: "bold" }}>장소 </span>
          <span style={{ marginTop: "0px" }}>{performance.fcltynm}</span>

          <span style={{ color: "gray", fontWeight: "bold" }}>예매가격 </span>
          <span style={{ marginTop: "0px" }}>{performance.pcseguidance}</span>

          <span style={{ color: "gray", fontWeight: "bold" }}>상영시간 </span>
          <span style={{ marginTop: "0px" }}>{performance.dtguidance} {performance.prfruntime}</span>

          <span style={{ color: "gray", fontWeight: "bold" }}>날짜 </span>
          <span style={{ marginTop: "0px" }}>{performance.prfpdfrom} ~ {performance.prfpdto}</span>

          <span style={{ color: "gray", fontWeight: "bold" }}>출연진 </span>
          <span style={{ marginTop: "0px" }}>{performance.prfcast}</span>

          <span style={{ color: "gray", fontWeight: "bold" }}>제작진 </span>
          <span style={{ marginTop: "0px" }}>{performance.prfcrew}</span>

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
