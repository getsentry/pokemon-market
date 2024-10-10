import useLocalstorage from "@/components/useLocalstorage";
import { createContext, useCallback, useContext, useMemo, ReactNode } from "react";

type LoginState = string | undefined;
type LoginFn = (username: string) => void
type LogoutFn = () => void;
const LoginContext = createContext<[
  LoginState,
  LoginFn,
  LogoutFn,
]>([
  undefined,
  (_username: string) => {},
  () => {},
]);

const KEY = "auth";

export default function useLogin() {
  const [username, login, logout] = useContext(LoginContext);
  return {
    isLoggedIn: Boolean(username),
    username,
    login,
    logout,
  };
}

export function LoginContextProvider({children}: {children?: ReactNode}) {  
  const { get, set } = useLocalstorage();

  const login: LoginFn = useCallback((username: string) => {
    set(KEY, username);
  }, [set]);

  const logout: LogoutFn = useCallback(() => {
    set(KEY, '');
  }, [set]);

  const username: LoginState = useMemo(() => get(KEY), [get]);

  return <LoginContext.Provider value={[username, login, logout]}>{children}</LoginContext.Provider>
}
