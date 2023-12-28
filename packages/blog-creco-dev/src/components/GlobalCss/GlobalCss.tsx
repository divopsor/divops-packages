import { useEffect, useState } from 'react';
import { GLOBAL_CSS } from './constants';

function useRendered() {
  const [isRendered, setIsRendered] = useState<boolean>(false);

  useEffect(() => {
    setIsRendered(true);
  }, []);

  return isRendered;
}

export const GlobalCss = ({ additionalCss }: { additionalCss?: string }) => {
  const isRendered = useRendered();

  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line react/no-unknown-property
    <style global>
      {GLOBAL_CSS}
      {isRendered ? additionalCss : null}
    </style>
  );
};
