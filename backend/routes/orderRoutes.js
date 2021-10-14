import express from 'express'
const userRoutes = express.Router()
import { addOrderItems } from '../controllers/orderController.js'
import { protect } from '../middleware/authMiddleware.js'

userRoutes.route('/').post(protect, addOrderItems)

export default userRoutes