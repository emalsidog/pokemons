// Constants
import * as pokemonsTypes from "../constants/pokemons-constants";
import * as favouritePokemonsTypes from "../constants/favourite-pokemons-constants";
import * as teamPokemonsTypes from "../constants/team-pokemons-constants";

const initialState = {
	pokemons: [],
	favouritePokemons: [],
	teamPokemons: [],

	totalCount: 0,

	isLoading: false,
};

const pokemons = (state = initialState, action) => {
	switch (action.type) {
		case pokemonsTypes.GET_POKEMONS_REQUEST: {
			return {
				...state,
				isLoading: true,
			};
		}
		case pokemonsTypes.GET_POKEMONS_SUCCESS: {
			const { pokemons, totalCount } = action.data;
			return {
				...state,
				pokemons,
				totalCount,
				isLoading: false,
			};
		}
		case pokemonsTypes.GET_POKEMONS_FAILURE: {
			return {
				...state,
				isLaoding: false,
			};
		}

		// GET FAVOURITE POKEMONS
		case favouritePokemonsTypes.GET_FAVOURITE_POKEMONS_REQUEST: {
			return {
				...state,
				isLoading: true,
			};
		}
		case favouritePokemonsTypes.GET_FAVOURITE_POKEMONS_SUCCESS: {
			return {
				...state,
				isLoading: false,
				favouritePokemons: [...action.favouritePokemons],
			};
		}
		case favouritePokemonsTypes.GET_FAVOURITE_POKEMONS_FAILURE: {
			return {
				...state,
				isLoading: false,
			};
		}

		// GET TEAM POKEMONS
		case teamPokemonsTypes.GET_TEAM_POKEMONS_REQUEST: {
			return {
				...state,
				isLoading: true,
			};
		}
		case teamPokemonsTypes.GET_TEAM_POKEMONS_SUCCESS: {
			return {
				...state,
				isLoading: false,
				teamPokemons: [...action.teamPokemons],
			};
		}
		case teamPokemonsTypes.GET_TEAM_POKEMONS_FAILURE: {
			return {
				...state,
				isLoading: false,
			};
		}

		default: {
			return {
				...state,
			};
		}
	}
};

export default pokemons;
