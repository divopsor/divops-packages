import { useQuery } from '@tanstack/react-query';
import { GistAPI } from '../api/gist';

export function useGistList(category: string, { prefix } = { prefix: '/github-api/api/gist' }) {
  const { data } = useQuery(
    ['API.of().readList', category],
    async () => GistAPI.of({ category, prefix }).readList(),
    { initialData: null },
  );

  return data;
}
