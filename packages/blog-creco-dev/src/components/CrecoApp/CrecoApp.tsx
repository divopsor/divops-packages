import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';
import { GlobalCss } from '../GlobalCss';

interface CrecoAppProps {
  additionalCss?: string;
  children?: ReactNode;
  queryClient?: QueryClient;
}

export function CrecoApp({ additionalCss = '', children, queryClient = new QueryClient() }: CrecoAppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <div className='mobile-ui' style={{ width: 0, height: 0 }} />
      <div className='desktop-ui' style={{ width: 0, height: 0 }} />
      <GlobalCss
        additionalCss={`
          ${additionalCss}
          .Post img {
            border-radius: 16px;
          }
        `}
      />
    </QueryClientProvider>
  );

}

CrecoApp.Heads = function CrecoAppHeads() {
  return (
    <>
      <meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=0, viewport-fit=cover" name="viewport" />
      <link rel="shortcut icon" type="image/x-icon" href="/post/favicon.ico" />
    </>
  );
};
