import React, { memo } from "react";
import SearchBar from "./SearchBar";
import Buttons from "./Buttons";
import redSaber from "./../Images/blueLightsaber.png";

function StationaryComponents(props) {
    return (
        <div>
            <SearchBar handleSearch={props.handleSearch} />
            <img src={redSaber} style={{ height: 60, width: 700 }} alt="lightsaber" />
            <Buttons changePage={props.changePage} />
        </div>
    );
}

export default memo(StationaryComponents);
