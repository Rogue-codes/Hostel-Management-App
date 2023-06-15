import express from 'express';
import cors from 'cors';
import morgan from 'morgan'
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import adminRouter from './routes/adminRoutes.js'

dotenv.config()

const app = express();

app.use(express.json())
app.use(cors())
app.use(cookieParser())
app.use(morgan('dev'))

app.get('/', (req,res) => {
    res.send('hostel management app');
})

app.use('/api/v1/hostelite', adminRouter)

const Port = process.env.PORT || 5500

app.listen(Port,()=>{
    console.log(`App is running on port: ${Port}`)
})

const URI = process.env.connectionURI;
mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("mongo DB connection successfull");
  })
  .catch((err) => {
    console.log("an error occured: ", err.message);
  });