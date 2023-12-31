import { HTMLAttributes } from 'react';

export const Post = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      {...props}
      className={className}
      style={{
        fontSize: '1.6rem',
        wordBreak: 'keep-all',
        ...props.style,
      }}
    />
  );
};
