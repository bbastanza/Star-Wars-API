import React, { useState } from "react";

function TextInput() {
    const [textBox, setTextBox] = useState("");
    const pressedSubmit = e => {
        e.preventDefault();
    };

    function handleChange(e) {
        const { value } = e.target;
        setTextBox(value);
    }

    return (
        <form onSubmit={pressedSubmit}>
            <button className="btn btn-warning col-1">Search</button>
            <input
                onChange={handleChange}
                className="col-sm-5 margin-top altFont"
                type="text"
                placeholder="Help me, Obi-Wan Kenobi. You’re my only hope."
                value={textBox}
            />
        </form>
    );
}

export default TextInput;
