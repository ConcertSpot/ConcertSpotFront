import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: white;
  overflow-y: hidden;
`;

const SpaceFrame = styled.div`
  width: 100%;
  height: 20%;
`;

const ImgFrame = styled.div`
  width: 100%;
  height: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TextFrame = styled.div`
  width: 100%;
  height: 30%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  text-align: center;
`;

const RowConcertBox = ({ posterImg, title, place, start, end }) => {
  return (
    <Container>
      <SpaceFrame/>
      <ImgFrame>
        <img
          src={posterImg} // url 속성을 src로 변경
          style={{ width: "70%", height: "100%" }}
          alt="Concert Poster"
        />
      </ImgFrame>
      <TextFrame>
        <h3>{title}</h3>
        <span>{place}</span>
        {start} ~ {end}
      </TextFrame>
    </Container>
  );
};

export default RowConcertBox;
