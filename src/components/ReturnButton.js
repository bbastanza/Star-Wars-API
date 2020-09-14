import React from "react";

export default function ReturnButton(props) {
    return (
        <button
            className="btn btn-warning"
            style={{ marginTop: 20, marginBottom: 5, fontSize: 20 }}
            onClick={props.backToPage}
        >
            Return to Page
        </button>
    );
}
