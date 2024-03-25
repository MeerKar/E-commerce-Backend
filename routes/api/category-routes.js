const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  try {
    // find all categories and include its associated Products
    const categoryData = await Category.findAll({
      include: [
        {
          model: Product,
          attributes: ["product_name"],
        },
      ],
    });
    res.json(categoryData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    // find all categories and include its associated Products
    const categoryData = await Category.findOne({
      include: [
        {
          model: Product,
          attributes: ["product_name"],
        },
      ],
    });
    res.json(categoryData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  // create a new category
  try {
    const newCategory = await Category.create({
      name: req.body.name,
    });
    res.status(201).json(newCategory);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.put("/:id", async (req, res) => {
  // update a category by its `id` value

  try {
    const [updated] = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (updated) {
      const updatedCategory = await Category.findOne({
        where: { id: req.params.id },
      });
      res.status(200).json(updatedCategory);
    } else {
      res.status(404).json({ message: "Category not found with this id!" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  // delete a category by its `id` value

  try {
    const categoryDelete = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (categoryDelete > 0) {
      res.status(200).json({ message: "Category deleted successfully." });
    } else {
      res.status(404).json({ message: "Category not found with this id!" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error." });
  }
});

module.exports = router;
