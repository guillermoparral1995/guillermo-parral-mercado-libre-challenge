import React, {useState, useEffect} from 'react';
import './ItemDetail.scss';
import * as utils from '../utils';
import Message from "../Message/Message";
import Breadcrumb from "../Breadcrumb/Breadcrumb";
import Loader from "../Loader/Loader";

export default function ItemDetail(props) {

    const id = props.match.params.id;
    const [itemInfo, setItemInfo] = useState({});
    const [errorMsg, showErrorMsg] = useState({error: false, text: ''});

    useEffect(() => {
        fetch(`http://localhost:8080/api/items/${id}`)
            .then(response => response.json())
            .then(response => {
                if (response.error) {
                    let text;
                    switch (response.status) {
                        case 404:
                            text = 'El artículo que ingresaste no existe.';
                            break;
                        case 500:
                            text = 'No pudimos encontrar el artículo que estabas buscando. Probá nuevamente más tarde';
                            break;
                        default:
                            text = 'Ups! Algo salió mal. Probá nuevamente más tarde';
                            break;
                    }
                    showErrorMsg({error: true, text: text});
                } else {
                    setItemInfo(response.item);
                }
            })
            .catch(error => {
                console.error(error);
                showErrorMsg({error: true, text: 'Ups! Algo salió mal. Probá nuevamente más tarde'});
            });;
    }, [id]);

    return errorMsg.error ? <Message error={errorMsg.error} message={errorMsg.text}/> :
        itemInfo.id ? <div className={'item-detail-container'}>
                <Breadcrumb categories={itemInfo.categories}/>
                <div className={'item-detail'}>
                    <div className={'item-detail-first-row'}>
                        <div className={'item-detail-img-container'}>
                            <img src={itemInfo.picture} alt={itemInfo.title}/>
                        </div>
                        <div className={'item-detail-info'}>
                            <p className={'item-detail-condition-sold'}>
                                {`${itemInfo.condition === 'new' ? 'Nuevo' : 'Usado'} - ${itemInfo.sold_quantity} vendidos`}
                            </p>
                            <h5 className={'item-detail-title'}>{itemInfo.title}</h5>
                            <h3 className={'item-detail-price'}>
                                {utils.formatPrice(itemInfo.price)}
                                {itemInfo.price.decimals ?
                                    <span className={'item-price-decimals'}>{itemInfo.price.decimals}</span> : null}
                            </h3>
                            <button className={'item-detail-buy'}>Comprar</button>
                        </div>
                    </div>
                    <div className={'item-detail-description'}>
                        <p className={'item-detail-description-title'}>Descripción del producto</p>
                        <p className={'item-detail-description-text'}>{itemInfo.description}</p>
                    </div>
                </div>
            </div>
            : <Loader />
};