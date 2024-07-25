'use client'
import { signIn } from 'next-auth/react'
import React, { useContext } from 'react'
import { FaGithub, FaGoogle } from 'react-icons/fa'
import styled from 'styled-components'
import AuthContext from '../(contexts)/authContext'

const signin = () => {
  const {loading} = useContext(AuthContext);
  return (
    <SignInContainer>
        <Title>Paggo.app</Title>
        <Subtitle>Extract texts from images in a simple and quick way</Subtitle>
        <Button disabled={loading} onClick={() => signIn("github", { callbackUrl: 'http://localhost:3000/Upload' })}>
          <FaGithub /> Continue with GitHub
        </Button>
        <Button disabled={loading} onClick={() => signIn("google", { callbackUrl: 'http://localhost:3000/Upload' })}>
          <FaGoogle /> Continue with Google
        </Button>
    </SignInContainer>
  )
}

export default signin

const SignInContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(to bottom left, black, #8d8b8b);
  color: white;
  text-align: center;
`

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 1rem;
`

const Subtitle = styled.p`
  font-size: 1.2rem;
  margin-bottom: 2rem;
`

export const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #333;
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  margin: 0.5rem 0;
  font-size: 1rem;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #555;
  }

  &:disabled {
    background-color: #777;
    cursor: not-allowed;
    opacity: 0.6;
  }

  svg {
    margin-right: 0.5rem;
  }
`