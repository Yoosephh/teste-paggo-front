'use client'

import { SessionProvider } from "next-auth/react";
import { AuthProvider } from "./(contexts)/authContext";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <SessionProvider >
        <AuthProvider>
          <body>
            {children}
          </body>
        </AuthProvider>
      </SessionProvider>
    </html>
  );
}

