import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Layout from "../components/Layout";

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: lightsalmon;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Result = styled.div`
  margin-top: 20px;
  font-size: 16px;
  font-weight: bold;
`;

const TestContent = () => {
  const [address, setAddress] = useState("");
  const [isKakaoLoaded, setIsKakaoLoaded] = useState(false);

  useEffect(() => {
    const checkKakaoLoaded = setInterval(() => {
      if (window.kakao && window.kakao.maps && window.kakao.maps.services) {
        setIsKakaoLoaded(true);
        clearInterval(checkKakaoLoaded);
      }
    }, 100);

    return () => clearInterval(checkKakaoLoaded);
  }, []);

  useEffect(() => {
    if (!isKakaoLoaded) return;

    const latitude = localStorage.getItem("latitude");
    const longitude = localStorage.getItem("longitude");

    if (!latitude || !longitude) {
      setAddress("위도와 경도 값이 localStorage에 없습니다.");
      return;
    }

    const geocoder = new window.kakao.maps.services.Geocoder();
    const coord = new window.kakao.maps.LatLng(latitude, longitude);

    geocoder.coord2Address(coord.getLng(), coord.getLat(), (result, status) => {
      if (status === window.kakao.maps.services.Status.OK) {
        setAddress(result[0].address.address_name);
      } else {
        setAddress("주소를 변환할 수 없습니다.");
      }
    });
  }, [isKakaoLoaded]);

  return (
    <Container>
      {address && <Result>주소: {address}</Result>}
    </Container>
  );
};

const Test = () => {
  return <Layout content={<TestContent />} />;
};

export default Test;
