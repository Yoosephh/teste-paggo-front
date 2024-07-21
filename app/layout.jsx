
'use client'
import { getSession, SessionProvider } from "next-auth/react";
import AuthContext, { AuthProvider } from "./(contexts)/authContext";
import Nav from "./(components)/Nav";

export default function RootLayout({ children }) {

  return (
    <html lang="en">
    <SessionProvider>
      <AuthProvider>
        <body>
          <Nav />
          {children}
        </body>
      </AuthProvider>
    </SessionProvider>
    </html>
  );
}

