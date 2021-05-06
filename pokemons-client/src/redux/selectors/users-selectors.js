// Select isLoading
export const selectIsLoading = state => state.users.isLoading;

// Select users and total count
export const selectUsersAndTotalCount = state => {
	const { users, totalCount } = state.users;
	return {
		users,
		totalCount,
	};
};
