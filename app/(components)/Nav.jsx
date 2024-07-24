'use client'
import Link from "next/link"

import { getSession, signOut, useSession } from "next-auth/react"
import { useEffect, useState } from "react";
import axios from "axios";

function Nav() {
  const { data } = useSession();

  if(data) {
    const {user, accessToken: token} = data;
    const {email} = user;
    const URL = `${process.env.NEXT_PUBLIC_API_URL}/auth/signin`;
    const body = { email , token }
    
    axios.post(URL, body)
      .then((res)=> {
      console.log(res.data)
    })
      .catch((err) => {
      console.log(err)
    })

  }



  useEffect(()=>{

  }, [data])

  return (
    <header>
      <nav> 
        <div>Paggo.app</div>
        <div>
          {data?.user && (
            <>
              <div>{data?.user?.name}</div>
              {/* <image src={session?.user?.image} alt="profile-photo" /> */}
              <button onClick={() => signOut()}>Sign out</button>
              {/* <Link href="/api/auth/signout?callbackUrl=/" >Logout</Link> */}
            </>
          )}
        </div>
      </nav>
    </header>
  )
}

export default Nav