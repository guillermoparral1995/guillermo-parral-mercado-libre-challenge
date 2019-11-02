import React, { useState, useEffect } from 'react';
import './ItemDetail.scss';
import * as utils from '../utils';

export default function ItemDetail(props){

    const id = props.match.params.id;
    const [itemInfo, setItemInfo] = useState({});

    useEffect(() => {
        fetch(`http://localhost:8080/api/items/${id}`)
            .then(response => response.json())
            .then(response => {
                console.log(response);
                setItemInfo(response.item);
            });
    }, [id]);

    return <div className={'item-detail-container'}>{
        itemInfo === {} ? <div className={'item-detail'}>
            <img src={itemInfo.picture} alt={itemInfo.title}/>
            <div className={'item-detail-info'}>
                <p className={'item-detail-condition-sold'}>
                    {`${itemInfo.condition === 'new' ? 'Nuevo' : 'Usado'} - ${itemInfo.sold_quantity} vendidos`}
                </p>
                <h5 className={'item-detail-title'}>{itemInfo.title}</h5>
                <h3 className={'item-detail-price'}>
                    {`${utils.formatPrice(itemInfo.price)}`}
                    {itemInfo.price.decimals ? <span className={'item-price-decimals'}>{itemInfo.price.decimals}</span> : null}
                </h3>
            </div>
        </div> : ''
    } </div> ;
}