import React, { useRef, useContext, useState } from 'react';
import AuthContext from '../(contexts)/authContext';
import axios from 'axios';
import styled from 'styled-components';

const LeftContent = () => {
  const { loading, setLoading, fileResponse, setFileResponse, selectedFile, setSelectedFile, authToken } = useContext(AuthContext);
  const inputFileRef = useRef(null);
  const [fileName, setFileName] = useState('');

  function handleImageSelect(e) {
    const file = e.target.files[0];
    setSelectedFile(file);
    setFileName(file.name);
  }

  function resetApp() {
    setSelectedFile(null);
    setFileResponse(null);
    setLoading(false);
    setFileName('');
    inputFileRef.current.value = '';
  }

  async function handleSubmitFile() {
    if (!selectedFile) {
      alert("No image selected! Select one first.");
      return;
    }
  
    const formData = new FormData();
    formData.append("file", selectedFile);
  
    const URL = `${process.env.NEXT_PUBLIC_API_URL}/upload/file`;
  
    setLoading(true);
    axios.post(URL, formData, {
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "multipart/form-data",
      },
    }).then(res => {
      setFileResponse(res.data.text.text);
    }).catch(err => {
      console.log(err);
    }).finally(() => {
      setLoading(false);
    });  
  }

  return (
    <Container>
      <Title>Upload an image containing text:</Title>
      <Subtitle>Supported languages:</Subtitle>
      <LanguageList>
        <li>English</li>
        <li>Portuguese</li>
        <li>Spanish</li>
        <li>Japanese</li>
        <li>German</li>
      </LanguageList>

      <HiddenFileInput 
        type="file"
        id="fileUpload"
        ref={inputFileRef}
        accept="image/*"
        onChange={handleImageSelect}
      />
      <StyledButton onClick={() => inputFileRef.current.click()}>
        Select File
      </StyledButton>
      {fileName && <FileName>{fileName}</FileName>}
      
      <ButtonContainer>
        <Button onClick={resetApp} disabled={loading}>Clear field</Button>
        <Button onClick={handleSubmitFile} disabled={loading}>Submit image</Button>
      </ButtonContainer>
    </Container>
  )
}

export default LeftContent;

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  margin-right: 1rem;
`

const Title = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
`

const Subtitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 1rem;
`

const LanguageList = styled.ul`
  list-style: none;
  padding: 0;
  margin-bottom: 2rem;

  li {
    margin-bottom: 0.5rem;
  }
`

const HiddenFileInput = styled.input`
  display: none;
`

const StyledButton = styled.button`
  background-color: #333;
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  font-size: 1rem;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease;
  margin-bottom: 1rem;

  &:hover {
    background-color: #555;
  }

  &:disabled {
    background-color: #555;
    cursor: not-allowed;
  }
`

const FileName = styled.div`
  margin-top: 0.5rem;
  margin-bottom: 2rem;
  text-align: center;
  font-size: 1rem;
  color: white;
  word-break: break-all;
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`

const Button = styled.button`
  background-color: #333;
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  font-size: 1rem;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease;
  margin-right: 0.5rem;

  &:hover {
    background-color: #555;
  }

  &:disabled {
    background-color: #555;
    cursor: not-allowed;
  }
`
