import React from "react";
import SearchSuggestions from "./SearchSuggestions";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

function Search(props) {

    function handleKeyPress(event) {
        if (event.key === 'Enter') {
            // Enter should submit search
            props.submit(event);
        }
    }

    return (
        <div>
            <div className="search-bar">
                <input type="search" placeholder="Search..." value={props.searchText} 
                    onChange={props.handleChange} onKeyDown={handleKeyPress} 
                />
                <button onClick={props.submit}><SearchOutlinedIcon className="search-icon" /></button>
            </div>
            {(props.searchText.length > 2)  ?
                <SearchSuggestions 
                searchText={props.searchText}
                suggestions={props.suggestions}
                active={props.activeSuggestion}
                handleClick={props.handleClick}
            /> :
            null
            }
        </div>
    )
}

export default Search;