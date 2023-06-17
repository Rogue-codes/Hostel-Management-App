import mongoose from "mongoose";

const hostelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  number_of_floors: {
    type: Number,
    required: true,
    default: 1
  },
  maxRoomsPerFloor: {
    type: Number,
    required: true,
  },
  ownedBy:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin",
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
});

const Hostel = mongoose.model("Hostel", hostelSchema);

export default Hostel;