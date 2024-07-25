import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const Loading = () => {
  const [messageIndex, setMessageIndex] = useState(0);
  const messages = ['Downloading image...', 'Analyzing image...', 'Extracting text...'];

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prevIndex) => {
        const nextIndex = prevIndex + 1;
        return nextIndex < messages.length ? nextIndex : messages.length - 1;
      });
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  return (
    <LoadingContainer>
      <LoadingSpinner />
      <LoadingText>{messages[messageIndex]}</LoadingText>
    </LoadingContainer>
  );
};

export default Loading;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  font-family: Arial, sans-serif;
`;

const LoadingSpinner = styled.div`
  border: 8px solid #333;
  border-top: 8px solid #3498db;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: ${spin} 2s linear infinite;
`;

const LoadingText = styled.div`
  margin-top: 20px;
  font-size: 18px;
  text-align: center;
`;