// Constants
import * as types from "../constants/pokemons-constants";

const initialState = {
    pokemons: [],
    favouritePokemons: [],
    teamPokemons: [],

    totalCount: 0,

    isLoading: false
}

const pokemons = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_POKEMONS_SUCCESS: {
            return {
                ...state, 
                pokemons: [...action.pokemonsData.pokemons],
                totalCount: action.pokemonsData.totalCount
            }
        }

        // GET FAVOURITE POKEMONS
        case types.GET_FAVOURITE_POKEMONS_REQUEST: {
            return {
                ...state,
                isLoading: true
            }
        }
        case types.GET_FAVOURITE_POKEMONS_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                favouritePokemons: [...action.favouritePokemons]
            }
        }
        case types.GET_FAVOURITE_POKEMONS_FAILURE: {
            return {
                ...state,
                isLoading: false,
            }
        }

        // GET TEAM POKEMONS
        case types.GET_TEAM_POKEMONS_REQUEST: {
            return {
                ...state,
                isLoading: true
            }
        }
        case types.GET_TEAM_POKEMONS_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                teamPokemons: [...action.teamPokemons]
            }
        }
        case types.GET_TEAM_POKEMONS_FAILURE: {
            return {
                ...state,
                isLoading: false,
            }
        }

        default: {
            return {
                ...state
            }
        }
    }
}

export default pokemons;