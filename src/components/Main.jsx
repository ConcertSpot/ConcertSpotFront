import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 60%;
  background-color: gray;

    @media (max-width: 768px) {
      height: 80dvh;
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