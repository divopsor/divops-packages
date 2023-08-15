import { HTMLAttributes, forwardRef } from 'react';

export type HeaderLogoProps = HTMLAttributes<HTMLDivElement> & {
  src: string;
  alt?: string;
};

export const HeaderLogo = forwardRef<HTMLDivElement, HeaderLogoProps>((props, ref) => {
  const { children, src, alt, ...restProps } = props;

  return (
    <div
      ref={ref}
      style={{
        width: '92%',
        maxWidth: 'calc(100% - 48px)',
        height: '100%',
        margin: '0 auto',
      }}
      {...restProps}
    >
      <img
        src={src}
        style={{
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
        }}
        alt={alt}
      />
    </div>
  );
});

HeaderLogo.displayName = 'Header.Logo';
