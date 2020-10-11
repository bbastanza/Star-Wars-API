import React, { memo } from "react";
import Buttons from "./Buttons";
import ReturnButton from "./ReturnButton";
import Top from "./Top";

function StationaryComponents(props) {
    if (props.isLoading) {
        return (
            <div>
                <Top handleSearch={props.handleSearch} />
            </div>
        );
    } else if (props.onSearch) {
        return (
            <div>
                <Top handleSearch={props.handleSearch} />
                <br />
                <ReturnButton backToPage={props.backToPage} />
            </div>
        );
    } else
        return (
            <div>
                <Top handleSearch={props.handleSearch} />
                <br />
                <Buttons changePage={props.changePage} />
            </div>
        );
}

export default memo(StationaryComponents);
