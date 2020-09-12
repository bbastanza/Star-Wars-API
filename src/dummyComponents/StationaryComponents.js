import React from "react";
import SearchBar from "./SearchBar";
import Buttons from "./Buttons";
import blueSaber from "./../Images/blueLightsaber.png";

export default function StationaryComponents(props) {
    return (
        <div>
            <SearchBar handleSearch={props.handleSearch} />
            <img src={blueSaber} style={{ height: 60, width: 700 }} alt="lightsaber" />
            <Buttons changePage={props.changePage} />
        </div>
    );
}
