import React, { useEffect, useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom'
import { addCartThunk } from '../store/slices/cart.slice';
import { getProductsThunk } from '../store/slices/products.slice';

const ProductsDetail = () => {

    const allProducts = useSelector(state => state.products)
    const [productDetail, setProductDetail] = useState({})
    const [suggestedProducts, setSuggestedProducts] = useState([])
    const [quantity, setQuantity] = useState('')

    const { id } = useParams()

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(getProductsThunk())
    }, [])

    useEffect(() => {
        const products = allProducts.find(productItem => productItem.id === Number(id))
        setProductDetail(products);

        const filteredProducts = allProducts.filter(productItem => productItem.category.id === products.category.id)
        setSuggestedProducts(filteredProducts);
    }, [allProducts, id])

    const addPurchase =()=> {
        alert('Added to cart')
        const purchase = {
            id: productDetail.id,
            quantity: quantity
        }
        dispatch(addCartThunk(purchase))
        console.log(purchase);
    }

    return (
        <div>
            <img src={productDetail?.productImgs?.[2]} alt="" />
            <h1>{productDetail?.title}</h1>
            <p>{productDetail?.description}</p>
            <div>
                <h5>Add Product to cart</h5>
                <InputGroup className="mb-3">
                    <Form.Control
                        placeholder="Quantity"
                        aria-label="Recipient's username"
                        aria-describedby="basic-addon2"
                        value={quantity}
                        onChange={e=> setQuantity(e.target.value)}
                    />
                    <Button onClick={addPurchase} variant="outline-secondary" id="button-addon2">
                        Add
                    </Button>
                </InputGroup>
            </div>
            <ul>
                <h2>Similar Products:</h2>
                {
                    suggestedProducts.map(products => (
                        <li
                            onClick={() => navigate(`/product/${products.id}`)}
                            key={products.id}
                            style={{ cursor: 'pointer' }}
                        >
                            {products.title}
                        </li>
                    ))
                }
            </ul>
        </div>
    );
};

export default ProductsDetail;