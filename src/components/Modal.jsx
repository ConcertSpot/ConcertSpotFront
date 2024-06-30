import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 80%;
  height: 80%;
  
  @media (max-width: 768px) {
    width: 80%;
    height: 60%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: white;
    border-radius: 15px;
    position: absolute;
    z-index: 1000;
  }
`;

const TopFrame = styled.div`
  color: black;

  @media (max-width: 768px) {
    width: 100%;
    height: 15%;
    display: flex;
    align-items: center;
    justify-content: center;

    h1 {
      color: black;
    }
  }
`;

const MainFrame = styled.div`
  @media (max-width: 768px) {
    width: 100%;
    height: 70%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
  }
`;

  const CheckingArea = styled.div`
    width: 80%;
    height: 25%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    border: 1px solid #eaecef;

    input {
      width: 20%;
      height: 50%;
    }
  `;

const BottomFrame = styled.button`
  @media (max-width: 768px) {
    width: 100%;
    height: 15%;
    background-color: #0060df;
    border: none;
    border-radius: 0 0 15px 15px;
    cursor: pointer;
    color: white;
    font-size: 30px;
    &:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }
  }
`;

const Modal = ({ closeModal }) => {

  const [isLocationChecked, setIsLocationChecked] = useState(false);
  const [isPrivacyChecked, setIsPrivacyChecked] = useState(false);

  const handleLocationChecked = () => {
    setIsLocationChecked(!isLocationChecked);
  }

  const handlePrivacyChecked = () => {
    setIsPrivacyChecked(!isPrivacyChecked);
  }

  const saveSetting = () => {
    closeModal();
    console.log("saveSetting!");
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          localStorage.setItem("latitude", position.coords.latitude);
          localStorage.setItem("longitude", position.coords.longitude);
        },
        (error) => {
          console.error("에러남", error);
        }
      );
    }
  }

  return (
    <Container>
      <TopFrame>
        <h2>이용 약관 동의</h2>
      </TopFrame>
      <MainFrame>
        <h4 style={{textAlign:"center"}}>저희 서비스의 원활한 사용을 위하여 <br/> 다음에 제공 사항에 대하여 동의해 주세요</h4>
        <CheckingArea>
          <h2>위치정보 제공</h2>
          <input 
            type="checkbox"
            checked={isLocationChecked}
            onChange={handleLocationChecked}
          />
        </CheckingArea>
        <CheckingArea>
          <h2>개인정보 제공</h2>
          <input 
            type="checkbox"
            checked={isPrivacyChecked}
            onChange={handlePrivacyChecked}
          />
        </CheckingArea>
      </MainFrame>
      <BottomFrame onClick={saveSetting} disabled={!isLocationChecked || !isPrivacyChecked}>확인</BottomFrame>
    </Container>
  )
}

export default Modal;