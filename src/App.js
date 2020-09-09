import React from "react";
import "./App.css";
import Header from "./dataComponents/Header";
import SearchBar from "./dataComponents/SearchBar";
import Table from "./dataComponents/Table";
import blueSaber from "./Images/blueLightsaber.png";

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <Header />
            </header>
            <SearchBar />
            <img src={blueSaber} style={{ height: 60, width: 700 }} alt="lightsaber" />
            <Table />
        </div>
    );
}

export default App;
