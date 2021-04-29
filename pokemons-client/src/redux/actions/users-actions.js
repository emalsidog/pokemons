// Dependencies
import axios from "axios";

// Constatns
import * as types from "../constants/users-constants";

// Utils
import { AxiosGetRequest } from "../utils/server-request";
import { isUnauthorized } from "../utils/is-unauthorized";

// pokeapi url
const _pokeapiURL = "https://pokeapi.co/api/v2";

export const getUsers = (page = 1) => {
	return async (dispatch) => {
		dispatch({
			type: types.GET_USERS_REQUEST,
		});

		try {
            
			const { data } = await AxiosGetRequest(`/users?page=${page}`);
			const { users, totalCount, limit } = data.body;

			let parsedUsers = await Promise.all(
				users.map(async (user) => {
					const dbTeamPokemons = user.teamPokemons.map((pokemon) => {
						return axios.get(
							`${_pokeapiURL}/pokemon/${pokemon.pokemonId}`
						);
					});

					const pokemonsData = await Promise.all(dbTeamPokemons);

					const parsedPokemonsData = pokemonsData.map(({ data }) => {
						const { id, sprites } = data;
						return {
							id,
							sprite: sprites.front_default,
						};
					});

					return {
						...user,
						teamPokemons: parsedPokemonsData,
					};
				})
			);
            
			dispatch({
				type: types.GET_USERS_SUCCESS,
				response: {
					status: data.status,
					users: parsedUsers,
                    totalCount: totalCount,
                    limit
				},
			});

		} catch (error) {
			if (isUnauthorized(error.reponse.status)) {
			}

			dispatch({
				type: types.GET_USERS_FAILURE,
				status: error.response.data.status,
			});
		}
	};
};
