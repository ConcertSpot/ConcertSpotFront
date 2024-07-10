import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Footer from "../components/Footer";
import Layout from "../components/Layout";
import axios from "axios";

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

const Result = styled.div`
  margin-top: 20px;
  font-size: 16px;
  font-weight: bold;
`;

const Results = styled.div`
  margin-top: 20px;
  width: 80%;
  background-color: white;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
`;

const Map = () => {
  const [latitude, setLatitude] = useState(parseFloat(localStorage.getItem('latitude')) || 33.450701);
  const [longitude, setLongitude] = useState(parseFloat(localStorage.getItem('longitude')) || 126.570667);
  const [address, setAddress] = useState("");
  const [isKakaoLoaded, setIsKakaoLoaded] = useState(false);
  const [addressResult, setAddressResult] = useState("");
  const [data, setData] = useState(null);
  const [truncatedData, setTruncatedData] = useState("");
  const [postResponse, setPostResponse] = useState([]);
  const [concertCoordinates, setConcertCoordinates] = useState([]);
  const apiKey = "devU01TX0FVVEgyMDI0MDcxMDE5MjIzNTExNDkxMjg=";

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://dapi.kakao.com/v2/maps/sdk.js?appkey=ed218e43e083f32fc9b2e645cbee237d&libraries=services&autoload=false";
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        setIsKakaoLoaded(true);
        const container = document.getElementById("map");
        const options = {
          center: new window.kakao.maps.LatLng(latitude, longitude),
          level: 3,
        };
        const map = new window.kakao.maps.Map(container, options);

        // 마커를 생성하고 설정합니다.
        const markerPosition = new window.kakao.maps.LatLng(latitude, longitude);
        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
        });

        // 마커를 지도에 추가합니다.
        marker.setMap(map);

        // 3D 지도 타입 설정
        map.setMapTypeId(window.kakao.maps.MapTypeId.NORMAL);

        // 주소 검색 기능 추가
        const geocoder = new window.kakao.maps.services.Geocoder();

        const searchAddress = () => {
          geocoder.addressSearch(address, (result, status) => {
            if (status === window.kakao.maps.services.Status.OK) {
              const newCoords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
              map.setCenter(newCoords);
              marker.setPosition(newCoords);
              setLatitude(result[0].y);
              setLongitude(result[0].x);
              localStorage.setItem('latitude', result[0].y);
              localStorage.setItem('longitude', result[0].x);
              setAddressResult(result[0].address_name);

              // 주소를 기반으로 데이터 검색
              fetchData(result[0].address_name, map);
            } else {
              console.error("Failed to search address:", status);
            }
          });
        };

        document.getElementById("search-btn").onclick = searchAddress;

        // 페이지 로드 시 위도와 경도로 주소 변환
        const coord = new window.kakao.maps.LatLng(latitude, longitude);
        geocoder.coord2Address(coord.getLng(), coord.getLat(), (result, status) => {
          if (status === window.kakao.maps.services.Status.OK) {
            setAddressResult(result[0].address.address_name);
            fetchData(result[0].address.address_name, map);
          } else {
            setAddressResult("주소를 변환할 수 없습니다.");
          }
        });
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
  }, [latitude, longitude, address]);

  const fetchData = async (address, map) => {
    try {
      const response = await axios.get(
        `https://business.juso.go.kr/addrlink/addrLinkApi.do?currentPage=1&countPerPage=10&keyword=${encodeURIComponent(address)}&confmKey=${apiKey}&resultType=json`
      );
      setData(response.data);
      if (response.data.results.juso.length > 0) {
        const rnMgtSn = response.data.results.juso[0].rnMgtSn;
        const truncatedRnMgtSn = rnMgtSn.substring(0, 4);
        console.log(truncatedRnMgtSn)
        setTruncatedData(truncatedRnMgtSn);

        const postResponse = await axios.post('https://port-0-concertspotback-lxw4rw2ief7129ee.sel5.cloudtype.app/submitCode', { code: truncatedRnMgtSn });
        console.log(postResponse.data[0].dbs.db[0].la[0], postResponse.data[0].dbs.db[0].lo[0]);
        setPostResponse(postResponse.data);
        console.log(postResponse.data); // 바로 여기서 postResponse 데이터를 콘솔에 출력

        // concertCoordinates 설정 및 마커 추가
        const coordinates = postResponse.data.map((item, index) => ({
          la: item.dbs.db[0].la[0],
          lo: item.dbs.db[0].lo[0]
        }));
        setConcertCoordinates(coordinates);

        coordinates.forEach(coord => {
          const markerPosition = new window.kakao.maps.LatLng(coord.la, coord.lo);
          const marker = new window.kakao.maps.Marker({
            position: markerPosition,
          });
          marker.setMap(map);
        });
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  return (
    <Container>
      <TopFrame>
        <input 
          type="text" 
          value={address} 
          onChange={(e) => setAddress(e.target.value)} 
          placeholder="Enter address" 
          style={{ position: "absolute", top: "10px", zIndex: 200, width: "80%" }} 
        />
        <button id="search-btn" style={{ position: "absolute", top: "10px", right: "10px", zIndex: 200 }}>Search</button>
        <div id="map" style={{ width: "100%", height: "100%", zIndex: 100 }}></div>
      </TopFrame>
      {addressResult && <Result>주소: {addressResult}</Result>}
      {data ? (
        <Results>
          <p>도로명코드(앞 4자리): {truncatedData}</p>
        </Results>
      ) : (
        <p>Loading...</p>
      )}
      <Footer />
    </Container>
  );
};

export default Map;
