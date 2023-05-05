import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { DetailsHeader, Error, Loader, RelatedSongs } from '../components';

import { useGetArtistDetailsQuery, useGetArtistTopSongDetailsQuery } from '../redux/services/shazamCore';
const ArtistDetails = () => {
	const { id: artistId } = useParams();
	const { activeSong, isPlaying } = useSelector((state) => state.player);
	const {
		data: artistData,
		isFetching: isFetchingArtistDetails,
		error,
	} = useGetArtistDetailsQuery({ artistId });

	const {
		data,
		isFetching: isFetchingArtistTopSongDetails,
		error: topSongError,
	} = useGetArtistTopSongDetailsQuery({ artistId });

	if (isFetchingArtistDetails || isFetchingArtistTopSongDetails) return <Loader title='Loading artist details' />;

	if (error || topSongError) return <Error />;

	const relatedSongRelated = data.data;
	return (
		<div className='flex flex-col'>
			<DetailsHeader artistId={artistId} artistData={artistData} />

			<RelatedSongs
				data={relatedSongRelated}
				artistId={artistId}
				isPlaying={isPlaying}
				activeSong={activeSong}
			/>
		</div>
	);
};
export default ArtistDetails;
