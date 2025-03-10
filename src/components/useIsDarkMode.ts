import { useFlag } from "@unleash/nextjs/client";
import { useState, useEffect } from 'react';

export default function useIsDarkMode() {
  const isUnleashedDarkMode = useFlag('dark-mode');

  const [isReady, setIsReady] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setIsReady(true);
    }, 100);
  }, []);

  if ('window' in globalThis && window?.localStorage) {
    const storage = localStorage.getItem('pokemon_market:sntry_tb:unleash:overrides');
    const obj = storage ? JSON.parse(storage) : {};
    const overrideDarkMode = obj['dark-mode'];
    const isDarkMode = overrideDarkMode !== undefined ? overrideDarkMode : isUnleashedDarkMode;
    if (isReady) {
      console.log('we ready', {overrideDarkMode, isUnleashedDarkMode});
      return {isDarkMode: overrideDarkMode ?? isUnleashedDarkMode};
    } else {
      console.log('not ready')
      return {isDarkMode: isUnleashedDarkMode};
    }
  } else {
    return {isDarkMode: isUnleashedDarkMode};
  }
}
