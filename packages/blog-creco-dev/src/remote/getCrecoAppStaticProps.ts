import { fetchListBuildtime } from './fetchListBuildtime';

export async function getCrecoAppStaticProps(context: { params?: any }, {
  baseURL = 'https://blog.creco.dev',
  prefix = '/api/gist',
  category,
}: {
  baseURL?: string;
  prefix?: string;
  category: string;
}) {
  const { params } = context;

  const posts = await fetchListBuildtime({ baseURL, prefix, category });
  const target = posts.items.find((post: any) => post.id === params.id)!;

  if (target == null) {
    return { props: { post: { id: params.id } } };
  }

  return { props: { post: target } };
}
