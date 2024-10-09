import { createContext, ReactNode, useCallback, useEffect, useState } from "react";

function useReadLocalStorage() {
  const [value, setValue] = useState<Record<string, unknown>>({});

  useEffect(() => {
    setValue(JSON.parse(localStorage.getItem("storage") ?? "{}"));
  }, []);

  const get = useCallback((name: string) => value[name], [value]);

  const set = useCallback((name: string, value: unknown) => {
    if (typeof window !== "undefined") {
      const storage = JSON.parse(
        window.localStorage.getItem("storage") ?? "{}"
      );
      const newStorage = {
        ...storage,
        [name]: value,
      };
      window.localStorage.setItem("storage", JSON.stringify(newStorage));
      setValue(newStorage);
    }
  }, []);

  return { get, set };
}

interface ProviderProps {
  children?: ReactNode;
}

export const LocalStorageContext = createContext<
  ReturnType<typeof useReadLocalStorage>
>({
  get: () => undefined,
  set: () => {},
});

export function LocalStorageContextProvider({ children }: ProviderProps) {
  const contextValue = useReadLocalStorage();

  return (
    <LocalStorageContext.Provider value={contextValue}>
      {children}
    </LocalStorageContext.Provider>
  );
}
