import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import Footer from "../components/Footer";
import Layout from "../components/Layout";
import axios from "axios";
import { FaSearchLocation } from "react-icons/fa";
import DetailModal from "../components/DetailModal";

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
    height: 82dvh;
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

const SearchArea = styled.div`
  @media (max-width: 768px) {
    height: 8dvh;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    border: none;
  }
`;

const StyledInput = styled.input`
  width: 85%;
  height: 100%;
  padding-left: 5%;
  font-size: 18px;
  border: 1px solid transparent;
  outline: none;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: black;
    box-shadow: 0 0 0 2px rgba(255, 192, 203, 0.3);
  }

  &::placeholder {
    color: #999;
    transition: opacity 0.3s ease;
  }

  &:focus::placeholder {
    opacity: 0;
  }
`;

const StyledButton = styled.button`
  width: 15%;
  height: 100%;
  border: none;
  cursor: pointer;
  font-size: 25px;
  background-color: white;
  border: none;
  color: black;
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
  const [selectedPerformance, setSelectedPerformance] = useState(null);
  const [modalState, setModalState] = useState(false);
  const apiKey = "devU01TX0FVVEgyMDI0MDcxMDE5MjIzNTExNDkxMjg=";

  const createPerformanceMarkers = useCallback((performances, map) => {
    performances.forEach(performance => {
      const la = performance.place.dbs.db[0].la[0];
      const lo = performance.place.dbs.db[0].lo[0];
      const markerPosition = new window.kakao.maps.LatLng(la, lo);
      const marker = new window.kakao.maps.Marker({
        position: markerPosition,
      });
      marker.setMap(map);
    
      window.kakao.maps.event.addListener(marker, 'click', function() {
        console.log("Marker clicked:", performance.detail.dbs.db[0]);
        map.panTo(markerPosition);
        setSelectedPerformance(performance.detail.dbs.db[0]);
        setModalState(true);
      });
    });
  }, []);

  const fetchData = useCallback(async (address, map) => {
    try {
      const response = await axios.get(
        `https://business.juso.go.kr/addrlink/addrLinkApi.do?currentPage=1&countPerPage=10&keyword=${encodeURIComponent(address)}&confmKey=${apiKey}&resultType=json`
      );
      setData(response.data);
      if (response.data.results.juso.length > 0) {
        const rnMgtSn = response.data.results.juso[0].rnMgtSn;
        const truncatedRnMgtSn = rnMgtSn.substring(0, 4);
        console.log(truncatedRnMgtSn);
        setTruncatedData(truncatedRnMgtSn);
        const postResponse = await axios.post('https://port-0-concertspotback-lxw4rw2ief7129ee.sel5.cloudtype.app/submitCode', { code: truncatedRnMgtSn });
        console.log("전체 출력값임:", postResponse.data);
        setPostResponse(postResponse.data);
        localStorage.setItem('ListItem', JSON.stringify(postResponse.data));
        console.log("setData임:", response.data);

        const combinedResults = postResponse.data.map((item, index) => {
          if (item.performance && item.detail && item.place) {
            return {
              performance: item.performance,
              detail: item.detail,
              place: item.place,
            };
          } else {
            console.error("Invalid item structure", item);
            return null;
          }
        }).filter(item => item !== null);

        setConcertCoordinates(combinedResults);
        createPerformanceMarkers(combinedResults, map);
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  }, [createPerformanceMarkers]);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    if (isKakaoLoaded) {
      const places = new window.kakao.maps.services.Places();
      places.keywordSearch(address, (result, status) => {
        if (status === window.kakao.maps.services.Status.OK) {
          const newCoords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
          const map = new window.kakao.maps.Map(document.getElementById("map"), {
            center: newCoords,
            level: 3,
          });
          const marker = new window.kakao.maps.Marker({
            position: newCoords,
          });
          marker.setMap(map);
          setLatitude(result[0].y);
          setLongitude(result[0].x);
          localStorage.setItem('latitude', result[0].y);
          localStorage.setItem('longitude', result[0].x);
          setAddressResult(result[0].address_name || result[0].road_address_name);

          fetchData(result[0].address_name || result[0].road_address_name, map);
        } else {
          console.error("Failed to search address:", status);
        }
      });
    }
  }, [address, isKakaoLoaded, fetchData]);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://dapi.kakao.com/v2/maps/sdk.js?appkey=ed218e43e083f32fc9b2e645cbee237d&libraries=services,clusterer,drawing&autoload=false";
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        setIsKakaoLoaded(true);
        const container = document.getElementById("map");
        const options = {
          center: new window.kakao.maps.LatLng(latitude, longitude),
          level: 3,
          draggable: true,
        };
        const map = new window.kakao.maps.Map(container, options);
        
        const markerImage = new window.kakao.maps.MarkerImage(
          'https://cdn.pixabay.com/photo/2014/04/03/10/03/google-309740_960_720.png',
          new window.kakao.maps.Size(28, 45),
          { offset: new window.kakao.maps.Point(13, 35) }
        );

        const markerPosition = new window.kakao.maps.LatLng(latitude, longitude);
        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
          image: markerImage
        });

        marker.setMap(map);

        map.setMapTypeId(window.kakao.maps.MapTypeId.NORMAL);

        const geocoder = new window.kakao.maps.services.Geocoder();

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
  }, [latitude, longitude, fetchData]);

  const closeModal = useCallback(() => {
    setModalState(false);
    setSelectedPerformance(null);
  }, []);

  console.log("Modal state:", modalState);
  console.log("Selected performance:", selectedPerformance);

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <SearchArea>
          <StyledInput 
            type="text" 
            value={address} 
            onChange={(e) => setAddress(e.target.value)} 
            placeholder="다른 지역 검색" 
          />
          <StyledButton type="submit"><FaSearchLocation /></StyledButton>
        </SearchArea>
      </form>
      <TopFrame>
        <div id="map" style={{ width: "100%", height: "100%", zIndex: 100 }}></div>
      </TopFrame>
      {modalState && selectedPerformance && (
        <DetailModal performance={selectedPerformance} onClose={closeModal} />
      )}
      <Footer />
    </Container>
  );
};

export default Map;