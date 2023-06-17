import express from 'express';
import { createHostel, deleteHostel, getHostel, updateHostel } from '../controllers/hostelControllers.js';

const hostelRoutes = express.Router()

hostelRoutes.post('/hostel/create', createHostel)
hostelRoutes.get('/hostel/all', getHostel)
hostelRoutes.put('/hostel/update/:id', updateHostel)
hostelRoutes.delete('/hostel/delete/:id', deleteHostel)

export default hostelRoutes