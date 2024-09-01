import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import Footer from "../components/Footer";
import Loading from "../components/Loading"; // Loading 컴포넌트 추가

const Container = styled.div`
  width: 100%;
  height: 100dvh;
  background-color: white;
  color: black;
`;

const HeaderFrame = styled.div`
  @media (max-width: 768px) {
    height: 10dvh;
    border-bottom: none;
    background-color: black;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    color: white;
  }
`;

const ArticleFrame = styled.div`
  @media (max-width: 768px) {
    height: 80dvh;
    border: none;
    display: flex;
    flex-direction: column;
    position: relative;
    background-color: white;
    color: black;
    overflow-y: scroll;
  }
`;

const NewsItem = styled.div`
  padding: 10px;
  border-bottom: 1px solid lightgray;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  align-items: flex-start;

  h2 {
    font-size: 18px;
    margin: 10px 0;
  }

  p {
    font-size: 14px;
    color: gray;
    margin: 10px 0;
  }

  img {
    width: 100%;
    height: auto;
    max-height: 200px;
    object-fit: cover;
    margin-bottom: 10px;
    border-radius: 8px;
  }

  a {
    color: gray;
    font-weight: bold;
    margin-top: 5px;
    text-decoration: none; /* 링크의 밑줄 제거 */
  }

  a:hover {
    text-decoration: underline; /* 마우스를 올리면 밑줄 추가 */
  }
`;

const News = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://web-concertspotfront-lxw4rw2ief7129ee.sel5.cloudtype.app/api/news"); // Express 서버 엔드포인트로 변경
        console.log(response.data.articles);
        setArticles(response.data.articles);
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Container>
      <HeaderFrame>
        <h1>📰 Concert Feed</h1>
      </HeaderFrame>
      {loading ? (
        <div style={{ height: "80dvh" }}>
          <Loading />
        </div>
      ) : (
        <ArticleFrame>
          {articles.map((article, index) => (
            <NewsItem key={index}>
              {article.urlToImage && <img src={article.urlToImage} alt={article.title} />}
              <h2>{article.title}</h2>
              <p>{article.description}</p>
              <div style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}>
                <a href={article.url} target="_blank" rel="noopener noreferrer">
                  자세히 보기
                </a>
              </div>
            </NewsItem>
          ))}
        </ArticleFrame>
      )}
      <Footer />
    </Container>
  );
};

export default News;