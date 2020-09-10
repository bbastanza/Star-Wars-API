import React from "react";

export default function Buttons(props) {
    return (
        <div>
            <button onClick={props.prevPage} className="btn btn-danger">
                Previous
            </button>
            <button onClick={props.nextPage} className="btn btn-danger">
                Next
            </button>
        </div>
    );
}
