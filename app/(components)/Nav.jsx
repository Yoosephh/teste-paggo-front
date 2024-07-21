'use client'
import Link from "next/link"

import { getSession, useSession } from "next-auth/react"
import { useEffect, useState } from "react";

function Nav() {
  const {data, status} = useSession();

  // useEffect(()=>{
  //   console.log(data)
  // },[data])

  return (
    <header>
      <nav> 
        <div>Paggo.app</div>
        <div>
          {data && (
            <>
              <div>{data?.user?.name}</div>
              {/* <image src={session?.user?.image} alt="profile-photo" /> */}
              {/* <button onClick={() => signOut({ callbackUrl: 'http://localhost:3000/api/auth/signin' })}>Sign out</button> */}
              <Link href="/api/auth/signout?callbackUrl=/" >Logout</Link>
            </>
          )}
        </div>
      </nav>
    </header>
  )
}

export default Nav