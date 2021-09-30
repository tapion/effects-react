import { createContext } from "react";

const AuthContext = createContext({
    isLogin: false,
});

export default AuthContext;