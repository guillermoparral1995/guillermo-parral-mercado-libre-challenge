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
                <p className={'item-price'}>{utils.formatPrice(info.price)}{info.free_shipping ? <i className={'item-price-free-shipping'} /> : null}</p>
                {info.price.decimals ? <span className={'item-price-decimals'}>{info.price.decimals}</span> : null}
                <Link to={{pathname: `/items/${info.id}`, itemInfo: info, categories: categories}}>
                    <p className={'item-title'}>{info.title}</p>
                </Link>
            </div>
            <div className={'item-location'}>
                <p>{info.condition === 'new' ? 'Nuevo' : 'Usado'}</p>
            </div>
        </div>

    </div>;
}