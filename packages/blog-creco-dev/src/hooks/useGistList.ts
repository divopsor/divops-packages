import { useQuery } from '@tanstack/react-query';
import { GistAPI } from '../api/gist';

export function useGistList(category: string) {
  const { data } = useQuery(
    ['API.of().readList', category],
    async () => GistAPI.of({ category }).readList(),
    { initialData: null },
  );

  return data;
}
