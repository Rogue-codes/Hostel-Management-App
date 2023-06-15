import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
const adminSchema = new mongoose.Schema({
    name: {
        type: 'string',
        required: true,
    },
    email: { 
        type: 'string',
        required: true,
        unique: true
    },
    password: { 
        type: 'string',
        required: true,
    }
})

// verify encrypted password before login
adminSchema.methods.matchPassword = async function(password){
    return await bcrypt.compare(password, this.password)
}

// hash password before saving to DB
adminSchema.pre('save', async function (next) {
    if(!this.isModified('password')){
        return next()
    }

    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

const Admin = mongoose.model('Admin', adminSchema)

export default Admin