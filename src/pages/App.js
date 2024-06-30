import { useEffect, useState } from "react";
import styled from "styled-components";
import Layout from "../components/Layout";
import Modal from "../components/Modal";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledButton = styled.button`
  width: 150px;
  height: 50px;
  background-color: lightsalmon;
  border-radius: 15px;
  cursor: pointer;
`;

const HomeContent = () => {

  const [modalState, setModalState] = useState(false);

  const changeModalState = () => {
    setModalState(prev => {
      const newState = !prev
      return newState
    })
  }

  useEffect(() => {
    console.log(modalState)
  }, [modalState])

  const closeModal = () => {
    return (
      setModalState(false)
    )
  }

  return (
    <Container>
      {modalState && <Modal closeModal={closeModal} /> }
      <StyledButton onClick={changeModalState}>모달 여는 버튼</StyledButton>
    </Container>
  )
}

const App = () => {
  return <Layout content={<HomeContent />} />
}

export default App;