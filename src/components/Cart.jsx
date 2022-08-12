import React, { useEffect } from 'react';
import { Button, Offcanvas } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { buyCartThunk, getCartThunk } from '../store/slices/cart.slice' 
 
const Cart = ({ show, handleClose }) => {

    const dispatch = useDispatch()

    const cart = useSelector(state=> state.cart)

    const navigate = useNavigate()

    useEffect(()=> {
        dispatch(getCartThunk())
    },[])

    const getTotal=(cart)=> {
        let total = 0
        cart?.forEach(item => {
            total += Number(item.price)
        });
        return total
    }

    return (
        <Offcanvas show={show} onHide={handleClose} placement='end'>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Shopping Cart</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <ul>
                    {
                        cart.map(item=> (
                            <li key={item.id} style={{cursor: 'pointer'}} onClick={()=> navigate(`/product/${item.id}`)}>
                                {item.title}
                                <p>{item.brand}</p>
                                <p>${item.price}</p>
                                <p>Quantity: {item.productsInCart.quantity}</p>
                            </li>
                        ))
                    }
                </ul>
                <p>Total: ${getTotal(cart)}</p>
                <Button onClick={()=> dispatch(buyCartThunk())}>Buy</Button>
            </Offcanvas.Body>
        </Offcanvas>
    );
};

export default Cart;