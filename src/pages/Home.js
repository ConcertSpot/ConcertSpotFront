import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import axios from "axios";
import Footer from "../components/Footer";
import Modal from "../components/Modal";
import RowConcertBox from "../components/RowConcertBox";

// 애니메이션 효과 영역

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const textUp = keyframes`
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(-35dvh);
  }
`;
   
// styled-component 영역
  
const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: gray;

  @media (max-width: 768px) {
    width: 100%;
    height: 100dvh;
    display: flex;
    flex-direction: column;
    background-color: white;
  }
`;

const TopFrame = styled.div`
  @media (min-width: 1920px) {
    width: 100%;
    height: 75%;
    position: relative;
    overflow-y: scroll;
  }

  @media (max-width: 768px) {
    width: 100%;
    height: 90dvh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    overflow-x: hidden;

    h1 {
      text-align: center;
      position: absolute;
      color: black;
      padding: 20px;
      bottom: 50%;
      animation: ${fadeIn} 2s ease-in-out, ${textUp} 1.5s 0.5s ease-in-out forwards;
    }
  }
`;

// 본문

const Home = () => {
  const [concertList, setConcertList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://port-0-concertspotback-lxw4rw2ief7129ee.sel5.cloudtype.app/performances");
        // "https://port-0-concertspotback-lxw4rw2ief7129ee.sel5.cloudtype.app/performances"
        setConcertList(response.data.dbs.db);
        console.log(response.data.dbs.db);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  
  useEffect(() => {
    if (concertList.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % concertList.length);
      }, 3000);
  
      return () => clearInterval(interval);
    }
  }, [concertList]);
  
  const handleImageLoad = () => {
    console.log("Image loaded");
  };

  return (
    <Container>
    <TopFrame>
      <h1>
        이번달 전국 각지의 <br /> 이런 공연은 어떨까요?
      </h1>
      {concertList.length > 0 && (
        <RowConcertBox
          key={currentIndex}
          posterImg={concertList[currentIndex].poster}
          title={concertList[currentIndex].prfnm}
          place={concertList[currentIndex].fcltynm}
          start={concertList[currentIndex].prfpdfrom}
          end={concertList[currentIndex].prfpdto}
          state={concertList[currentIndex].prfstate}
          onLoad={handleImageLoad} // 이미지 로드 이벤트 추가
        />
      )}
    </TopFrame>
      <Footer />
    </Container>
  );
};

export default Home;
