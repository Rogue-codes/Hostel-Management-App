import Hostel from "../models/hostelModel.js";
import Room from "../models/roomModel.js";
// create room
export const createRoom = async (req, res) => {
  const { amount, hostelID, floor, amenities } = req.body;

  try {
    if (!amount || !hostelID || !floor || !amenities) {
      return res.status(400).json({
        status: "failed",
        message:
          "A room must have the following fields: amount, hostel,floor and amenities",
      });
    }
    const room = await Room.create({
      amount: amount,
      hostelID: hostelID,
      floor: floor,
      amenities: amenities,
    });
    res.status(201).json({
      status: "success",
      message: "Room created successfully",
      data: {
        room,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: error.message,
    });
  }
};

// update room
export const updateRoom = async (req, res) => {
  const { amount, floor, amenities } = req.body;
  const { id } = req.params;

  try{
    const room = await Room.findById(id);

    if (!room) {
      return res.status(404).json({
        status: "failed",
        message: "Room not found",
      });
    }
  
    const updatedRoom = await Room.findByIdAndUpdate(id, {
      amount:amount,
      floor:floor,
      amenities:amenities,

    },{new:true});
  
    res.status(200).json({
      status: "success",
      message: "Room updated successfully",
      data:{
          updatedRoom
      }
    })
  }catch(error) {
    res.status(500).json({
        status: "failed",
        message: error.message
    })
  }
};

// delete room
export const deleteRoom = async(req, res) => {
    const {id} = req.params
    try {
        const room = await Room.findById(id)

        if(!room){
            return res.status(404).json({
                status:"failed",
                message: "Room not found",
            })
        }
    
        const deletedRoom = await Room.findByIdAndDelete(id)
    
        res.status(200).json({
            status: "success",
            message:`${room.roomNumber} has been successfully deleted.`
        })
    } catch (error) {
        res.status(500).json({
            status: "failed",
            message:error.message
        })
    }


}
