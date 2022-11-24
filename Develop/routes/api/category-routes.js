const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const allCats = Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(allCats);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const oneCat = Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    if (!oneCat) {
      res
        .status(404)
        .json({ message: "Category not found. Try different ID number." });
      return;
    }
    res.status(200).json(oneCat);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", (req, res) => {
  // create a new category
  Category.create(req.body)
    .then((category) => {
      res.status(200).json(category);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.put("/:id", (req, res) => {
  // update a category by its `id` value
  Category.update(req.body)
    .then((category) => {
      res.status(200).json(category);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.delete("/:id", (req, res) => {
  // delete a category by its `id` value
  try {
    const oneCat = Category.destroy({
      where: {
        id: req.params.id
      }
    })
    if (!oneCat) {
      res.status(404).json({ message: "Category not found. Try different ID number." })
      return
    }
    res.status(200).json(oneCat)
  } catch(err) {
    res.status(500).json(err)
  }
});

module.exports = router;
