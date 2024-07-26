import React, { useRef, useContext, useState, useEffect } from 'react';
import AuthContext from '../(contexts)/authContext';
import axios from 'axios';
import styled from 'styled-components';
import { Button } from "../Signin/page";
import Swal from 'sweetalert2';

const LeftContent = () => {
  const { loading, setLoading, fileResponse, setFileResponse, selectedFile, setSelectedFile, authToken } = useContext(AuthContext);
  const inputFileRef = useRef(null);
  const [fileName, setFileName] = useState('');

  useEffect(()=> {
  },[inputFileRef])

  function handleImageSelect(e) {
    const file = e.target.files[0];
    if (!file.type.startsWith('image/')) {
      Swal.fire({
        title: "Invalid file type!",
        text: "Please select an image file.",
        icon: "error"
      });
      inputFileRef.current.value = '';
      return;
    }
    setSelectedFile(file);
    setFileName(file.name);
  }

  function resetApp() {
    setSelectedFile(null);
    setFileResponse("Please, select an image.");
    setLoading(false);
    setFileName('');
    inputFileRef.current.value = '';
  }

  async function handleSubmitFile() {
    if (!selectedFile) {
      Swal.fire({
        title: "No image selected!",
        text: "Please select an image to upload",
        icon: "warning"
      })
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
      setFileResponse(res.data.text);
    }).catch(err => {
      Swal.fire({
        title: "Error uploading file",
        text: err.response.data.message,
        icon: "error"
      })
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
      <Button disabled={loading} onClick={() => inputFileRef.current.click()}>
        Select File
      </Button>
      {fileName ? <FileName>{fileName}</FileName> : <FileName>No image selected.</FileName>}
      
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

