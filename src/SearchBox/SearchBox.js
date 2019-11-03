import React, {useState} from 'react';
import './SearchBox.scss';
import logo from '../meli-logo.png';

export function SearchBox(props) {

    const [searchValue, setSearchValue] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        props.onSubmit(searchValue);
    };

    return <div className="background-banner">
        <form className="search-box-container" onSubmit={(event) => handleSubmit(event)}>
            <img src={logo} alt="Logo Mercado Libre" />
            <input className="search-box-input" type="text" placeholder="Nunca dejes de buscar"
                   onKeyUp={(e) => setSearchValue(e.target.value)}/>
            <button type="submit" className="search-box-btn" />
        </form>
    </div>;

}