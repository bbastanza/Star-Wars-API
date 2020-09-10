import React from "react";
import "./App.css";
import Header from "./dummyComponents/Header";
import TableData from "./dataComponents/TableData";

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <Header />
            </header>

            <TableData />
        </div>
    );
}

export default App;
