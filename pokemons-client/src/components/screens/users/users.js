// Dependencies
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import queryString from "query-string";

// Actions
import { getUsers } from "../../../redux/actions/users-actions";

// Selectors
import { selectIsLoading, selectUsersAndTotalCount } from "../../../redux/selectors/users-selectors";

// Components
import Layout from "../../layout";
import Heading from "../../common/heading";
import Table from "./users-components/table";
import Spinner from "../../common/spinner";
import PaginationProvider from "../../common/pagination";

const Users = () => {
	// History
	const history = useHistory();

	// Redux
	const dispatch = useDispatch();
	const { users, totalCount } = useSelector(selectUsersAndTotalCount);
	const isLoading = useSelector(selectIsLoading);

	// Pagination
	const values = queryString.parse(history.location.search);
	const { page } = values;

	useEffect(() => {
		dispatch(getUsers(page));
	}, [dispatch, page]);

	const handlePageChange = (page) => {
		history.push({
			search: `?page=${page}`,
		});
	};

	return (
		<Layout>
			<Heading title="Users" description="List of all users." />

			{isLoading ? (
				<Spinner />
			) : (
				<React.Fragment>
					<Table users={users} />

					<PaginationProvider
						activePage={+page}
						itemsCountPerPage={10}
						totalItemsCount={totalCount}
						onChange={handlePageChange}
					/>
				</React.Fragment>
			)}
		</Layout>
	);
};

export default Users;
