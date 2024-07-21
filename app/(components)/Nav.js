'use client'
import Link from "next/link"
import { useContext } from "react"
import AuthContext from "../(contexts)/authContext"

function Nav() {
  const {session} = useContext(AuthContext);

  return (
    <header>
      <nav>
        <div>Paggo.app</div>
        <div>
          {session && (
            <>
              <div>{session?.user?.name}</div>
              {/* <image src={session?.user?.image} alt="profile-photo" /> */}
              {/* <button onClick={() => signOut({ callbackUrl: 'http://localhost:3000/api/auth/signin' })}>Sign out</button> */}
              <Link href="/api/auth/signout?callbackUrl=/api/auth/signin">Logout</Link>
            </>
          )}
        </div>
      </nav>
    </header>
  )
}

export default Nav