import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 20%;
  background-color: white;

  @media (max-width: 768px) {
    height: 10dvh;
    background-color: white;
  }
`;

const Header = () => {
  return ( 
    <Container>
      헤더임
    </Container>
  )
}

export default Header;
