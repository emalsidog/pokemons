// Dependencies
import React from "react";

// Utils
import formatDate from "../../../../utils/format-date";

// Styles
import "./header.css";

const Header = (props) => {
    const { username, createdAt } = props;

    const [date, time] = formatDate(createdAt);

    return (
        <div className="battle-header">
            <div>Winner: {username}</div>
            <div>Played: {date} [{time}]</div>
        </div>
    )
}

export default Header;