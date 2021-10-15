import express from 'express'
const userRoutes = express.Router()
import { addOrderItems, getOrderById } from '../controllers/orderController.js'
import { protect } from '../middleware/authMiddleware.js'

userRoutes.route('/').post(protect, addOrderItems)
userRoutes.route('/:id').get(protect, getOrderById)

export default userRoutes