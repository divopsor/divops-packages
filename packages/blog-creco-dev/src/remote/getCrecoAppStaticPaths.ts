import { fetchListBuildtime } from './fetchListBuildtime';

export async function getCrecoAppStaticPaths({
  baseURL = 'https://blog.creco.dev',
  prefix = '/apo/gist',
  category,
}: {
  baseURL?: string;
  prefix?: string;
  category: string;
}) {
  const posts = await fetchListBuildtime({ baseURL, prefix, category });
  const paths = posts.items.map((post: any) => {
    return { params: { id: post.id } };
  });

  return {
    paths,
    fallback: true,
  };
}
