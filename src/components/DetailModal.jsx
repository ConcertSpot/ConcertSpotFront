import React from "react";
import styled from "styled-components";

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
  if (!performance) return null;

  const handleClick = () => {
    window.open(performance.relates[0].relate[0].relateurl[0], '_blank');
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
          <h2 style={{ textAlign: "center" }}>{performance.prfnm}</h2>
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

          <span style={{ color: "gray", fontWeight: "bold" }}>출현진 </span>
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
