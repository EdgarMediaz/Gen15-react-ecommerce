import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPurchasesThunk } from '../store/slices/purchases.slice';

const Purchases = () => {

    const dispatch = useDispatch()

    const purchases = useSelector(state=> state.purchases)

    useEffect(()=> {
        dispatch(getPurchasesThunk())
    },[])

    return (
        <div>
            <h1>Purchases</h1>
            <ul>
                {
                    purchases.map(purchase=> (
                        <li key={purchase.id}>
                            {purchase.cart.products[0]?.title}
                        </li>
                    ))
                }
            </ul>
        </div>
    );
};

export default Purchases;