import Food from "../models/Food.js";


// CREATE FOOD
export const createFood = async (req, res) => {
  try {

    const {
      name,
      description,
      price,
      category,
      image,
      restaurant,
    } = req.body;

    const food = await Food.create({
      name,
      description,
      price,
      category,
      image,
      restaurant,
    });

    res.status(201).json({
      message: "Food item created successfully",
      food,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};


// GET RESTAURANT MENU
export const getRestaurantMenu = async (req, res) => {
  try {

    const foods = await Food.find({
      restaurant: req.params.restaurantId,
    });

    res.status(200).json({
      count: foods.length,
      foods,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};