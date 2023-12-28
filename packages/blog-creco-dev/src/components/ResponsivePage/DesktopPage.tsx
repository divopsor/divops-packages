import { HTMLAttributes } from 'react';
import { useElementDisplay } from './useElementDisplay';

interface DesktopPageProps extends HTMLAttributes<HTMLDivElement> {
  mainBackgroundColor: string;
  subBackgroundColor: string;
  fontColor: string;
  desktopPageWidth: string;
}

export const DesktopPage = ({
  mainBackgroundColor,
  subBackgroundColor,
  fontColor,
  desktopPageWidth,
  ...props
}: DesktopPageProps) => {
  const { display } = useElementDisplay('.desktop-ui');
  const { children, ...otherProps } = props;

  if (display === 'none') {
    return null;
  }

  return (
    <div
      {...otherProps}
      className={otherProps.className == null ? 'desktop-ui' : `desktop-ui ${otherProps.className}`}
      style={{
        backgroundColor: subBackgroundColor,
        minHeight: '100vh',
        color: fontColor,
        fontSize: '1.6rem',
        ...otherProps.style,
      }}
    >
      <div
        style={{
          backgroundColor: mainBackgroundColor,
          minHeight: '100vh',
          maxWidth: desktopPageWidth,
          padding: '16px 64px',
          boxShadow: `0px 0px 4px 20px ${mainBackgroundColor}`,
          fontSize: '1.6rem',
          margin: '0 auto',
        }}
      >
        {children}
      </div>
    </div>
  );
};
