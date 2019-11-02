import React, { useState } from 'react';
import './App.scss';
import {SearchBox} from "./SearchBox/SearchBox";
import {Switch, Route, useHistory} from 'react-router-dom';
import ItemsList from "./ItemsList/ItemsList";
import ItemDetail from "./ItemDetail/ItemDetail";

function App() {
    let history = useHistory();
    const [results, setResults] = useState({author: {}, categories: [], items: []});

    const getResults = (query) => {
        fetch(`http://localhost:8080/api/items?q=${query}`)
            .then(response => response.json())
            .then(response => {
                setResults(response);
                history.push(`/items?search=${query}`);
            });
    };

    return (
        <div className="App">
            <SearchBox onSubmit={(query) => getResults(query)}/>
            <Switch>
                <Route exact path="/items">
                    {
                        results.items.length ? <ItemsList categories={results.categories} items={results.items}/> : null
                    }
                </Route>
                <Route path="/items/:id" component={ItemDetail} />
            </Switch>
        </div>
    );
}

export default App;
