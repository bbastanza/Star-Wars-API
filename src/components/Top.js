import React from "react";
import Header from "./Header";
import SearchBar from "./SearchBar";
import redSaber from "./../Images/blueLightsaber.png";

export default function Top({ handleSearch }) {
    return (
        <div>
            <header className="App-header">
                <Header />
            </header>
            <SearchBar handleSearch={handleSearch} />
            <img src={redSaber} style={{ height: 60, width: 700 }} alt="lightsaber" />
        </div>
    );
}
