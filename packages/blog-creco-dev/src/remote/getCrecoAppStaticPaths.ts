import { fetchListBuildtime } from './fetchListBuildtime';

export async function getCrecoAppStaticPaths({
  baseURL = 'https://blog.creco.dev',
  prefix = '/api/gist',
  category,
}: {
  baseURL?: string;
  prefix?: string;
  category: string;
}) {
  const list = await fetchListBuildtime({ baseURL, prefix, category });
  const paths = list.items
    .filter((item: any) => item.id != null)
    .map((item: any) => {
      return { params: { id: item.id } };
    });

  return {
    paths,
    fallback: true,
  };
}
