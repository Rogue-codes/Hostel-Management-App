import express from 'express';
import { getUserProfile, updateUserProfile } from '../controllers/userControllers.js';

const userRoutes = express.Router();

userRoutes.get('/myprofile/me', getUserProfile)
userRoutes.patch('/myprofile/update', updateUserProfile)


export default userRoutes