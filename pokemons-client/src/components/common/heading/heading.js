// Dependencies
import React from "react";

const Heading = ({ title, description }) => {
    return (
        <div className="heading">
            <h1 className="title">{title}</h1>
            <span>
                {description}
            </span>
        </div>
    )
}

export default Heading;