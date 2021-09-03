import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import connectDB from './config/db.js'
import productRoutes from './routes/productRoutes.js'
import { authUser } from './controllers/userController.js'

dotenv.config()

connectDB()

const app = express()
const port = process.env.PORT || 5000

app.use(express.json())

app.get('/', (req, res) => {
    res.send('API is runing...')
})

app.use('/api/products', productRoutes)
app.use('/api/users', authUser)

app.use(notFound)

app.use(errorHandler)

app.listen(port, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`.yellow.bold))