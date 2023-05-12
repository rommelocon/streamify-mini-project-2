import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const shazamCoreApi = createApi({
	reducerPath: 'shazamCoreApi',
	baseQuery: fetchBaseQuery({
		baseUrl: 'https://shazam.p.rapidapi.com/',
		prepareHeaders: (headers) => {
			headers.set(
				'X-RapidAPI-Key',
				// '4fdde24a54msh249deb3565fe0ecp13bac4jsn1c4448a30513'
				// 'a7f73ad2c8msh0d95dd112ccfd2ap10d3b8jsn00dc82742c9f'
				'27d852fb0amshe292fdfc756c27ap1968dejsn9b9f913c883b'
			);

			return headers;
		},
	}),
	endpoints: (builder) => ({
		getTopCharts: builder.query({ query: (startFromList = 0) => `/charts/track?startFrom=${startFromList}` }),
		getChartList: builder.query({ query: () => `https://shazam.p.rapidapi.com/charts/list` }),
		getSongDetails: builder.query({
			query: ({ songid }) => `/songs/get-details?key=${songid}`,
		}),
		getSongRelated: builder.query({
			query: ({ songid }) => `/songs/list-recommendations?key=${songid}`,
		}),
		getArtistDetails: builder.query({
			query: ({ artistId }) => `/artists/get-details?id=${artistId}`,
		}),
		getArtistTopSongDetails: builder.query({
			query: ({ artistId }) => `/artists/get-top-songs?id=${artistId}`,
		}),
		getSongsByCountry: builder.query({
			query: (countryCode) => `/charts/country?country_code=${countryCode}`,
		}),
		getSongsBySearch: builder.query({
			query: (searchTerm) => `/search?term=${searchTerm}`,
		}),
	}),
});

export const {
	useGetTopChartsQuery,
	useGetChartListQuery,
	useGetSongDetailsQuery,
	useGetSongRelatedQuery,
	useGetArtistDetailsQuery,
	useGetArtistTopSongDetailsQuery,
	useGetSongsByCountryQuery,
	useGetSongsBySearchQuery,
} = shazamCoreApi;
