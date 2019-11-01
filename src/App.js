import React, { useState } from 'react';
import './App.scss';
import {SearchBox} from "./SearchBox/SearchBox";

function App() {

    const [results, setResults] = useState([]);

    const getResults = (query) => {
        fetch(`http://localhost:8080/api/items?q=${query}`)
            .then(response => response.json())
            .then(response => {
                console.log(response);
                setResults(response.items)
            });
    };

    return (
        <div className="App">
            <SearchBox onSubmit={(query) => getResults(query)}/>
        </div>
    );
}

export default App;
