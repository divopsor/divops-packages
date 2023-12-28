import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';

interface CrecoAppProps {
  additionalCss?: string;
  children?: ReactNode;
  queryClient?: QueryClient;
}

const defaultQueryClient = new QueryClient();

export function CrecoApp({ children, queryClient = defaultQueryClient }: CrecoAppProps) {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
      <div className='mobile-ui' style={{ width: 0, height: 0 }} />
      <div className='desktop-ui' style={{ width: 0, height: 0 }} />
    </>
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
