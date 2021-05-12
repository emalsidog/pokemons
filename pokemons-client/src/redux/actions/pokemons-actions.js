// Constants
import * as types from "../constants/pokemons-constants";

// GET POKEMONS

export const getPokemonsRequest = ({ page, limit }) => ({
	type: types.GET_POKEMONS_REQUEST,
	data: {
		page,
		limit,
	},
});

export const getPokemonsSuccess = (data) => ({
	type: types.GET_POKEMONS_SUCCESS,
	data
});

export const getPokemonsFailure = () => ({
	type: types.GET_POKEMONS_FAILURE,
});

// GET FAVOURITE

export const getFavouritePokemonsRequest = (sort) => ({
	type: types.GET_FAVOURITE_POKEMONS_REQUEST,
	sort
});

export const getFavouritePokemonsSuccess = (favouritePokemons) => ({
	type: types.GET_FAVOURITE_POKEMONS_SUCCESS,
	favouritePokemons
});

export const getFavouritePokemonsFailure = () => ({
	type: types.GET_FAVOURITE_POKEMONS_FAILURE
});

// ADD TO FAVOURITE

export const addToFavouriteRequest = (pokemonId) => ({
	type: types.ADD_TO_FAVOURITE_REQUEST,
	pokemonId
});

export const addToFavouriteSuccess = (body) => ({
	type: types.ADD_TO_FAVOURITE_SUCCESS,
	body
});

export const addToFavouriteFailure = () => ({
	type: types.ADD_TO_FAVOURITE_FAILURE
})

// REMOVE FROM FAVOURITE

export const removeFromFavouriteRequest = (pokemonId) => ({
	type: types.REMOVE_FROM_FAVOURITE_REQUEST,
	pokemonId
});

export const removeFromFavouriteSuccess = (body) => ({
	type: types.REMOVE_FROM_FAVOURITE_SUCCESS,
	body
});

export const removeFromFavouriteFailure = () => ({
	type: types.REMOVE_FROM_FAVOURITE_FAILURE
})

// GET TEAM

export const getTeamPokemonsRequest = () => ({
	type: types.GET_TEAM_POKEMONS_REQUEST
});

export const getTeamPokemonsSuccess = (teamPokemons) => ({
	type: types.GET_TEAM_POKEMONS_SUCCESS,
	teamPokemons
});

export const getTeamPokemonsFailure = () => ({
	type: types.GET_TEAM_POKEMONS_FAILURE
});

// ADD TO TEAM
export const addToTeamRequest = (pokemonId) => ({
	type: types.ADD_TO_TEAM_REQUEST,
	pokemonId
});

export const addToTeamSuccess = (teamPokemons) => ({
	type: types.ADD_TO_TEAM_SUCCESS,
	teamPokemons
});

export const addToTeamFailure = () => ({
	type: types.ADD_TO_TEAM_FAILURE
});

// REMOVE FROM TEAM

export const removeFromTeamRequest = (pokemonId) => ({
	type: types.REMOVE_FROM_TEAM_REQUEST,
	pokemonId
});

export const removeFromTeamSuccess = (teamPokemons) => ({
	type: types.REMOVE_FROM_TEAM_SUCCESS,
	teamPokemons
});

export const removeFromTeamFailure = () => ({
	type: types.REMOVE_FROM_TEAM_FAILURE
});
