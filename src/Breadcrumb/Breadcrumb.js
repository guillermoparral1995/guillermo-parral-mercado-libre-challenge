import React from 'react';
import './Breadcrumb.scss';

export default function Breadcrumb(props){
    return <ul>
        {props.categories ? props.categories.map((category, idx) =>
            <li className={"breadcrumb"} key={idx}>{category}
                {idx !== props.categories.length - 1 ? <i/> : null}
            </li>)
            : null}
    </ul>
}