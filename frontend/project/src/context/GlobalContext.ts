import { createContext, Dispatch, SetStateAction, useContext } from "react";

export interface AuthContextType {
    isAuthenticated: boolean;
    // setIsAutheticated: Dispatch<SetStateAction<boolean>>
}

export const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    // setIsAutheticated: () => {}
});

export const useAuthContext = useContext(AuthContext);