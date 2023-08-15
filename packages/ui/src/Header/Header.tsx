import { HTMLAttributes, forwardRef } from 'react';
import { HeaderLogo } from './HeaderLogo';

export type HeaderProps = HTMLAttributes<HTMLDivElement>;

export const HeaderImpl = forwardRef<HTMLElement, HeaderProps>((props, ref) => {
  const { children, ...restProps } = props;

  return (
    <>
      <header
        ref={ref}
        style={{
          position: 'fixed',
          top: 0,
          height: '48px',
          width: '100%',
        }}
        {...restProps}
      >
        {children}
      </header>
      <div style={{
        position: 'relative',
        top: 0,
        height: '48px',
        width: '100%',
      }}/>
    </>
  );
});

HeaderImpl.displayName = 'Header';

export const Header = Object.assign(HeaderImpl, { Logo: HeaderLogo });
