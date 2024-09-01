import React from "react";
import styled from "styled-components";
import Lottie from "lottie-react";
import loading from "../assets/loading.json";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex; /* 자식 요소들을 중앙에 배치하기 위해 flex 사용 */
  flex-direction: column; /* 세로 방향으로 정렬 */
  align-items: center; /* 수평 중앙 정렬 */
  justify-content: center; /* 수직 중앙 정렬 */
  background-color: white;
  z-index: 1001;
`;

const StyledLottie = styled(Lottie)`
  width: 300px; /* 원하는 너비로 설정 */
  height: 300px; /* 원하는 높이로 설정 */
`;

const Loading = () => {
  return (
    <Container>
      <StyledLottie animationData={loading} />
      <h3>공연정보는 역시</h3>
      <h1>Concert Spot!</h1>
    </Container>
  );
};

export default Loading;
