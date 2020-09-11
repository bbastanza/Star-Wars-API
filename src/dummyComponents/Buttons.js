import React from "react";

export default function Buttons(props) {
    return (
        <div>
            <button onClick={() => props.changePage("previous")} className="btn btn-danger">
                Previous
            </button>
            <button onClick={() => props.changePage("next")} className="btn btn-danger">
                Next
            </button>
            <button onClick={() => props.changePage("number", 1)} className="btn btn-warning">
                1
            </button>
            <button onClick={() => props.changePage("number", 2)} className="btn btn-warning">
                2
            </button>
            <button onClick={() => props.changePage("number", 3)} className="btn btn-warning">
                3
            </button>
            <button onClick={() => props.changePage("number", 4)} className="btn btn-warning">
                4
            </button>
            <button onClick={() => props.changePage("number", 5)} className="btn btn-warning">
                5
            </button>
            <button onClick={() => props.changePage("number", 6)} className="btn btn-warning">
                6
            </button>
            <button onClick={() => props.changePage("number", 7)} className="btn btn-warning">
                7
            </button>
            <button onClick={() => props.changePage("number", 8)} className="btn btn-warning">
                8
            </button>
            <button onClick={() => props.changePage("number", 9)} className="btn btn-warning">
                9
            </button>
        </div>
    );
}
