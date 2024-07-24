'use client'
import React from 'react';
import styled from 'styled-components';
import LeftContent from './LeftContent';
import RightContent from './RightContent';

const MainContent = () => {
  return (
    <MainContainer>
      <ContentContainer>
        <LeftContent />
        <RightContent />
      </ContentContainer>
    </MainContainer>
  );
}

export default MainContent;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(to bottom left, black, grey);
  color: white;
  font-family: Arial, sans-serif;
  padding: 2rem;
`

const ContentContainer = styled.div`
  display: flex;
  width: 80%;
`
