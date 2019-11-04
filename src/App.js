import React, {useState} from 'react';
import './App.scss';
import {SearchBox} from "./SearchBox/SearchBox";
import {Switch, Route, Redirect, useHistory} from 'react-router-dom';
import ItemsList from "./ItemsList/ItemsList";
import ItemDetail from "./ItemDetail/ItemDetail";
import Message from "./Message/Message";

function App() {
    let history = useHistory();
    const [results, setResults] = useState({});

    const getResults = (query) => {
        fetch(`http://localhost:8080/api/items?q=${query}`)
            .then(response => response.json())
            .then(response => {
                if (response.error) {
                    console.error(response);
                    setResults({error: response});
                } else {
                    setResults(response);
                    history.push(`/items?search=${query}`);
                }
            });
    };

    return (
        <div className="App">
            <SearchBox onSubmit={(query) => getResults(query)}/>
            <Switch>
                <Route exact path="/items">
                    {
                        results.error ?
                            <Message error={true}
                                     message={'Hubo un problema buscando ese producto. Probá nuevamente más tarde.'}/>
                            : results.items ? results.items.length ?
                            <ItemsList categories={results.categories} items={results.items}/>
                            : <Message error={false}
                                       message={'No encontramos resultados con lo que ingresaste. Probá buscandolo con otras palabras!'}/>
                            : <Redirect to={"/"}/>
                    }
                </Route>
                <Route path="/items/:id" component={ItemDetail}/>
            </Switch>
        </div>
    );
}

export default App;
