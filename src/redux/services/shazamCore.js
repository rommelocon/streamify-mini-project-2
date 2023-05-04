import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const shazamCoreApi = createApi({
	reducerPath: 'shazamCoreApi',
	baseQuery: fetchBaseQuery({
		baseUrl: 'https://shazam.p.rapidapi.com/',
		prepareHeaders: (headers) => {
			headers.set(
				'X-RapidAPI-Key',
				'4fdde24a54msh249deb3565fe0ecp13bac4jsn1c4448a30513'
			);

			return headers;
		},
	}),
	endpoints: (builder) => ({
		getTopCharts: builder.query({ query: () => '/charts/track?startFrom=0' }),
		getSongDetails: builder.query({
			query: ({ songid }) => `/songs/get-details?key=${songid}`,
		}),
		getSongRelated: builder.query({
			query: ({ songid }) => `/songs/list-recommendations?key=${songid}`,
		}),
		getArtistDetails: builder.query({
			query: (artistId) => `/artists/get-details?id=${artistId}`,
		}),
	}),
});

export const {
	useGetTopChartsQuery,
	useGetSongDetailsQuery,
	useGetSongRelatedQuery,
	useGetArtistDetailsQuery,
} = shazamCoreApi;
