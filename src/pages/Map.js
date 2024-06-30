import React, { useEffect } from "react";
import styled from "styled-components";
import Footer from "../components/Footer";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-color: black;

  @media (max-width: 768px) {
    height: 100dvh;
    display: flex;
    flex-direction: column;
    background-color: lightgray;
  }
`;

const TopFrame = styled.div`
  width: 100%;
  height: 90vh;
  border: 1px solid black;

  @media (max-width: 768px) {
    height: 90dvh;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;

    h1 {
      color: white;
      padding: 20px;
    }
  }
`;

const Map = () => {
  const latitude = parseFloat(localStorage.getItem('latitude')) 
  const longitude = parseFloat(localStorage.getItem('longitude')); 

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://dapi.kakao.com/v2/maps/sdk.js?appkey=ed218e43e083f32fc9b2e645cbee237d&autoload=false";
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById("map");
        const options = {
          center: new window.kakao.maps.LatLng(latitude, longitude),
          level: 3,
        };
        const map = new window.kakao.maps.Map(container, options);

        // 3D 지도 타입 설정
        map.setMapTypeId(window.kakao.maps.MapTypeId.NORMAL);
      });
    };

    script.onerror = () => {
      console.error("Kakao Maps script failed to load.");
    };

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, [latitude, longitude]);

  return (
    <Container>
      <TopFrame>
        <div id="map" style={{ width: "100%", height: "100%", zIndex: 100 }}></div>
      </TopFrame>
      <Footer />
    </Container>
  );
};

export default Map;
