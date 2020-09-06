import React, { useState } from "react";

function TextInput() {
    const [textBox, setTextBox] = useState("");
    const pressedSubmit = (e) => {
        e.preventDefault();
    };

    function handleChange(e) {
        const { value } = e.target;
        setTextBox(value);
    }

    return (
        <form onSubmit={pressedSubmit}>
            <button className="btn btn-warning">Search</button>
            <input
                onChange={handleChange}
                style={{ fontSize: 12 }}
                className="col-sm-3 margin-top"
                type="text"
                placeholder="Help me, Obi-Wan Kenobi. You’re my only hope."
                value={textBox}
            />
        </form>
    );
}

export default TextInput;
