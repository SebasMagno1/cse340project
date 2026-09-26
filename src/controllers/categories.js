const categoriesModel = require("../models/categories");


/*
 * Display all categories
 */
async function buildCategories(req, res, next) {
    try {
        const categories =
            await categoriesModel.getCategories();

        res.render("categories", {
            title: "Categories",
            categories
        });
    } catch (error) {
        next(error);
    }
}


/*
 * Display one category and all of its projects
 */
async function buildCategoryDetail(req, res, next) {
    try {
        const categoryId = parseInt(req.params.id, 10);

        if (Number.isNaN(categoryId)) {
            return res.status(404).render("errors/404", {
                title: "Category Not Found"
            });
        }

        const category =
            await categoriesModel.getCategoryById(categoryId);

        if (!category) {
            return res.status(404).render("errors/404", {
                title: "Category Not Found"
            });
        }

        const projects =
            await categoriesModel.getProjectsByCategoryId(
                categoryId
            );

        res.render("category-detail", {
            title: category.category_name,
            category,
            projects
        });
    } catch (error) {
        next(error);
    }
}


module.exports = {
    buildCategories,
    buildCategoryDetail
};
