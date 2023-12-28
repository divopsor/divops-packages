import { useState, useEffect } from 'react';
import { useWindowSize } from './useWindowSize';

export function useElementDisplay(selector: string) {
  const { width } = useWindowSize();
  const [display, setDisplay] = useState<string | undefined>(undefined);

  useEffect(() => {
    const el = document.querySelector(selector);
    if (el == null) {
      return;
    }

    const displayValue = (el as any).computedStyleMap().get('display').value;

    setDisplay(displayValue);
  }, [width]);

  return { display } as const;
}
