import React from 'react';
import './ItemsList.scss';
import Item from "./Item/Item";
import Breadcrumb from "../Breadcrumb/Breadcrumb";

export default function ItemsList(props){
    return <div className={"items-list-container"}>
        <Breadcrumb categories={props.categories}/>
        {props.items.slice(0,4).map((item, idx) => <Item key={idx} info={item} categories={props.categories}/>)}
    </div>
}