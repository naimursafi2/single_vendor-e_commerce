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

    //validation of product variants

    const variantsData = variants;

    if (!Array.isArray(variantsData) || variantsData.length === 0)
      return res.status(400).send({ message: "Minimum 1 variant is required" });

    for (const variant of variantsData) {
      if (!variant.sku)
        return res.status(400).send({ message: "SKU is required" });
      if (!variant.color)
        return res.status(400).send({ message: "Color is Required" });
      if (!variant.size)
        return res.status(400).send({ message: "Size is required" });
      if (!variant.stock || variant.stock < 1)
        return res
          .status(400)
          .send({ message: "stock is required and must by more than 0" });
    }

    const skus = variantsData.map((v) => v.sku);
    if (new set(skus).size !== skus.length)
      return res.status(400).send({ message: "SKU must unique" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal server Error" });
  }
};

module.exports = { createProduct };
