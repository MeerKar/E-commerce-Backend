const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint
router.get("/", async (req, res) => {
  // find all tags
  // be sure to include its associated Product data

  try {
    const tagAll = await Tag.findAll({
      include: [
        {
          model: Product,
        },
      ],
    });
    res.json(tagAll);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data

  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [
        {
          model: Product,
          attributes: ["product_name"],
        },
      ],
    });

    if (!tagData) {
      res.status(404).json({ message: "No tagfound with this id!" });
      return;
    }

    res.json(tagData);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.post("/", (req, res) => {
  // Create a new tag
  Tag.create(req.body)

    .then((newTag) => {
      res.json(newTag);
    })

    .catch((err) => {
      res.json(err);
    });
});

router.put("/:id", (req, res) => {
  // update tag data
  Tag.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((tag) => {
      return res.json(tag);
    })
    .catch((err) => res.json(err));
});

// delete on tag by its `id` value
router.delete("/:id", (req, res) => {
  Tag.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((deletedTag) => {
      res.json(deletedTag);
    })
    .catch((err) => res.json(err));
});

module.exports = router;
