// Select pokemons
export const selectPokemons = state => {
	const { totalCount, pokemons } = state.pokemons;
	return { totalCount, pokemons };
};

// Select favourite pokemons
export const selectFavouritePokemons = state =>
	state.pokemons.favouritePokemons;

// Select team pokemons
export const selectTeamPokemons = state => state.pokemons.teamPokemons;

// Select isFetchingData
export const selectIsFetchingData = state => state.pokemons.isFetchingData;

// Select isInAction
export const selectIsInAction = state => state.pokemons.isInAction;
