import React, { useState } from "react";
import "./../App.css";
import HeaderRow from "./../dummyComponents/HeaderRow";
import TableData from "./TableData";

function Table() {
    const [pageNumber, setPageNumber] = useState(1);
    const [isLoading, setIsLoading] = useState(true);

    const nextPage = () => {
        if (pageNumber < 9) setPageNumber(prevPageNumber => prevPageNumber + 1);
    };

    const prevPage = () => {
        if (pageNumber > 1) setPageNumber(prevPageNumber => prevPageNumber - 1);
    };

    const loading = () => setIsLoading(true);
    const doneLoading = () => setIsLoading(false);

    return (
        <div>
            <button onClick={prevPage} className="btn btn-danger">
                Previous
            </button>
            <button onClick={nextPage} className="btn btn-danger">
                Next
            </button>

            <table
                style={{ width: "80%", padding: 10, marginTop: 15 }}
                className="table table-dark table-striped margin-top table-hover shadows"
            >
                {isLoading ? null : <HeaderRow />}
                <TableData pageNumber={pageNumber} doneLoading={doneLoading} loading={loading} />
            </table>
        </div>
    );
}

export default Table;
