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

  const list = await fetchListBuildtime({ baseURL, prefix, category });
  const target = list.items.find((item: any) => item.id === params.id)!;

  if (target == null) {
    return { props: { item: { id: params.id } } };
  }

  return { props: { item: target } };
}
