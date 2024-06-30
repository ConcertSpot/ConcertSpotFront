import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 20%;
  background-color: white;
  border: 2px solid black;

  @media (max-width: 768px) {
    height: 10dvh;
    background-color: lightgray;
  }
`;

const Header = () => {
  return ( 
    <Container>
      헤더 내용
    </Container>
  )
}

export default Header;
