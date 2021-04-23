// Dependencies
import axios from "axios";

// Constants
import * as types from "../constants/pokemons-constants";

// GET => Pokemons
export const getPokemonsAction = ({ offset, limit }) => {
	return async (dispatch) => {
		try {
			let pokemonsData = {
				totalCount: 0,
				pokemons: [],
			};
			const { data } = await axios.get(
				`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
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
