import { fetchListBuildtime } from './fetchListBuildtime';

export async function getStaticProps(context: { params: any }, {
  baseURL = 'https://blog.creco.dev',
  prefix = '/apo/gist',
  category,
}: {
  baseURL?: string;
  prefix?: string;
  category: string;
}) {
  const { params } = context;

  if (params?.id == null) {
    return { props: {} };
  }

  const posts = await fetchListBuildtime({ baseURL, prefix, category });
  const target = posts.items.find((post: any) => post.id === params!.id)!;

  return { props: { post: target } };
}