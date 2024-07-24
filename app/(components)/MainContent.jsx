'use client'
import React, { useContext, useRef } from 'react'
import AuthContext from '../(contexts)/authContext'
import axios from 'axios';
import { signIn } from 'next-auth/react';
import Loading from './Loading';

export default function MainContent() {
  const {loading, setLoading,  fileResponse, setFileResponse, selectedFile, setSelectedFile, authToken} = useContext(AuthContext);
  const inputFileRef = useRef(null);

  function handleImageSelect(e) {
    setSelectedFile(e.target.files[0])
  }

  function resetApp() {
    setSelectedFile(null)
    setFileResponse(null);
    setLoading(false);
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
  
    setLoading(true)
      axios.post(URL, formData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "multipart/form-data",
        },
      }).then(res => {
        setFileResponse(res.data.text.text);
      }).catch(err => {
        console.log(err)
      }).finally(() =>{
        setLoading(false)
      });  
  }

  return (
    <>
    <div>Upload some image containing text:</div>
    <div>Suported languages</div>
    <ul>
      <li>English</li>
      <li>Portuguese</li>
      <li>Spanish</li>
      <li>Japanese</li>
      <li>German</li>
    </ul>
    
      <input 
      type="file"
      id="fileUpload"
      ref={inputFileRef}
      accept="image/*"
      onChange={(e) => handleImageSelect(e)}
      />
      
      <button onClick={() => resetApp()} >Clear field</button>
      <button onClick={handleSubmitFile} disabled={loading}>Submit image</button>
      
      <div>
        {loading ? (<Loading />) : fileResponse}
      </div>
    </>
  )
}
