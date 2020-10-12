import React from "react";

export default function Buttons({ changePage }) {
    return (
        <div>
            <button onClick={() => changePage("previous")} className="btn btn-danger" style={{ width: "auto" }}>
                Previous
            </button>
            <button onClick={() => changePage("next")} className="btn btn-danger" style={{ width: "auto" }}>
                Next
            </button>
            <button onClick={() => changePage("number", 1)} className="btn btn-warning btn-outline-dark">
                1
            </button>
            <button onClick={() => changePage("number", 2)} className="btn btn-warning btn-outline-dark">
                2
            </button>
            <button onClick={() => changePage("number", 3)} className="btn btn-warning btn-outline-dark">
                3
            </button>
            <button onClick={() => changePage("number", 4)} className="btn btn-warning btn-outline-dark">
                4
            </button>
            <button onClick={() => changePage("number", 5)} className="btn btn-warning btn-outline-dark">
                5
            </button>
            <button onClick={() => changePage("number", 6)} className="btn btn-warning btn-outline-dark">
                6
            </button>
            <button onClick={() => changePage("number", 7)} className="btn btn-warning btn-outline-dark">
                7
            </button>
            <button onClick={() => changePage("number", 8)} className="btn btn-warning btn-outline-dark">
                8
            </button>
            <button onClick={() => changePage("number", 9)} className="btn btn-warning btn-outline-dark">
                9
            </button>
        </div>
    );
}
