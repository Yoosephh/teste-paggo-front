import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { createContext, useState } from "react"

const AuthContext = createContext();

export function AuthProvider({children}) {
  const [fileResponse, setFileResponse] = useState(null);
  const [authToken, setAuthToken] = useState(null);
  const [loading, setLoading] = useState(false);

  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin?callbackUrl=/Upload");
    },
  });

  function resetApp() {
    setFileResponse(null);
    setAuthToken(null);
    setLoading(false);
  }

  return (
      <AuthContext.Provider value={{session, fileResponse, setFileResponse, authToken, setAuthToken, loading, setLoading, resetApp}}>
        {children}
      </AuthContext.Provider>
  )
}

export default AuthContext;