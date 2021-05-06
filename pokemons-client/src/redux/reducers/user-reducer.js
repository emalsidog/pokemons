// Constants
import * as updateTypes from "../constants/user-update-constants";
import * as favouritePokemonsTypes from "../constants/favourite-pokemons-constants";
import * as teamPokemonsTypes from "../constants/team-pokemons-constants";

const initialState = {
	user: null,
	fetchingUser: true,

	isLoading: false,
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
			};
		}
		case updateTypes.GET_CURRENT_USER_SUCCESS: {
			const { body } = action;
			return {
				...state,
				fetchingUser: false,
				isLoading: false,
				user: {
					...body.user,
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
			const { body } = action;
			return {
				...state,
				isLoading: false,
				user: {
					...state.user,
					givenName: body.user.givenName,
					familyName: body.user.familyName,
				},
			};
		}
		case updateTypes.UPDATE_NAME_FAILURE: {
			return {
				...state,
				isLoading: false,
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
			const { body } = action;
			return {
				...state,
				isLoading: false,
				user: {
					...state.user,
					email: body.user.email,
				},
			};
		}
		case updateTypes.UPDATE_EMAIL_FAILURE: {
			return {
				...state,
				isLoading: false,
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
			const { body } = action;
			return {
				...state,
				isLoading: false,
				user: {
					...state.user,
					username: body.user.username,
				},
			};
		}
		case updateTypes.UPDATE_USERNAME_FAILURE: {
			return {
				...state,
				isLoading: false,
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
			const { body } = action;
			return {
				...state,
				isLoading: false,
				user: {
					...state.user,
					phone: body.user.phone,
				},
			};
		}
		case updateTypes.UPDATE_PHONE_FAILURE: {
			return {
				...state,
				isLoading: false,
			};
		}

		// Update war participant
		case updateTypes.UPDATE_WAR_PARTICIPANT_REQUEST: {
			return {
				...state,
				isLoading: true,
			};
		}
		case updateTypes.UPDATE_WAR_PARTICIPANT_SUCCESS: {
			const { warParticipant } = action.body.user;
			return {
				...state,
				isLoading: false,
				user: {
					...state.user,
					warParticipant,
				},
			};
		}
		case updateTypes.UPDATE_WAR_PARTICIPANT_FAILURE: {
			return {
				...state,
				isLoading: false,
			};
		}

		// Add to favourite
		case favouritePokemonsTypes.ADD_TO_FAVOURITE_REQUEST: {
			return {
				...state,
				isLoading: true,
			};
		}
		case favouritePokemonsTypes.ADD_TO_FAVOURITE_SUCCESS: {
			const { body } = action;
			const newFavouritePokemons = body.favouritePokemons
				? [...body.favouritePokemons]
				: [...state.user.favouritePokemons];

			return {
				...state,
				isLoading: false,
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
			const { body } = action;
			console.log(state);
			return {
				...state,
				isLoading: false,
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
			const { body } = action;
			return {
				...state,
				isLoading: false,
				user: {
					...state.user,
					teamPokemons: [...body.teamPokemons],
					warParticipant: body.warParticipant,
				},
			};
		}
		case teamPokemonsTypes.ADD_TO_TEAM_FAILURE: {
			return {
				...state,
				isLoading: false,
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
			const { body } = action;
			return {
				...state,
				isLoading: false,
				user: {
					...state.user,
					teamPokemons: [...body.teamPokemons],
					warParticipant: body.warParticipant,
				},
			};
		}
		case teamPokemonsTypes.REMOVE_FROM_TEAM_FAILURE: {
			return {
				...state,
				isLoading: false,
			};
		}

		default: {
			return { ...state };
		}
	}
};

export default user;
