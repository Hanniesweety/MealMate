import Restaurant from "../models/Restaurant.js";


// CREATE RESTAURANT
export const createRestaurant = async (req, res) => {

  try {

    const {
      name,
      description,
      cuisine,
      image,
      address,
      latitude,
      longitude,
    } = req.body;

    const restaurant = await Restaurant.create({

      name,
      description,
      cuisine,
      image,
      address,

      owner: req.user.id,

      location: {
        type: "Point",
        coordinates: [longitude, latitude],
      },

    });

    res.status(201).json({
      message: "Restaurant created successfully",
      restaurant,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};