// Dependencies
import React from "react";

// Pagination
import Pagination from "react-js-pagination";

// Styles
import "./pagination-provider.css";

const PaginationProvider = (props) => {
	const { totalItemsCount, activePage, onChange, itemsCountPerPage } = props;

	return (
		<Pagination
			hideFirstLastPages
			prevPageText={<i className="fas fa-angle-left"></i>}
			nextPageText={<i className="fas fa-angle-right"></i>}
			firstPageText={<i className="fas fa-angle-double-left"></i>}
			lastPageText={<i className="fas fa-angle-double-right"></i>}

			activePage={+activePage}
			totalItemsCount={totalItemsCount}
			onChange={onChange}
			itemsCountPerPage={itemsCountPerPage}
			pageRangeDisplayed={5}
			
			innerClass="innerClass"
			activeClass="activeClass"
			itemClass="itemClass"
			linkClass="linkClass"
		/>
	);
};

export default PaginationProvider;
