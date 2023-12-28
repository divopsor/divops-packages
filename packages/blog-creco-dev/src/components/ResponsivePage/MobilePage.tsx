import { HTMLAttributes } from 'react';
import { useElementDisplay } from './useElementDisplay';

interface MobilePageProps extends HTMLAttributes<HTMLDivElement> {
  mainBackgroundColor: string;
  fontColor: string;
}

export const MobilePage = ({ mainBackgroundColor, fontColor, ...props }: MobilePageProps) => {
  const { display } = useElementDisplay('.mobile-ui');

  if (display === 'none') {
    return null;
  }

  return (
    <div
      {...props}
      className={props.className == null ? 'mobile-ui' : `mobile-ui ${props.className}`}
      style={{
        backgroundColor: mainBackgroundColor,
        minHeight: '100vh',
        color: fontColor,
        fontSize: '1.6rem',
        padding: '16px',
        ...props.style,
      }}
    />
  );
};
