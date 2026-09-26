const express = require("express");

const router = express.Router();

const categoriesController =
    require("../controllers/categories");


router.get(
    "/categories",
    categoriesController.buildCategories
);

router.get(
    "/category/:id",
    categoriesController.buildCategoryDetail
);


module.exports = router;