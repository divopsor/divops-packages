import { useQuery } from '@tanstack/react-query';
import { GistAPI } from '../api/gist';

export function useGistItem(category: string, id: string) {
  const { data } = useQuery(
    ['API.of().readItem', category, id],
    async () => GistAPI.of({ category }).readItem(id),
    { initialData: null },
  );

  return data;
}
