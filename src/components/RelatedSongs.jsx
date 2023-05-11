import PlayPause from './PlayPause';
import SongBar from './SongBar';

const RelatedSongs = ({
	data,
	isPlaying,
	activeSong,
	handlePauseClick,
	handlePlayClick,
	artistId,
}) => {
	return (
		<>
			<div className='flex flex-col'>
				<h1 className='font-bold text-3xl text-white'>Related Songs:</h1>
				{data ? (
					<div className='mt-6 w-full flex flex-col'>
						{data?.map((song, i) => (
							<SongBar
								key={`${song.key}-${artistId}`}
								song={song}
								i={i}
								artistId={artistId}
								isPlaying={isPlaying}
								activeSong={activeSong}
								handlePauseClick={handlePauseClick}
								handlePlayClick={handlePlayClick}
							/>
						))}
					</div>
				) : (
					<p className='text-gray-400 text-base my-1'>No data available</p>
				)}
			</div>
			
		</>
	);
};

export default RelatedSongs;
