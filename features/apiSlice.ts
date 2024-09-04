import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Game, Platform } from '../types/game.interface';

export const gamesApi = createApi({
  reducerPath: 'gamesApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://www.giantbomb.com/api/' }),
  endpoints: (builder) => ({
    getGames: builder.query<{ results: Game[]; total: number }, { page: number }>({
      query: ({ }) => `games/?api_key=ae82f26d109de9e9664fd08d0a98629a6dc23a1e&format=json`,
      transformResponse: (response: { results: any[]; total: number }) => ({
        results: response.results.map((item: any) => {
          const { name, image, platforms, original_release_date, description, deck, id } = item;

          const platformNames = platforms.map((platform: Platform) => platform.name);
          const date = new Date(original_release_date);
          const releaseDate = new Date(date).toLocaleString('en-us', { month: 'short', year: 'numeric' });

          return {
            name,
            image,
            platforms: platformNames,
            original_release_date: releaseDate,
            description,
            deck,
            id
          };
        }),
        total: response.total,
      }),
    }),
  }),
});

export const { useGetGamesQuery } = gamesApi;


