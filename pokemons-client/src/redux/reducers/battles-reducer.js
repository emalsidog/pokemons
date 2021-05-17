// Constants
import * as battleTypes from "../constants/battles-constants";

const initialState = {
    battleResult: {},

    battlesHistory: [],

    isLoading: false,
    status: {
        isError: false,
        message: ""
    }
}

const battles = (state = initialState, action) => {
    switch(action.type) {
        // Battle
        case battleTypes.BATTLE_REQUEST: {
            return {
                ...state,
                isLoading: true
            }
        }
        case battleTypes.BATTLE_SUCCESS: {
            const { winner, loser, result } = action.response;
            return {
                ...state,
                isLoading: false,
                battleResult: {
                    winner: { ...winner},
                    loser: { ...loser},
                    result
                }
            }
        }
        case battleTypes.BATTLE_FAILURE: {
            return {
                ...state,
                isLoading: false
            }
        }

        // Battle history
        case battleTypes.GET_BATTLES_HISTORY_REQUEST: {
            return {
                ...state,
                isLoading: true
            }
        }
        case battleTypes.GET_BATTLES_HISTORY_SUCCESS: {
            const { battles } = action;
            return {
                ...state,
                isLoading: false,
                battlesHistory: [...battles]
            }
        }
        case battleTypes.GET_BATTLES_HISTORY_FAILURE: {
            return {
                ...state,
                isLoading: false,
            }
        }

        // Clear battle result
        case battleTypes.CLEAR_BATTLE_RESULT: {
            return {
                ...state,
                battleResult: []
            }
        }

        default: {
            return {
                ...state
            }
        }
    }
}

export default battles;