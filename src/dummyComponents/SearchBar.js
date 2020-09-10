import React, { useState, memo } from "react";

function SearchDisplay(props) {
    const [textBoxValue, settextBoxValue] = useState("");

    const pressedSubmit = e => {
        e.preventDefault();
        props.handleSearch(textBoxValue);
    };

    function handleChange(e) {
        const { value } = e.target;
        settextBoxValue(value);
        if (textBoxValue === "") props.handleSearch("");
    }

    return (
        <form onSubmit={pressedSubmit}>
            <button className="btn btn-warning col-1">Search</button>
            <input
                onChange={handleChange}
                className="col-sm-5 margin-top altFont"
                type="text"
                placeholder="Help me, Obi-Wan Kenobi. You’re my only hope."
                value={textBoxValue}
            />
        </form>
    );
}

export default memo(SearchDisplay);
