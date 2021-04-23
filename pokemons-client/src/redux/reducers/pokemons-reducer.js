// Constants
import * as types from "../constants/pokemons-constants";

const initialState = {
    pokemons: [],

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
        default: {
            return {
                ...state
            }
        }
    }
}

export default pokemons;