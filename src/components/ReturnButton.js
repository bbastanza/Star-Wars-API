import React from "react";

export default function ReturnButton({ backToPage }) {
    return (
        <button className="btn btn-warning" style={{ marginBottom: 5, fontSize: 20 }} onClick={backToPage}>
            Return to Page
        </button>
    );
}
