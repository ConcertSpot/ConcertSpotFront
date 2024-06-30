import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Footer from "../components/Footer";
import Modal from "../components/Modal";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-color: black;

  @media (max-width: 768px) {
    height: 100dvh;
    display: flex;
    flex-direction: column;
    background-color: lightgray;
  }
`;

const TopFrame = styled.div`
  width: 100%;
  height: 75dvh;
  border: 1px solid black;

  @media (max-width: 768px) {
    height: 90dvh;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;

    h1 {
      color: white;
      padding: 20px;
    }
  }
`;

const Home = () => {

  const [modalState, setModalState] = useState(false);
  
  useEffect(() => {
    const latitude = localStorage.getItem("latitude");
    if (!latitude) {
      setModalState(true);
    }
  }, []);

  const closeModal = () => {
    setModalState(false);
  }

  return (
    <Container>
      <TopFrame>
        {modalState && <Modal closeModal={closeModal} />}
        <h1 style={{textAlign:"center"}}>오늘 당신 근처의 <br/> 이런 공연은 어떨까요?</h1>
      </TopFrame>
      <Footer />
    </Container>
  );
}

export default Home;
