import React, {useState} from 'react';
import {Link} from 'react-router-dom';
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
            <Link to={'/'}>
                <img src={logo} alt="Logo Mercado Libre" />
            </Link>
            <input className="search-box-input" type="text" placeholder="Nunca dejes de buscar"
                   onKeyUp={(e) => setSearchValue(e.target.value)}/>
            <button type="submit" className="search-box-btn" />
        </form>
    </div>;

}