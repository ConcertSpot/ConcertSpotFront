import React, { useEffect, useState, useCallback } from "react";
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

const LoadingSpinner = styled.div`
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

// 본문
const Home = () => {
  const [concertList, setConcertList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [key, setKey] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("https://port-0-concertspotback-lxw4rw2ief7129ee.sel5.cloudtype.app/performances");
      setConcertList(response.data.dbs.db);
      console.log(response.data.dbs.db);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
    
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, [fetchData]);

  useEffect(() => {
    if (concertList.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % concertList.length);
        setKey(prevKey => prevKey + 1);
      }, 4500);  // 3초에서 7초로 변경

      return () => clearInterval(interval);
    }
  }, [concertList]);

  const handleImageLoad = () => {
    console.log("Image loaded");
    setIsLoading(false);
  };

  const handleImageError = () => {
    console.log("Image failed to load");
    setIsLoading(false);
    setKey(prevKey => prevKey + 1);
  };

  const getImageUrlWithTimestamp = (url) => {
    return `${url}?t=${new Date().getTime()}`;
  };

  return (
    <Container>
      <TopFrame>
        <h1>
          이번달 전국 각지의 <br /> 이런 공연은 어떨까요?
        </h1>
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          concertList.length > 0 && (
            <RowConcertBox
              key={`${currentIndex}-${key}`}
              posterImg={isMobile ? getImageUrlWithTimestamp(concertList[currentIndex].poster) : concertList[currentIndex].poster}
              title={concertList[currentIndex].prfnm}
              place={concertList[currentIndex].fcltynm}
              start={concertList[currentIndex].prfpdfrom}
              end={concertList[currentIndex].prfpdto}
              state={concertList[currentIndex].prfstate}
              onLoad={handleImageLoad}
              onError={handleImageError}
            />
          )
        )}
      </TopFrame>
      <Footer />
    </Container>
  );
};

export default Home;