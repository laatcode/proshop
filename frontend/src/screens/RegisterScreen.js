import { useEffect, useState } from 'react'
import FormContainer from '../components/FormContainer'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { register } from '../actions/userActions'
import Loader from '../components/Loader'
import Message from '../components/Message'

const RegisterScreen = ({ location, history }) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userRegister)
    const {loading, error, userInfo} = userLogin

    const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(() => {
        if(userInfo) {
            history.push(redirect)
        }
    }, [history, userInfo, redirect])

    const submitHandler = e => {
        e.preventDefault()
        if(password !== confirmPassword) {
            setMessage('Password do not match')
        } else {
            setMessage('')
            dispatch(register(name, email, password))
        }
    }

    return (
        <FormContainer>
            <h1>Sign Up</h1>
            {error && <Message variant='danger'>{ error }</Message>}
            {message && <Message variant='danger'>{ message }</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
                <Form.Group className="mb-3" controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type='text' placeholder="Enter name" value={name} onChange={e => setName(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type='email' placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='password' placeholder="Enter password" value={password} onChange={e => setPassword(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId='confirm-password'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type='password' placeholder="Confirm password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
                </Form.Group>
                <Button type="submit" variant="primary">
                    Sign Up
                </Button>
            </Form>

            <Row className="py-3">
                <Col>Have a account? <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>Register</Link></Col>
            </Row>
        </FormContainer>
    )
}

export default RegisterScreen