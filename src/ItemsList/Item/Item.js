import React from 'react';
import {Link} from 'react-router-dom';
import './Item.scss';
import * as utils from '../../utils';

export default function Item({info, categories}) {

    return <div className={'item-container'}>
        <div className={'item-info'} id={info.id}>
            <Link to={{pathname: `/items/${info.id}`, itemInfo: info, categories: categories}}>
                <img src={info.picture} alt={info.title} />
            </Link>
            <div className={'item-general-info'}>
                <p className={'item-price'}>{utils.formatPrice(info.price)}{info.price.decimals ? <span className={'item-price-decimals'}>{info.price.decimals}</span> : null}</p>
                {info.free_shipping ? <i className={'item-price-free-shipping'} /> : null}
                <Link className={'item-title'} to={{pathname: `/items/${info.id}`, itemInfo: info, categories: categories}}>
                    <p>{info.title}</p>
                </Link>
            </div>
            <div className={'item-location'}>
                <p>{info.location}</p>
            </div>
        </div>

    </div>;
}