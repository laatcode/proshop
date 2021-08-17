import React, { useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Product from '../components/Product'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listProducts } from '../actions/productActions'

const HomeScreen = () => {

    const dispatch = useDispatch()

    // Selecciona una parte de todo el estado.
    // productList es como se llama la propiead en el store cuando se definió el reducer.
    const productList = useSelector(state => state.productList)
    const { loading, error, products } = productList

    useEffect( () => {
        // Se dispara la acción para listar productos
        dispatch(listProducts())
    }, [dispatch])

    return (
        <>
            <h1>Latests Products</h1>
            { loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> :
            <Row>
                {products.map(product => (
                    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                        <Product product={product} />
                    </Col>
                ))}
            </Row>
            }
        </>
    )
}

export default HomeScreen