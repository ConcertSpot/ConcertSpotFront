import React, { useState } from "react";
import styled from "styled-components";
import Layout from "../components/Layout";
import Modal from "../components/Modal";

const Container = styled.div`
  @media (max-width: 768px) {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: lightgray;
  }
`;

const AppContent = () => {

  const [modalState, setModalState] = useState(true);

  const closeModal = () => {
    setModalState(false);
  }

  return (
    <Container>
      {modalState && <Modal closeModal={closeModal} />}
    </Container>
  );
};

const App = () => {
  return <Layout content = {<AppContent/>} />
};

export default App;