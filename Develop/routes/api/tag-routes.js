const router = require("express").Router();
const { Tag, Product, ProductTag, Category } = require("../../models");

// The `/api/tags` endpoint

router.get("/", async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const allTags = await Tag.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(allTags);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const oneTag = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    if (!oneTag) {
      res
        .status(404)
        .json({ message: "Tag not found. Try different ID number." });
      return;
    }
    res.status(200).json(oneTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", (req, res) => {
  // create a new tag
  Tag.create(req.body)
    .then((tag) => {
      res.status(200).json(tag);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.put("/:id", (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((tag) => {
      res.status(200).json(tag);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.delete("/:id", async (req, res) => {
  // delete on tag by its `id` value
  try {
    const oneTag = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!oneTag) {
      res
        .status(404)
        .json({ message: "Tag not found. Try different ID number." });
      return;
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
