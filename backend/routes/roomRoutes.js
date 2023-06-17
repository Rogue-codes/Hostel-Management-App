import express from 'express'
import { createRoom, deleteRoom, updateRoom } from '../controllers/roomControllers.js'

const roomRoute = express.Router()

roomRoute.post('/rooms/create',createRoom)
roomRoute.put('/rooms/update/:id',updateRoom)
roomRoute.delete('/rooms/delete/:id',deleteRoom)

export default roomRoute