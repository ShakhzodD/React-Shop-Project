import React from 'react'
import '../App.css'
export default function BasketItem(props) {
    const {id, name, price, quantity, decrementQuantity, incrementQuantity}=props;  

    return (
        <li className="collection-item collect">
            {name} x{quantity} = {price * quantity} <b>$</b>
            <span  className="secondary-content">
        
                <a className="waves-effect waves-light btn btnq" onClick={()=>incrementQuantity(id)}>
                    <i className="material-icons left">exposure_plus_1</i>
                
                </a>
                <a style={{margin: "0 10px"}} className="waves-effect waves-light btn btnq" onClick={()=>decrementQuantity(id)}>
                    <i className="material-icons left">exposure_minus_1</i>
                
                </a>

                <a className="waves-effect waves-light btn btnq" onClick={()=>props.removeFromBasket(id)}>
                <i  className="material-icons basket-delete">delete_forever </i>
                </a>
            </span>
        </li>
    )
}
