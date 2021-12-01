import React from "react";
import Suggestion from "./Suggestion";

function SearchSuggestions(props) {

    const suggestionsBorder = props.searchText > 2 ? "solid" : "none";
    const suggestionsBoxStyle = {
        borderStyle: suggestionsBorder
    }

    return (
        <div>
            <div className="suggestions-box" style={suggestionsBoxStyle}>
                {props.suggestions.map(suggestion =>
                        <Suggestion
                            key={suggestion.key}
                            id={suggestion.key}
                            suggestion={suggestion}
                            handleClick={props.handleClick}
                        />
                        )}
            </div>
        </div>
    )
}

export default SearchSuggestions;