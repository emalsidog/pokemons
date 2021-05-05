// Dependencies
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import queryString from "query-string";

// Actions
import { getUsers } from "../../../redux/actions/users-actions";

// Pagination
import Pagination from "react-js-pagination";

// Components
import Layout from "../../layout";
import Heading from "../../common/heading";
import Table from "./users-components/table";
import Spinner from "../../common/spinner";

const Users = () => {
	// History
	const history = useHistory();

	// Redux
	const dispatch = useDispatch();
	const { users, totalCount, limit, isLoading } = useSelector(
		(state) => state.users
	);

	const values = queryString.parse(history.location.search);
		console.log(history);
	useEffect(() => {
		dispatch(getUsers(values.page));
	}, [dispatch, values.page]);

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
				<>
					<Table users={users} />

					<Pagination
						hideFirstLastPages

						prevPageText={<i className="fas fa-angle-left"></i>}
						nextPageText={<i className="fas fa-angle-right"></i>}
						firstPageText={<i className="fas fa-angle-double-left"></i>}
						lastPageText={<i className="fas fa-angle-double-right"></i>}

						activePage={+values.page}
						itemsCountPerPage={limit}
						totalItemsCount={totalCount}
						pageRangeDisplayed={5}
						onChange={handlePageChange}
						
						innerClass="innerClass"
						activeClass="activeClass"
						itemClass="itemClass"
						linkClass="linkClass"
					/>
				</>
			)}
		</Layout>
	);
};

export default Users;
