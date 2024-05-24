// Models
import User from "../models/user.model.js";

export const readAll = async (req, res) => {
  try {
    const services = await User.find();

    res.status(200).json(services);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
