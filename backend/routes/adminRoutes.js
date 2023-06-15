import express from 'express';
import { adminLogin, createAdmin, logout } from '../controllers/adminControllers.js';

const adminRouter = express.Router()

adminRouter.post("/admin/signup", createAdmin )
adminRouter.post("/admin/signin", adminLogin )
adminRouter.post("/admin/signout", logout )

export default adminRouter