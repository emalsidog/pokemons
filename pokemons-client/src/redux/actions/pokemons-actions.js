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
			const pokemons = await Promise.all(promises);

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
			const pokemons = await Promise.all(promises);

			dispatch({
				type: types.GET_FAVOURITE_POKEMONS_SUCCESS,
				favouritePokemons: pokemons,
			});
		} catch (error) {
			dispatch({ type: types.GET_FAVOURITE_POKEMONS_FAILURE });
		}
	};
};
