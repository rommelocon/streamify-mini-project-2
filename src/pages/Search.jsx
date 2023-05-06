import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useGetSongsBySearchQuery } from '../redux/services/shazamCore';
import { Error, Loader, SongCard } from '../components';

const Search = () => {
	const { searchTerm } = useParams();
	const { activeSong, isPlaying } = useSelector((state) => state.player);
	const { data, isFetching, error } = useGetSongsBySearchQuery(searchTerm);

	if (isFetching) return <Loader title='Loading songs...' />;
	if (error) return <Error />;

	const song = data?.tracks?.hits?.map((song) => song.track);
	return (
		<>
			<div className='flex flex-col'>
				<h2 className='font-bold text-3xl text-white text-left mt-4 mb-10'>
					Showing result for <span className='font-black'>{searchTerm}</span>
				</h2>
			</div>
			<div className='flex flex-wrap sm:justify-start justify-center gap-8'>
				{song.map((song, i) => (
					<SongCard
						key={song.key}
						song={song}
						isPlaying={isPlaying}
						activeSong={activeSong}
						data={data.tracks}
						i={i}
					/>
				))}
			</div>
		</>
	);
};

export default Search;
