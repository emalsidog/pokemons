// Dependencies
import React from "react";

// Utils
import formatDate from "../../../../utils/format-date";

// Styles
import "./header.css";

const Header = (props) => {
    const { username, result, createdAt } = props;

    const [date, time] = formatDate(createdAt);

    return (
        <div className="battle-header">
            {result === "tie" ? <div>Tie</div> : <div>Winner: {username}</div>}
            <div>Played: {date} [{time}]</div>
        </div>
    )
}

export default Header;