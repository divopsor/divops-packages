import { useQuery } from '@tanstack/react-query';
import { GistAPI } from '../api/gist';

export function useGistItem(category: string, id: string, { prefix } = { prefix: '/github-api/api/gist' }) {
  const { data } = useQuery(
    ['API.of().readItem', category, id],
    async () => GistAPI.of({ category, prefix }).readItem(id),
    { initialData: null },
  );

  return data;
}
