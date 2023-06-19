// import { Octokit } from '@octokit/rest';

// export type GistFiles = Awaited<ReturnType<InstanceType<typeof Octokit>['gists']['create']>>['data']['files'];
export type GistFiles = {
  [key: string]: Partial<{
    [key: string]: unknown;
  }>;
};
export type JsonConvertible = {
  [P in keyof any]: P extends string | number | boolean | undefined ? P : JsonConvertible;
};
