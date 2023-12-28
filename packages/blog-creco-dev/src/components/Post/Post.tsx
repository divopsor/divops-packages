import { HTMLAttributes } from 'react';

export const Post = (props: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      {...props}
      style={{
        fontSize: '1.6rem',
        whiteSpace: 'pre-wrap',
        wordBreak: 'keep-all',
        ...props.style,
      }}
    />
  );
};
