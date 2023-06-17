import mongoose from 'mongoose';
import Hostel from './hostelModel.js';

const roomSchema = new mongoose.Schema({
  roomNumber: {
    type: String,
    unique: true,
  },
  isOccupied:{
    type: Boolean,
    default: false,
  },
  amount: {
    type: Number,
    required: true,
  },
  hostelID:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Hostel",
    required: true,
  },
  hostelDetails:{
    type: {
      hostelName: String,
      hostelLocation: String,
    },
  },
  floor:{
    type:Number,
    required: true,
  },
  amenities: [
    {
      type: String,
      required: true
    },
  ],
  // Other fields for the room schema
},{ toJSON: { virtuals: true } });

// Pre-save middleware to generate and assign the room number
roomSchema.pre('save', async function (next) {
  if (!this.roomNumber) {
    const lastRoom = await Room.findOne({}, {}, { sort: { roomNumber: -1 } });
    const newRoomNumber = lastRoom
      ? String(parseInt(lastRoom.roomNumber) + 1).padStart(3, '0')
      : '001';
    this.roomNumber = newRoomNumber;
  }
  next();
});

// ensure that rooms do not exceed the max room count for each floor.
roomSchema.pre('save', async function (next) {
    const hostel = await Hostel.findById(this.hostelID);
    if (!hostel) {
      throw new Error(`Hostel not found for room with ID: ${this._id}`);
    }
  
    if (this.floor > 0 && this.floor <= hostel.maxRoomsPerFloor) {
      const existingRoomCount = await Room.countDocuments({ floor: this.floor, hostel: this.hostel });
      if (existingRoomCount >= hostel.maxRoomsPerFloor) {
        throw new Error(`Floor ${this.floor} in ${hostel.name} has reached the maximum number of rooms.`);
      }
    } else {
      throw new Error(`Invalid floor value for room with ID: ${this._id}`);
    }
    next();
  });

  // prefil the hostel details object

  roomSchema.pre('save', async function (next) {
    const hostel = await Hostel.findById(this.hostelID).select("-_id");
  
    if (!hostel) {
      throw new Error('Hostel does not exist');
    } else {
      this.hostelDetails = {
        hostelLocation: hostel.location,
        hostelName: hostel.name,
      };
    }
  
    next();
  });

  // roomSchema.pre('findOneAndUpdate', async function (next) {
  //   const hostel = await Hostel.findById(this.hostelID)
  //   if(hostel.ownedBy.toString() !== this.context.req.user.id){
  //     throw new Error('you are not authorized')
  //   }
  //   next()
  // });
  
  
  const Room = mongoose.model('Room', roomSchema);
  
  export default Room;