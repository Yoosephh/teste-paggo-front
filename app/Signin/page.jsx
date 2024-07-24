'use client'
import { signIn } from 'next-auth/react'
import React from 'react'


const signin = () => {
  return (
    <>
        <button onClick={() => signIn("github", { callbackUrl: 'http://localhost:3000/Upload' })}>Continue with {"github"}</button>
        <button onClick={() => signIn("google", { callbackUrl: 'http://localhost:3000/Upload' })}>Continue with {"google"}</button>
        <div>signin</div>
    </>
  )
}

export default signin