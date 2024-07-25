'use client'
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { createContext, useEffect, useState } from "react"

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [fileResponse, setFileResponse] = useState("Please, submit an image.");
  const [selectedFile, setSelectedFile] = useState(null);
  const [authToken, setAuthToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const { data: session, status } = useSession();

  useEffect(() => {
    if (session) {
      setAuthToken(session.accessToken);
    }
    if (status === "unauthenticated") {
      router.push("/Signin");
    }
    if (status === "authenticated") {
      router.push("/Upload");
    }
  }, [session, status]);

  return (
    <AuthContext.Provider value={{ 
      session, 
      fileResponse, 
      setFileResponse, 
      authToken, 
      setAuthToken, 
      loading, 
      setLoading, 
      selectedFile, 
      setSelectedFile
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
