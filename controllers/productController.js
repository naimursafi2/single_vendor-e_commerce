const categorySchema = require("../models/categorySchema");
const productSchema = require("../models/productSchema");

const createProduct = async (req, res) => {
  try {
    const {
      title,
      slug,
      discription,
      category,
      price,
      discountPercentage,
      variants,
      tags,
      isActive,
    } = req.body;
    const thumbnail = req.file?.thumbnail;
    const images = req.file?.images;

    if (!title)
      return res.status(400).send({ message: "Product title is required" });
    if (!slug) return res.status(400).send({ message: "Slug is required" });
    const isSlugExist = await productSchema.findOne({
      slug: slug.toLowerCase(),
    });
    if (isSlugExist)
      return res.status(400).send({ message: "Slug already exist" });
    if (!discription)
      return res
        .status(400)
        .send({ message: "Product description is required" });
    if (!category)
      return res.status(400).send({ message: "Product category is required" });
    const isCategoryExist = await categorySchema.findById(category);
    if (!isCategoryExist)
      return res.status(400).send({ message: "Invalid Category" });
    if (!price)
      return res.status(400).send({ message: "Product price is required" });
  }
   catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal server Error" });
  }
};

module.exports = { createProduct };
