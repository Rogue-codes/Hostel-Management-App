import Hostel from "../models/hostelModel.js";

// create hostel
export const createHostel = async (req, res) => {
  const { name, number_of_floors, location, maxRoomsPerFloor } = req.body;

  try {
    if (!name || !number_of_floors || !location || !maxRoomsPerFloor) {
      return res.status(400).json({
        status: "failed",
        message: "hostel name, location, no_of_floors and maxRoomsPerFloor are required",
      });
    }

    const hostel = await Hostel.create({
      name: name,
      location: location,
      number_of_floors: number_of_floors,
      ownedBy: req.user._id,
      maxRoomsPerFloor:maxRoomsPerFloor
    });
    res.status(201).json({
      status: "success",
      message: "hostel created successfully",
      data: {
        hostel,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: error.message,
    });
  }
};

// get hostels
export const getHostel = async (req, res) => {
  try {
    const hostels = await Hostel.find({ ownedBy: req.user._id });
    res.status(200).json({
      status: "success",
      message: "your hostels have been retrived",
      data: {
        hostels,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "failed",
      message: error.message,
    });
  }
};

// updateHostel
export const updateHostel = async (req, res) => {
  const { name, number_of_floors, location, maxRoomsPerFloor } = req.body;
  const { id } = req.params;

  try {
    const hostel = await Hostel.findById(id);

    if (!hostel) {
      return res.status(404).json({
        status: "failed",
        message: "Hostel not found",
      });
    }

    if (hostel.ownedBy.toString() !== req.user.id) {
      return res.status(401).json({
        status: "failed",
        message: "You are not authorized to perform this action",
      });
    }

    const updatedHostel = await Hostel.findByIdAndUpdate(
      id,
      {
        name: name,
        location: location,
        number_of_floors: number_of_floors,
        maxRoomsPerFloor:maxRoomsPerFloor
      },
      { new: true }
    );

    res.status(201).json({
      status: "success",
      message: "Hostel has been updated successfully",
      data: {
        updatedHostel,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: error.message,
    });
  }
};

// delete hostel

export const deleteHostel = async (req, res) => {
  const { id } = req.params;

  try {
    const hostel = await Hostel.findById(id);

    if (!hostel) {
      return res.status(404).json({
        status: "failed",
        message: "Hostel not found",
      });
    }
    if (hostel.ownedBy.toString() !== req.user.id) {
      return res.status(401).json({
        status: "failed",
        message: "You are not Authorized to perform this action.",
      });
    }
    const deletedHostel = await Hostel.findByIdAndDelete(id);

    res.status(200).json({
      status: "success",
      message: `${deletedHostel.name} has been successfully deleted`,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};
