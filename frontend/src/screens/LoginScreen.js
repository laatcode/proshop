import { useEffect, useState } from 'react'
import FormContainer from '../components/FormContainer'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../actions/userActions'
import Loader from '../components/Loader'
import Message from '../components/Message'

const LoginScreen = ({ location, history }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const {loading, error, userInfo} = userLogin

    const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(() => {
        if(userInfo) {
            history.push(redirect)
        }
    }, [history, userInfo, redirect])

    const submitHandler = e => {
        e.preventDefault()
        dispatch(login(email, password))
    }

    return (
        <FormContainer>
            <h1>Sign In</h1>
            {error && <Message variant='danger'>{ error }</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
                <Form.Group className="mb-3" controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type='email' placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='password' placeholder="Enter password" value={password} onChange={e => setPassword(e.target.value)} />
                </Form.Group>
                <Button type="submit" variant="primary">
                    Sign In
                </Button>
            </Form>

            <Row className="py-3">
                <Col>New Customer? <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>Register</Link></Col>
            </Row>
        </FormContainer>
    )
}

export default LoginScreen