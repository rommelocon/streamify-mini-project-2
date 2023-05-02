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
		getTopCharts: builder.query({ query: () => '/charts/track?startFrom=5' }),
	}),
});

export const { useGetTopChartsQuery } = shazamCoreApi;
