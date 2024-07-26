'use client'

import { SessionProvider } from "next-auth/react";
import  { AuthProvider } from "./(contexts)/authContext";
import "./global.css"
import Header from "./(components)/Header";

export default function RootLayout({ children }) {

  return (
    <html lang="en">
    <SessionProvider>
      <AuthProvider>
        <body>
        <Header />
        <main>
          {children}
        </main>
        </body>
      </AuthProvider>
    </SessionProvider>
    </html>
  );
}

