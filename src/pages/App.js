import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Layout from "../components/Layout";
import Modal from "../components/Modal";
import Loading from "../components/Loading";

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
  const [loading, setLoading] = useState(true);

  const closeModal = () => {
    setModalState(false);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setLoading(false); // 3초 후에 loading 상태를 false로 변경
    }, 4000);

    return () => clearInterval(timer); // 컴포넌트가 언마운트될 때 인터벌을 정리

  }, []);

  return (
    <Container>
      {loading && <Loading />}
      {modalState && <Modal closeModal={closeModal} />}
    </Container>
  );
};

const App = () => {
  return <Layout content={<AppContent />} />;
};

export default App;
