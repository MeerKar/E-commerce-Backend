const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint
router.get("/", async (req, res) => {
  // find all tags
  // be sure to include its associated Product data

  try {
    const tagData = await Tag.findAll({
      include: [
        {
          model: Product,
        },
      ],
    });
    res.json(tagData);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: Product,
        },
      ],
    });
    if (!tagData) {
      res.status(404).json({ message: "No tag found with this id!" });
      return;
    }

    res.json(tagData);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  try {
    // Create a new tag
    const tagData = await Tag.create({
      tag_name: req.body.tag_name,
    });
    res.json(tagData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating new tag", error: err });
  }
});

router.put("/:id", async (req, res) => {
  try {
    // update a tag's name by its `id` value
    const [tag_id] = await Tag.update(
      { tag_name: req.body.tag_name },
      {
        where: { id: req.params.id },
      }
    );
    if (tag_id > 0) {
      const updatedTag = await Tag.findOne({ where: { id: req.params.id } });
      res.json(updatedTag);
    } else {
      res.status(404).json({ message: "No tag found with this id!" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating the tag", error: err });
  }
});
router.delete("/:id", async (req, res) => {
  // delete on tag by its `id` value

  try {
    const numberOfDeletedRows = await Tag.destroy({
      where: { id: req.params.id },
    });

    if (numberOfDeletedRows > 0) {
      res.status(200).json({ message: "Tag deleted successfully." });
    } else {
      // If no rows are deleted, it likely means there was no tag with the provided id.
      res.status(404).json({ message: "No tag found with this id!" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting the tag", error: err });
  }
});

module.exports = router;
