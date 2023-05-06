import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { DetailsHeader, Error, Loader, RelatedSongs } from '../components';

import {
	useGetArtistDetailsQuery,
	useGetArtistTopSongDetailsQuery,
} from '../redux/services/shazamCore';
import { playPause, setActiveSong } from '../redux/features/playerSlice';
const Account = () => {
	const dispatch = useDispatch();
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

	const handlePauseClick = () => {
		dispatch(playPause(false));
	};

	const handlePlayClick = (song, i) => {
		dispatch(setActiveSong({ song, data, i }));
		dispatch(playPause(true));
	};

	if (isFetchingArtistDetails || isFetchingArtistTopSongDetails)
		return <Loader title='Loading artist details' />;

	if (error || topSongError) return <Error />;

	const relatedSongRelated = data.data;

	return (
		<div className='flex flex-col'>
			<DetailsHeader artistId={artistId} artistData={artistData} />

			<RelatedSongs
				data={relatedSongRelated}
				isPlaying={isPlaying}
				activeSong={activeSong}
				handlePauseClick={handlePauseClick}
				handlePlayClick={handlePlayClick}
				artistId={artistId}
			/>
		</div>
	);
};
export default Account;
