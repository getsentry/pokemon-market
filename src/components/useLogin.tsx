import useLocalstorage from "@/components/useLocalstorage";
import { useCallback, useMemo } from "react";

const KEY = "auth";

export default function useLogin() {
  const { get, set } = useLocalstorage();

  const login = useCallback((username: string) => {
    set(KEY, username);
  }, [set]);

  const logout = useCallback(() => {
    set(KEY, '');
  }, [set]);

  const username = useMemo(() => get(KEY) as undefined | string, [get]);

  return {
    isLoggedIn: Boolean(username),
    username,
    login,
    logout,
  };
}
