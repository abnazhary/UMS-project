import { jwtDecode } from "jwt-decode"; 
import { createContext, useEffect, useState, ReactNode } from "react";

interface UserData {
  id: number;
  name: string;
  email: string;
}

interface AuthContextProps {
  saveUserData: () => void;
  userData: UserData | null; 
}

interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextProps | null>(null);

export default function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [userData, setUserData] = useState<UserData | null>(null);

  const saveUserData = () => {
    const encodedToken = localStorage.getItem("userToken");
    if (encodedToken) {
      const decodedToken = jwtDecode<UserData>(encodedToken); 
      setUserData(decodedToken);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      saveUserData();
    }
  }, []);

  return (
    <AuthContext.Provider value={{ saveUserData, userData }}>
      {children}
    </AuthContext.Provider>
  );
}
