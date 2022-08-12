import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterCategoryThunk, filterProductsThunk, getProductsThunk } from '../store/slices/products.slice';
import { useNavigate } from 'react-router-dom'
import { Row, Col, Card, InputGroup, Form, Button, ListGroup } from 'react-bootstrap'
import axios from 'axios'

const Home = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [searchValue, setSearchValue] = useState('')
    const [categories, setCategories] = useState([])

    const products = useSelector(state => state.products)

    useEffect(() => {
        dispatch(getProductsThunk())

        axios.get('https://ecommerce-api-react.herokuapp.com/api/v1/products/categories')
            .then(res => setCategories(res.data.data.categories))
    }, [])

    return (
        <Row>
            <Col lg={3}>
                <ListGroup>
                    {
                        categories.map(category => (
                            <ListGroup.Item 
                                key={category.id}
                                onClick={()=> dispatch(filterCategoryThunk(category.id))}
                                style={{cursor: 'pointer'}}
                            >
                                {category.name}
                            </ListGroup.Item>
                        ))
                    }
                </ListGroup>
            </Col>
            <Col>
                <h1>Home</h1>
                <InputGroup className="mb-3">
                    <Form.Control
                        placeholder="Search product"
                        aria-label="Search product"
                        aria-describedby="basic-addon2"
                        onChange={e => setSearchValue(e.target.value)}
                        value={searchValue}
                    />
                    <Button variant="outline-secondary" onClick={() => dispatch(filterProductsThunk(searchValue))}>
                        Search
                    </Button>
                </InputGroup>
                <Row xs={1} md={2} xl={3} className="g-4">
                    {products.map(product => (
                        <Col key={product.id} style={{cursor: 'pointer'}}>
                            <Card onClick={() => navigate(`/product/${product.id}`)}>
                                <Card.Img variant="top" src={product.productImgs[0]} />
                                <Card.Body>
                                    <Card.Title>{product.title}</Card.Title>
                                    <Card.Text>
                                        ${product.price}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Col>
        </Row>
    );
};

export default Home;