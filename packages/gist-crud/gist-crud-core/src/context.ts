import { Octokit } from '@octokit/rest';

export interface CreateContextOptions {
  token: string;
  baseUrl: string;
}

export interface Context {
  baseUrl: string;
  octokit: Octokit;
}

export function createContext({ token, baseUrl }: CreateContextOptions): Context {
  const octokit = new Octokit({
    auth: token,
    baseUrl,
  });

  return {
    baseUrl,
    octokit,
  };
}
