import React from "react";
import styled from "styled-components";
import Header from "../components/Header";
import Main from "../components/Main";
import Footer from "../components/Footer";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: red;

    @media (max-width: 768px) {
      width: 100%;
      height: 100dvh;
      background-color: lightgray;
  }
`;

const Layout = ( {content} ) => {
  return (
    <Container>
      <Header></Header>
      <Main
        LayoutMain={content}
      />
      <Footer></Footer>
    </Container>
  )
}

export default Layout;