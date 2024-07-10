import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
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

const Results = styled.div`
  margin-top: 20px;
  width: 80%;
  background-color: white;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
`;

const Test2Content = () => {
  const [data, setData] = useState(null);
  const [truncatedData, setTruncatedData] = useState("");
  const apiKey = "devU01TX0FVVEgyMDI0MDcxMDE5MjIzNTExNDkxMjg=";
  const keyword = "부산 북구 화명동 화명힐스";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://business.juso.go.kr/addrlink/addrLinkApi.do?currentPage=1&countPerPage=10&keyword=${encodeURIComponent(keyword)}&confmKey=${apiKey}&resultType=json`
        );
        setData(response.data);
        if (response.data.results.juso.length > 0) {
          const rnMgtSn = response.data.results.juso[0].rnMgtSn;
          const truncatedRnMgtSn = rnMgtSn.substring(0, 4);
          setTruncatedData(truncatedRnMgtSn);
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchData();
  }, []);

  return (
    <Container>
      <h1>주소 검색 결과</h1>
      {data ? (
        <Results>
          <p>도로명코드(앞 4자리): {truncatedData}</p>
        </Results>
      ) : (
        <p>Loading...</p>
      )}
    </Container>
  );
}

const Test2 = () => {
  return <Layout content={<Test2Content />} />;
};

export default Test2;
