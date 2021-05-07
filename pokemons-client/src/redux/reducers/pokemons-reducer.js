// Constants
import * as types from "../constants/pokemons-constants";

const initialState = {
	pokemons: [],
	favouritePokemons: [],
	teamPokemons: [],

	totalCount: 0,

	isFetchingData: false,
	inInAction: false
};

const pokemons = (state = initialState, action) => {
	switch (action.type) {
		// GET POKEMONS
		case types.GET_POKEMONS_REQUEST: {
			return {
				...state,
				isFetchingData: true,
			};
		}
		case types.GET_POKEMONS_SUCCESS: {
			const { pokemons, totalCount } = action.data;
			return {
				...state,
				pokemons,
				totalCount,
				isFetchingData: false,
			};
		}
		case types.GET_POKEMONS_FAILURE: {
			return {
				...state,
				isFetchingData: false,
			};
		}

		// GET FAVOURITE POKEMONS
		case types.GET_FAVOURITE_POKEMONS_REQUEST: {
			return {
				...state,
				isFetchingData: true,
			};
		}
		case types.GET_FAVOURITE_POKEMONS_SUCCESS: {
			return {
				...state,
				isFetchingData: false,
				favouritePokemons: [...action.favouritePokemons],
			};
		}
		case types.GET_FAVOURITE_POKEMONS_FAILURE: {
			return {
				...state,
				isFetchingData: false,
			};
		}

		// GET TEAM POKEMONS
		case types.GET_TEAM_POKEMONS_REQUEST: {
			return {
				...state,
				isFetchingData: true,
			};
		}
		case types.GET_TEAM_POKEMONS_SUCCESS: {
			return {
				...state,
				isFetchingData: false,
				teamPokemons: [...action.teamPokemons],
			};
		}
		case types.GET_TEAM_POKEMONS_FAILURE: {
			return {
				...state,
				isFetchingData: false,
			};
		}

		// ADD TO FAVOURITE
		case types.ADD_TO_FAVOURITE_REQUEST: {
			return {
				...state,
				inInAction: true,
			};
		}
		case types.ADD_TO_FAVOURITE_SUCCESS: {
			const { body } = action;
			const newFavouritePokemons = body.favouritePokemons
				? [...body.favouritePokemons]
				: [...state.user.favouritePokemons];

			return {
				...state,
				inInAction: false,
				favouritePokemons: newFavouritePokemons,
			};
		}
		case types.ADD_TO_FAVOURITE_FAILURE: {
			return {
				...state,
				inInAction: false,
			};
		}

		// REMOVE FROM FAVOURITE
		case types.REMOVE_FROM_FAVOURITE_REQUEST: {
			return {
				...state,
				inInAction: true,
			};
		}
		case types.REMOVE_FROM_FAVOURITE_SUCCESS: {
			const { favouritePokemons } = action.body;
			return {
				...state,
				inInAction: false,
				favouritePokemons,
			};
		}
		case types.REMOVE_FROM_FAVOURITE_FAILURE: {
			return {
				...state,
				inInAction: false,
			};
		}

		// ADD TO TEAM
		case types.ADD_TO_TEAM_REQUEST: {
			return {
				...state,
				inInAction: true,
			};
		}
		case types.ADD_TO_TEAM_SUCCESS: {
			const { teamPokemons } = action;
			return {
				...state,
				inInAction: false,
				teamPokemons,
			};
		}
		case types.ADD_TO_TEAM_FAILURE: {
			return {
				...state,
				inInAction: false,
			};
		}

		// REMOVE FROM TEAM
		case types.REMOVE_FROM_TEAM_REQUEST: {
			return {
				...state,
				inInAction: true,
			};
		}
		case types.REMOVE_FROM_TEAM_SUCCESS: {
			const { teamPokemons } = action;
			return {
				...state,
				inInAction: false,
				teamPokemons,
			};
		}
		case types.REMOVE_FROM_TEAM_FAILURE: {
			return {
				...state,
				inInAction: false,
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
