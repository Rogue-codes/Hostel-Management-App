import mongoose from "mongoose";

const hostelSchema = new mongoose.Schema({
  title: {
    type: "string",
    required: true,
  },
  no_floors: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});
