import { HTMLAttributes, forwardRef, useState } from 'react';

export type CardProps = HTMLAttributes<HTMLDivElement> & {
  useHover?: boolean;
};

export const CardImpl = forwardRef<HTMLDivElement, CardProps>((props, ref) => {
  const { useHover = false } = props;
  const [isHover, setIsHover] = useState(false);

  const handleMouseEnter = () => {
    setIsHover(true);
  };

  const handleMouseLeave = () => {
    setIsHover(false);
  };

  const divStyle: CardProps['style'] = {
    border: '1px solid black',
    borderRadius: '16px',
    padding: '8px 16px',
    margin: '4px',
    ...(useHover ? ({ backgroundColor: isHover ? '#c8c8c8' : '#F0F0F0' }) : {}),
    ...(useHover ? ({ cursor: 'pointer' }) : {}),
  };

  return (
    <div
      ref={ref}
      style={divStyle}
      onMouseEnter={useHover ? handleMouseEnter : () => {}}
      onMouseLeave={useHover ? handleMouseLeave : () => {}}
      {...props}
    />
  );
});

CardImpl.displayName = 'Card';

export const Card = Object.assign(CardImpl, {});
