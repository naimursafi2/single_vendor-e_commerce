const categorySchema = require("../models/categorySchema");

const createCategory = async (req, res) => {
  const { title } = req.body;
  // const { thumbnail } = req.file;
  try {
    if (!title?.trim())
      return res.status(400).send({ message: "category title is required" });
    const category = await categorySchema.create({ title });
    res.status(200).send({ message: "category created" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "internal server error" });
  }
};

const getAllCategories = async (req, res) => {
  try {
    const categories = await categorySchema.find({});
    res.status(200).send(categories);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "internal server error" });
  }
};

module.exports = { createCategory, getAllCategories };
