import React from 'react';
import { Form, Button } from 'react-bootstrap'
import { useForm } from 'react-hook-form';
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Login = () => {

    const { register, handleSubmit, reset } = useForm()
    const navigate = useNavigate()

    
    const submit = data=> {
        axios.post('https://ecommerce-api-react.herokuapp.com/api/v1/users/login', data)
            .then(res=> {
                navigate('/')
                localStorage.setItem('token', res.data.data.token)
            })
            .catch(error=> {
                if(error.response.status === 404){
                    alert('Invalid credentials')
                }
                console.log(error.response)
            })
        console.log(data);
        reset({
            email: '',
            password: ''
        })
    }

    return (
        <div>
            <h1>Login</h1>
            <Form onSubmit={handleSubmit(submit)}>
                <div className="login__data-test-box">
                    <h3>Test Data:</h3>
                    <p><b>email:</b> mason@gmail.com</p>
                    <p><b>password:</b> mason1234</p>
                </div>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" {...register('email')}/>
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" {...register('password')}/>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    );
};

export default Login;