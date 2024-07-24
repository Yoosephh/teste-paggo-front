import React, { useContext } from 'react';
import AuthContext from '../(contexts)/authContext';
import styled from 'styled-components';
import Loading from './Loading';

const RightContent = () => {
  const { loading, fileResponse } = useContext(AuthContext);

  return (
    <Container>
      {loading ? <Loading /> : <TextResult>{fileResponse}</TextResult>}
    </Container>
  );
}

export default RightContent;

const Container = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  margin-left: 1rem;
`

const TextResult = styled.div`
  white-space: normal;
  word-wrap: break-word;
  color: white;
  line-height: 25px;
`
