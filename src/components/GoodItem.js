import React from 'react'

export default function GoodItem(props) {
    const {id, addToBasket, name, description, price, full_background}=props;
    

    return (
        <div className="card">
            <div className="card-image">
                <img src={full_background} alt={name} />
               
            </div>
            <div className="card-content">
            <span className="card-title">{name}</span>
                <p>{description}</p>
            </div>
            <div className="card-action">
                <button onClick={()=>addToBasket({id, name, price})} className="btn">Buy</button>
                <span className="right" style={{fontSize:"25px"}}>{price}</span>
            </div>
        </div>
    )
}
