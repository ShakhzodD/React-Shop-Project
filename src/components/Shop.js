import React, {useState, useEffect} from 'react'
import {API_KEY, API_URL} from '../config';
import Loader from './Loader';
import GoodList from './GoodList';
import Card from './Cart';
import BasketList from './BasketList';
import {toast} from 'react-toastify';

export default function Shop() {
    const [goods, setGoods]= useState([]);
    const [loading, setLoading]=useState(true);
    const [order, setOrder]=useState([]);
    const [isBasketShow, setIsBasketShow]=useState(false);
    
    const addToBasket = (item) =>{
        const itemIndex=order.findIndex((orderItem)=>orderItem.id === item.id);
        if(itemIndex<0){
            const newItem={
                ...item,
                quantity:1
            }
            setOrder([...order, newItem])
        }else {
            const newOrder=order.map((orderItem, index)=>{
                if(index===itemIndex) {
                    return {
                        ...orderItem,
                        quantity:orderItem.quantity + 1,
                    };
                } else{
                    return orderItem
                }
            });
            setOrder(newOrder)
        }
        toast.success("Goods added to basket successfuly")
    }
    const handleBasketShow=()=>{
        setIsBasketShow(!isBasketShow)
    }

    const removeFromBasket = (itemId)=>{
        const newOrder=order.filter(item=>item.id !==itemId)
        setOrder(newOrder);
        toast.error("Goods deleted from basket")
    }

    const incrementQuantity=(itemId)=>{
        const newOrder= order.map(el=>{
            if(el.id===itemId){
                const newQuantity=el.quantity +1
                return{
                    ...el,
                    quantity :newQuantity
                }
            } else {
                return el
            }
        })
        setOrder(newOrder)
    }

    const decrementQuantity=(itemId)=>{
        const newOrder= order.map(el=>{
            if(el.id===itemId){
                const newQuantity=el.quantity -1
                return{
                    ...el,
                    quantity :newQuantity >=0 ? newQuantity :0
                }
            } else {
                return el
            }
        })
        setOrder(newOrder)
    }

    useEffect(()=>{
        fetch(API_URL, {
            headers:{
                "Authorization":API_KEY,
            }
        })
        .then(response=>response.json())
        .then((data)=>{
            data.featured && setGoods(data.featured)
            setLoading(false)
            console.log(data)
    })
    },[])
    return (
        <div className="content container">
            <Card handleBasketShow={handleBasketShow} quantity={order.length}/>
            {loading ? <Loader/> : <GoodList goods={goods}  addToBasket={addToBasket}/>}
            {isBasketShow && <BasketList 
            order={order} 
            handleBasketShow={handleBasketShow} 
            removeFromBasket={removeFromBasket}
            incrementQuantity={incrementQuantity}
            decrementQuantity={decrementQuantity}/>}
        </div>
    )
}
