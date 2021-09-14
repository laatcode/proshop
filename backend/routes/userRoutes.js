import express from 'express'
const userRoutes = express.Router()
import { authUser, getUserProfile } from '../controllers/userController.js'
import { protect } from '../middleware/authMiddleware.js'

userRoutes.post('/login', authUser)
userRoutes.route('/profile').get(protect, getUserProfile)

export default userRoutes