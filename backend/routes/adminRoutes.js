import express from 'express';
import { adminLogin, createAdmin } from '../controllers/adminControllers.js';

const adminRouter = express.Router()

adminRouter.post("/admin/signup", createAdmin )
adminRouter.post("/admin/signin", adminLogin )

export default adminRouter