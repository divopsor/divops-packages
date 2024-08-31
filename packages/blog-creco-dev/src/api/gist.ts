import axios from 'axios';

async function get(url: string) {
  const { data } = await axios.get(url);

  return data;
}

export const GistAPI = {
  of: ({ category, prefix = '/github-api/gist' }: { category: string; prefix?: string }) => ({
    readList: async () => {
      if (category == null || category === '' || category === 'undefined') {
        return [];
      }
      const { data } = await get(`${prefix}/${category}/list`);
      return data.items;
    },
    readItem: (id: string) => {
      return get(`${prefix}/${category}/${id}`);
    },
    getList: async () => {
      const { data } = await get(`${prefix}/category`);
      return data;
    },
  }),
};
