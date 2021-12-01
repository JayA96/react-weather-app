import React from "react";

function Suggestion(props) {

    return (
        <li onClick={props.handleClick} id={props.id}>
            {props.suggestion.city}, {props.suggestion.country}
        </li>
    )
}

export default Suggestion;