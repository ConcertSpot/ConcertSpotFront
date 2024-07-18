import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Footer from "../components/Footer";
import DetailModal from "../components/DetailModal";

const Container = styled.div`
  width: 100%;
  height: 100dvh;
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  overflow-x: hidden;
`;

const TopFrame = styled.div`
  width: 100%;
  height: 90dvh;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: white;
  flex-wrap: wrap;
  overflow-y: scroll;
  padding: 10px;
`;

const PerformanceContainer = styled.div`
  width: 47%;
  height: 40%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  cursor: pointer; /* 클릭 가능하게 변경 */
`;

const TitleArea = styled.div`
  width: 100%;
  height: 10%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const PerformanceDetail = ({ performance, title, onClick }) => {
  const truncatedProduct = title.length > 10 ? title.substring(0, 20) + "..." : title;

  return (
    <PerformanceContainer onClick={onClick}>
      {performance ? <img src={performance} style={{ width: "100%", height: "80%" }} alt="Performance Poster" /> : "No poster available"}
      <TitleArea>{truncatedProduct}</TitleArea>
    </PerformanceContainer>
  );
};

const List = () => {
  const [modalState, setModalState] = useState(false);
  const [selectedPerformance, setSelectedPerformance] = useState(null);
  const [postResponse, setPostResponse] = useState([]);

  useEffect(() => {
    const listItem = localStorage.getItem("ListItem");
    if (listItem) {
      const parsedListItem = JSON.parse(listItem);
      setPostResponse(parsedListItem); // JSON.parse로 문자열을 객체 배열로 변환
      console.log(parsedListItem);
    }
  }, []);

  const handlePerformanceClick = (performance) => {
    setSelectedPerformance(performance);
    setModalState(true);
  };

  const closeModal = () => {
    setModalState(false);
    setSelectedPerformance(null);
  };

  return (
    <Container>
      {modalState && <DetailModal performance={selectedPerformance} onClose={closeModal} />}
      <TopFrame>
        {postResponse.length > 0 ? (
          postResponse.map((item, index) => {
            const performance = item.detail?.dbs?.db?.[0];
            if (performance) {
              return (
                <PerformanceDetail
                  key={index}
                  performance={performance.poster}
                  title={performance.prfnm}
                  onClick={() => handlePerformanceClick(performance)}
                />
              );
            } else {
              console.error("Invalid item structure", item);
              return null;
            }
          })
        ) : (
          <p>No data available</p>
        )}
      </TopFrame>
      <Footer />
    </Container>
  );
};

export default List;
