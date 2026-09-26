const express = require("express");

const router = express.Router();

const categoriesController =
    require("../controllers/categories");

// Categories list
router.get(
    "/categories",
    categoriesController.buildCategories
);

// Category details
router.get(
    "/categories/:id",
    categoriesController.buildCategoryDetail
);


module.exports = router;