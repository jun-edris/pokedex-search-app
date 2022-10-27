import React, { useState } from 'react';

const url = `https://pokeapi.co/api/v2/pokemon`;
const App = () => {
	const [pokemon, setPokemon] = useState({});
	const [search, setSearch] = useState('');

	const findPokemon = async (e) => {
		if (search === '' || null || undefined) {
			return;
		} else {
			let toBesearched = search?.toLowerCase();

			fetch(`${url}/${toBesearched}`, { method: 'get' })
				.then((response) => response.json())
				.then((data) => {
					const searchedPokemon = {
						imgUrl: data?.sprites?.front_default,
						name: data?.species?.name,
						url: data?.species?.url,
					};

					setPokemon(searchedPokemon);
					return fetch(`${searchedPokemon?.url}`);
				})
				.then((response) => response.json())
				.then((data1) => {
					setPokemon((prev) => ({ ...prev, color: data1?.color?.name }));
				})
				.catch((err) => {
					console.error('Request failed', err);
				});
		}

		e.preventDefault();
	};

	return (
		<div className="container mx-auto px-4 h-screen flex flex-col align-center justify-center">
			<h1 className="text-6xl text-yellow-400 font-bold text-center">
				PokeDex Search App
			</h1>
			<div
				className={`container mt-10 mx-auto flex flex-col align-center justify-center gap-y-10 p-12 lg:w-1/2 rounded-lg drop-shadow-lg`}
				style={{
					backgroundColor: `${pokemon && `${pokemon?.color}`}`,
				}}
			>
				{pokemon ? (
					<div className="flex flex-col align-center justify-center">
						<img
							src={pokemon && pokemon?.imgUrl}
							width={150}
							height={150}
							alt={pokemon && pokemon?.name}
							className="mx-auto"
						/>
					</div>
				) : null}

				<form
					onSubmit={(e) => findPokemon(e)}
					className=" flex flex-col align-center justify-center align-center mx-auto mt-3 bg-white rounded-lg w-full py-4 px-6"
				>
					{pokemon ? (
						<span className="text-center text-xl font-bold">
							{pokemon && pokemon?.name}
						</span>
					) : null}

					<input
						type="text"
						name="search"
						value={search}
						onChange={(ev) => setSearch(ev.target.value)}
						className="bg-gray-200 py-2 px-3 rounded mt-5"
						placeholder="Enter Pokemon name..."
					/>
					<button
						type="submit"
						className="border text-white bg-gray-500 py-2 px-5 rounded mt-2"
					>
						Search
					</button>
				</form>
			</div>
		</div>
	);
};

export default App;
