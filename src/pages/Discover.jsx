import { useDispatch, useSelector } from 'react-redux';
import { Error, Loader, SongCard } from '../components';
import { useGetTopChartsQuery } from '../redux/services/shazamCore';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Discover = () => {
	const [auth, setAuth] = useState(false);
	const [name, setName] = useState('');
	axios.defaults.withCredentials = true;

	useEffect(() => {
		axios
			.get('http://localhost:8000')
			.then((res) => {
				if (res.data.Status === 'Success') {
					setAuth(true);
					setName(res.data.name);
				} else {
					setAuth(false);
					setMessage(res.data.Error);
				}
			})
			.then((err) => console.log(err));
	}, []);
	const handleDelete = () => {
		axios
			.get('http://localhost:8000/logout')
			.then((res) => {
				window.location.reload();
			})
			.catch((err) => console.log(err));
	};

	const { activeSong, isPlaying } = useSelector(
		(state) => state.player
	);

	const { data, isFetching, error } = useGetTopChartsQuery();

	if (isFetching) return <Loader title='Loading songs...' />;
	if (error) return <Error />;

	return (
		<div className='flex flex-col'>
			<div
				className='w-full flex justify-between items-center
            sm:flex-row flex-col mt-4 mb-10'
			>
				{auth ? (
					<div className='flex gap-5 justify-center items-center'>
						<h2 className='font-bold text-3xl text-white text-left'>
							Welcome back {name}!
						</h2>
						<button
							className='bg-white/5 bg-opacity-80 backdrop-blur-sm text-white font-bold p-3 text-lg rounded-lg outline-none sm:mt-0 mt-5'
							onClick={handleDelete}
						>
							Logout
						</button>
					</div>
				) : (
					<div className='flex gap-5 justify-center items-center'>
						<h3>{}</h3>
						{/* <h3 className='font-bold text-3xl text-white text-left'>
							Hello! 
						</h3> */}
						<Link
							to='/login'
							className='bg-white/5 bg-opacity-80 backdrop-blur-sm text-white font-bold p-3 text-lg rounded-lg outline-none sm:mt-0 mt-5'
						>
							Login
						</Link>
					</div>
				)}

				{/* <select
					onChange={(e) => dispatch(selectGenreListId(e.target.value))}
					value={genreListId || 'pop'}
					className='bg-black text-gray-300 p-3 text-sm rounded-lg outline-none sm:mt-0 mt-5'
				>
					{genres.map((genre) => (
						<option key={genre.value}>{genre.title}</option>
					))}
				</select> */}
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
		</div>
	);
};

export default Discover;
