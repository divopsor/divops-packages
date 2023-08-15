import { HTMLAttributes, forwardRef } from 'react';
import { HeaderLogo } from './HeaderLogo';

export type HeaderProps = HTMLAttributes<HTMLDivElement>;

export const HeaderImpl = forwardRef<HTMLElement, HeaderProps>((props, ref) => {
  const { children, ...restProps } = props;
  const height = 48;

  return (
    <>
      <div
        style={{
          position: 'relative',
          top: 0,
          height: `${height}px`,
          width: '100%',
        }}
      />

      <header
        ref={ref}
        style={{
          backgroundColor: 'white',
          position: 'fixed',
          top: 0,
          height: `${height}px`,
          width: '100%',
        }}
        {...restProps}
      >
        {children}
      </header>
    </>
  );
});

HeaderImpl.displayName = 'Header';

export const Header = Object.assign(HeaderImpl, { Logo: HeaderLogo });
