const cache = new Map<string, any>();

export async function fetchListBuildtime({
  baseURL = 'https://blog.creco.dev',
  prefix = '/api/gist',
  category,
}: {
  baseURL?: string;
  prefix?: string;
  category: string;
}) {
  const url = `${baseURL}${prefix}/${category}/list`;

  if (cache.has(url)) {
    return cache.get(url);
  }

  const { data: posts } = await fetch(url).then((res) => res.json());

  cache.set(url, posts);

  return posts;
}
