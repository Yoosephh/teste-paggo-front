'use client'

import { signOut, useSession } from "next-auth/react"
import axios from "axios";
import styled from "styled-components";
import { FaSignOutAlt } from 'react-icons/fa'
import { SiNextdotjs } from 'react-icons/si'

function Header() {
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

  return (
    <HeaderContainer>
      <Nav> 
        <LogoContainer>
          <SiNextdotjs size={28} />
          <LogoText>Paggo.app</LogoText>
        </LogoContainer>
        <UserContainer>
          {data?.user && (
            <>
              <UserName>{data?.user?.name}</UserName>
              <SignOutButton onClick={() => signOut()}>
                <FaSignOutAlt size={20} />
                Sign out
              </SignOutButton>
            </>
          )}
        </UserContainer>
      </Nav>
    </HeaderContainer>
  )
}

export default Header

const HeaderContainer = styled.header`
  width: 100%;
  padding: 1rem 2rem;
  background: #000;
  color: #fff;
`

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
`

const LogoText = styled.div`
  font-size: 1.5rem;
  margin-left: 0.5rem;
`

const UserContainer = styled.div`
  display: flex;
  align-items: center;
`

const UserName = styled.div`
  margin-right: 1rem;
  font-size: 1rem;
`

const SignOutButton = styled.button`
  display: flex;
  align-items: center;
  background-color: #333;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #555;
  }

  svg {
    margin-right: 0.5rem;
  }
`
