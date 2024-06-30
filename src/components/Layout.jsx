import React from "react";
import styled from "styled-components";
import Header from "../components/Header";
import Main from "../components/Main";
import Footer from "../components/Footer";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-color: salmon;

    @media (max-width: 768px) {
      width: 100%:
      height: 100dvh;
      background-color: lightgray;
  }
`;

const Layout = ( {content} ) => {
  return (
    <Container>
      <Header/>
      <Main LayoutMain={content} />
      <Footer/>
    </Container>
  )
}

export default Layout;