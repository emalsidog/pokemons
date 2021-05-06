// Select pokemons
export const selectPokemons = (state) => {
	const { totalCount, pokemons } = state.pokemons;
	return {
		totalCount,
		pokemons,
	};
};

// Select favourite pokemons
export const selectFavouritePokemons = (state) =>
	state.pokemons.favouritePokemons;

// Select team pokemons
export const selectTeamPokemons = (state) => state.pokemons.teamPokemons;

// Select isLoading
export const selectIsLoading = (state) => state.pokemons.isLoading;
