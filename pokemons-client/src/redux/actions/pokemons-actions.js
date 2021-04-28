// Dependencies
import axios from "axios";

// Constants
import * as types from "../constants/pokemons-constants";

// pokeapi url
const _pokeapiURL = "https://pokeapi.co/api/v2";

// GET => Pokemons
export const getPokemonsAction = ({ offset, limit }) => {
	return async (dispatch) => {
		try {
			let pokemonsData = {
				totalCount: 0,
				pokemons: [],
			};
			const { data } = await axios.get(
				`${_pokeapiURL}/pokemon?offset=${offset}&limit=${limit}`
			);
			pokemonsData.totalCount = data.count;

			let promises = data.results.map((pokemon) =>
				axios.get(pokemon.url)
			);
			const pokemonsServerData = await Promise.all(promises);

			const pokemons = parsePokemonsData(pokemonsServerData);
			pokemonsData.pokemons = pokemons;

			dispatch({ type: types.GET_POKEMONS_SUCCESS, pokemonsData });
		} catch (error) {}
	};
};

// GET => Favourite pokemons
export const getFavouritePokemons = (userFavouritePokemonIds) => {
	return async (dispatch) => {
		dispatch({ type: types.GET_FAVOURITE_POKEMONS_REQUEST });

		try {
			let promises = userFavouritePokemonIds.map((pokemon) =>
				axios.get(`${_pokeapiURL}/pokemon/${pokemon.pokemonId}`)
			);
			const pokemonsData = await Promise.all(promises);

			const pokemons = parsePokemonsData(pokemonsData);

			dispatch({
				type: types.GET_FAVOURITE_POKEMONS_SUCCESS,
				favouritePokemons: pokemons,
			});
		} catch (error) {
			dispatch({ type: types.GET_FAVOURITE_POKEMONS_FAILURE });
		}
	};
};

// GET => Team pokemons
export const getTeamPokemons = (userTeamPokemonIds) => {
	return async (dispatch) => {
		dispatch({ type: types.GET_TEAM_POKEMONS_REQUEST });
		try {
			let promises = userTeamPokemonIds.map((pokemon) =>
				axios.get(`${_pokeapiURL}/pokemon/${pokemon.pokemonId}`)
			);
			const pokemonsData = await Promise.all(promises);

			const pokemons = parsePokemonsData(pokemonsData);

			dispatch({
				type: types.GET_TEAM_POKEMONS_SUCCESS,
				teamPokemons: pokemons,
			});
		} catch (error) {
			dispatch({ type: types.GET_TEAM_POKEMONS_FAILURE });
		}
	};
};

const parsePokemonsData = (pokemonsData) => {
	return pokemonsData.map(({ data }) => {
		let stats = data.stats.map(stat => {
			return {
				name: stat.stat.name,
				value: stat.base_stat
			}
		})

		let types = data.types.map(type => {
			return {
				name: type.type.name
			}
		})
		return {
			id: data.id,
			name: data.name,
			sprite: data.sprites.front_default,
			stats,
			types
		}
	})
}