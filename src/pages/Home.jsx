import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterProductsThunk, getProductsThunk } from '../store/slices/products.slice';
import { useNavigate } from 'react-router-dom'
import { Row, Col, Card, InputGroup, Form, Button } from 'react-bootstrap'

const Home = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [searchValue, setSearchValue] = useState('')

    const products = useSelector(state => state.products)

    useEffect(() => {
        dispatch(getProductsThunk())
    }, [])

    return (
        <div>
            <h1>Home</h1>
            <InputGroup className="mb-3">
                <Form.Control
                    placeholder="Search product"
                    aria-label="Search product"
                    aria-describedby="basic-addon2"
                    onChange={e=> setSearchValue(e.target.value)}
                    value={searchValue}
                />
                <Button variant="outline-secondary" onClick={()=> dispatch(filterProductsThunk(searchValue))}>
                    Search
                </Button>
            </InputGroup>
            <Row xs={1} md={2} className="g-4">
                {products.map(product => (
                    <Col key={product.id}>
                        <Card onClick={() => navigate(`/product/${product.id}`)}>
                            <Card.Img variant="top" src={product.productImgs[0]} />
                            <Card.Body>
                                <Card.Title>{product.title}</Card.Title>
                                <Card.Text>
                                    {product.description}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default Home;