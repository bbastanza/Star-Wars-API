import React from "react";
import "./App.css";
import Header from "./dummyComponents/Header";
import DataLogic from "./dataComponents/DataLogic";

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <Header />
            </header>
            <DataLogic />
        </div>
    );
}

export default App;
