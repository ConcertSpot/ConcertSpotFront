import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 60%;
  background-color: white;
  border: 2px solid black;

    @media (max-width: 768px) {
    height: 20dvh;
    background-color: lightgray;
  }
`;

const Main = ( {LayoutMain} ) => {
  return ( 
    <Container>
      {LayoutMain}
    </Container>
  )
}

export default Main;