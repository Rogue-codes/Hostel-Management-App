import jwt from 'jsonwebtoken'
import Admin from '../models/adminModel.js'
export const authiddleware = async (req, res, next) => {
    const authToken = req.cookies.access_token

    try{
    if(authToken){
        const token = jwt.verify(authToken,process.env.JWT_SECRET)
        req.user = await Admin.findById(token.userID)
        next()
    }else{
        res.status(401).json({
            status:'failed',
            message: 'no token found'
        })
    }
    }catch(error){
        res.status(401).json({
            status:'failed',
            message: 'Invalid token'
        })
    }

}