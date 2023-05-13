import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useGetTopChartsQuery } from '../redux/services/shazamCore';
import { Error, Loader, SongCard } from '../components';

const CountryTracks = () => {
	const [country, setCountry] = useState('');
	const { activeSong, isPlaying } = useSelector((state) => state.player);
	const { data, isFetching, error } = useGetTopChartsQuery(20);

	useEffect(() => {
		axios({
		  method: 'GET',
		  url: 'https://geo.ipify.org/api/v2/country?apiKey=at_PR5UvSwPxF6DyUJGnebPkoZ0MFNBU',
		  responseType: 'stream',
		}).then(function (response) {
		  let data = JSON.parse(response.data);
		  setCountry(data.location.country);
		});
	  }, [country]);

	if (isFetching) return <Loader title='Loading songs...' />;
	if (error) return <Error />;

	return (
		<>
			<div className='flex flex-col'>
				<h2 className='font-bold text-3xl text-white text-left mt-4 mb-10'>
					Around you <span>{country}</span>
				</h2>
			</div>
			<div className='flex flex-wrap sm:justify-start justify-center gap-8'>
				{data?.tracks?.map((song, i) => (
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

export default CountryTracks;
