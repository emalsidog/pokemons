// Constants
import * as updateTypes from "../constants/user-update-constants";
import * as favouritePokemonsTypes from "../constants/user-favouritePokemons-constants";
import * as teamPokemonsTypes from "../constants/user-teamPokemons-constants";

const initialState = {
	user: null,
	fetchingUser: true,

	isLoading: false,
	status: {
		isError: false,
		message: "",
	},
};

const user = (state = initialState, action) => {
	switch (action.type) {
		// Set user
		// @desc - call in authReducer after successfull login
		case updateTypes.SET_USER: {
			return { ...state, user: { ...action.user } };
		}

		// Stop fetching
		// @desc - call if there is no token
		case updateTypes.STOP_FETCHING_USER: {
			return {
				...state,
				fetchingUser: false,
			};
		}

		// Get current user
		case updateTypes.GET_CURRENT_USER_REQUEST: {
			return {
				...state,
				fetchingUser: true,
				status: {
					...state.status,
				},
			};
		}
		case updateTypes.GET_CURRENT_USER_SUCCESS: {
			const { response } = action;
			return {
				...state,
				fetchingUser: false,
				isLoading: false,
				user: {
					...response.body.user,
				},
			};
		}
		case updateTypes.GET_CURRENT_USER_FAILURE: {
			return {
				...state,
				fetchingUser: false,
				isLoading: false,
			};
		}

		// Update name
		case updateTypes.UPDATE_NAME_REQUEST: {
			return {
				...state,
				isLoading: true,
			};
		}
		case updateTypes.UPDATE_NAME_SUCCESS: {
			const { body, status } = action.response;
			return {
				...state,
				isLoading: false,
				user: {
					...state.user,
					givenName: body.user.givenName,
					familyName: body.user.familyName,
				},
				status: { ...status },
			};
		}
		case updateTypes.UPDATE_NAME_FAILURE: {
			const { status } = action;
			return {
				...state,
				isLoading: false,
				status: { ...status },
			};
		}

		// Update email
		case updateTypes.UPDATE_EMAIL_REQUEST: {
			return {
				...state,
				isLoading: true,
			};
		}
		case updateTypes.UPDATE_EMAIL_SUCCESS: {
			const { body, status } = action.response;
			return {
				...state,
				isLoading: false,
				user: {
					...state.user,
					email: body.user.email,
				},
				status: { ...status },
			};
		}
		case updateTypes.UPDATE_EMAIL_FAILURE: {
			const { status } = action;
			return {
				...state,
				isLoading: false,
				status: { ...status },
			};
		}

		// Update username
		case updateTypes.UPDATE_USERNAME_REQUEST: {
			return {
				...state,
				isLoading: true,
			};
		}
		case updateTypes.UPDATE_USERNAME_SUCCESS: {
			const { body, status } = action.response;
			return {
				...state,
				isLoading: false,
				user: {
					...state.user,
					username: body.user.username,
				},
				status: { ...status },
			};
		}
		case updateTypes.UPDATE_USERNAME_FAILURE: {
			const { status } = action;
			return {
				...state,
				isLoading: false,
				status: { ...status },
			};
		}

		// Update phone
		case updateTypes.UPDATE_PHONE_REQUEST: {
			return {
				...state,
				isLoading: true,
			};
		}
		case updateTypes.UPDATE_PHONE_SUCCESS: {
			const { body, status } = action.response;
			return {
				...state,
				isLoading: false,
				user: {
					...state.user,
					phone: body.user.phone,
				},
				status: { ...status },
			};
		}
		case updateTypes.UPDATE_PHONE_FAILURE: {
			const { status } = action;
			return {
				...state,
				isLoading: false,
				status: { ...status },
			};
		}

		// Update war participant
		case updateTypes.UPDATE_WAR_PARTICIPANT_REQUEST: {
			return {
				...state,
				isLoading: true
			}	
		}
		case updateTypes.UPDATE_WAR_PARTICIPANT_SUCCESS: {
			const { status, body } = action.response;
			return {
				...state,
				isLoading: false,
				status: {
					...status
				},
				user: {
					...state.user,
					warParticipant: body.warParticipant
				}
			}
		}
		case updateTypes.UPDATE_WAR_PARTICIPANT_FAILURE: {
			return {
				...state,
				isLoading: false,
				status: {
					...action.status
				}
			}
		}

		// Add to favourite
		case favouritePokemonsTypes.ADD_TO_FAVOURITE_REQUEST: {
			return {
				...state,
				isLoading: true,
			};
		}
		case favouritePokemonsTypes.ADD_TO_FAVOURITE_SUCCESS: {
			const { status, body } = action.response;
			const newFavouritePokemons = body.favouritePokemons
				? [...body.favouritePokemons]
				: [...state.user.favouritePokemons];

			return {
				...state,
				isLoading: false,
				status: {
					...status,
				},
				user: {
					...state.user,
					favouritePokemons: newFavouritePokemons,
				},
			};
		}
		case favouritePokemonsTypes.ADD_TO_FAVOURITE_FAILURE: {
			return {
				...state,
				isLoading: false,
				status: {
					...action.status,
				},
			};
		}

		// Remove from favourite
		case favouritePokemonsTypes.REMOVE_FROM_FAVOURITE_REQUEST: {
			return {
				...state,
				isLoading: true,
			};
		}
		case favouritePokemonsTypes.REMOVE_FROM_FAVOURITE_SUCCESS: {
			const { status, body } = action.response;
			return {
				...state,
				isLoading: false,
				status: {
					...status,
				},
				user: {
					...state.user,
					favouritePokemons: [...body.favouritePokemons],
				},
			};
		}
		case favouritePokemonsTypes.REMOVE_FROM_FAVOURITE_FAILURE: {
			return {
				...state,
				isLoading: false,
			};
		}

		// Add to team
		case teamPokemonsTypes.ADD_TO_TEAM_REQUEST: {
			return {
				...state,
				isLoading: true,
			};
		}
		case teamPokemonsTypes.ADD_TO_TEAM_SUCCESS: {
			const { status, body } = action.response;
			return {
				...state,
				isLoading: false,
				status: {
					...status,
				},
				user: {
					...state.user,
					teamPokemons: [...body.teamPokemons],
					warParticipant: body.warParticipant
				},
			};
		}
		case teamPokemonsTypes.ADD_TO_TEAM_FAILURE: {
			return {
				...state,
				isLoading: false,
				status: {
					...action.status,
				},
			};
		}

		// Remove from team
		case teamPokemonsTypes.REMOVE_FROM_TEAM_REQUEST: {
			return {
				...state,
				isLoading: true,
			};
		}
		case teamPokemonsTypes.REMOVE_FROM_TEAM_SUCCESS: {
			const { status, body } = action.response;
			return {
				...state,
				isLoading: false,
				status: {
					...status,
				},
				user: {
					...state.user,
					teamPokemons: [...body.teamPokemons],
					warParticipant: body.warParticipant
				},
			};
		}
		case teamPokemonsTypes.REMOVE_FROM_TEAM_FAILURE: {
			return {
				...state,
				isLoading: false,
				status: {
					...action.status,
				},
			};
		}

		default: {
			return { ...state };
		}
	}
};

export default user;
