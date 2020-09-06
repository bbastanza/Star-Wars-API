import React from "react";
import axios from "axios";
import "./App.css";
import Header from "./dataComponents/Header";
import TextInput from "./dataComponents/TextInput";
import Table from "./dataComponents/Table";
import blueSaber from "./Images/blueLightsaber.png";

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <Header />
            </header>
            <TextInput />
            <img src={blueSaber} style={{ height: 60, width: 700 }} />
            <Table />
        </div>
    );
}

export default App;
