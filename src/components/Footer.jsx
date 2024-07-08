import React, { useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { IoHome } from "react-icons/io5";
import { CgMenuGridR } from "react-icons/cg";
import { FaSearchLocation } from "react-icons/fa";
import { FaUserLock } from "react-icons/fa6";

const Container = styled.div`
  width: 100%;
  height: 20%;
  background-color: white;

    @media (max-width: 768px) {
      width: 100%;
      height: 10dvh;
      display: flex;
      align-items: center;
      border: none;
      justify-content: space-around;
      background-color: white;
      border-top: 1px solid #eeeeee;
  }
`;

  const IconFrame = styled(Link)`
    width: 25%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    color: black;
    cursor: pointer;
    font-size: 20px;
  `;

const Footer = () => {

  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.clear(); // 로컬스토리지 전체 비우기
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return ( 
    <Container>
      <IconFrame to="/"><IoHome /></IconFrame>
      <IconFrame to="/Map"><FaSearchLocation /></IconFrame>
      <IconFrame><FaUserLock /></IconFrame>
      <IconFrame><CgMenuGridR /></IconFrame>
    </Container>
  )
}

export default Footer;