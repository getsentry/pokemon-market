import { useCallback, useEffect, useRef } from "react";

export function useLocalstorage(name: string, dflt: unknown) {
  const getRef = useRef(() => dflt);

  useEffect(() => {
    getRef.current = () => {
      const storage = JSON.parse(
        localStorage.getItem("storage") ?? "{}"
      );
      return (name in storage ? storage[name] : dflt) as unknown;
    };
  }, [name, dflt]);

  const set = useCallback((name: string, value: unknown) => {
    if (typeof window !== "undefined") {
      const storage = JSON.parse(
        window.localStorage.getItem("storage") ?? "{}"
      );
      storage[name] = value;
      window.localStorage.setItem("storage", JSON.stringify(storage));
    }
  }, []);

  return { get: getRef.current, set };
}
