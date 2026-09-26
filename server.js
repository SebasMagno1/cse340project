const express = require("express");
const path = require("path");
require("dotenv").config();

const organizationsModel =
    require("./src/models/organizations");

const projectsModel =
    require("./src/models/projects");

const categoriesModel =
    require("./src/models/categories");

const app = express();

const PORT = process.env.PORT || 3000;


// ============================================
// EJS CONFIGURATION
// ============================================

app.set("view engine", "ejs");

app.set(
    "views",
    path.join(__dirname, "views")
);


// ============================================
// MIDDLEWARE
// ============================================

app.use(
    express.urlencoded({
        extended: true
    })
);

app.use(
    express.static(
        path.join(__dirname, "public")
    )
);


// ============================================
// HOME
// ============================================

app.get("/", async (req, res, next) => {

    try {

        const organizations =
            await organizationsModel.getOrganizations();

        const projects =
            await projectsModel.getProjects();

        const categories =
            await categoriesModel.getCategories();

        res.render("index", {
            title: "Home",
            organizations,
            projects,
            categories
        });

    } catch (error) {

        next(error);

    }

});


// ============================================
// ORGANIZATIONS LIST
// ============================================

app.get(
    "/organizations",
    async (req, res, next) => {

        try {

            const organizations =
                await organizationsModel.getOrganizations();

            res.render("organizations", {
                title: "Organizations",
                organizations
            });

        } catch (error) {

            next(error);

        }

    }
);


// ============================================
// ORGANIZATION DETAILS
// ============================================

app.get(
    "/organizations/:id",
    async (req, res, next) => {

        try {

            const organizationId =
                parseInt(req.params.id, 10);

            if (Number.isNaN(organizationId)) {

                return res.status(400).send(
                    "Invalid organization ID."
                );

            }

            const organization =
                await organizationsModel.getOrganizationById(
                    organizationId
                );

            if (!organization) {

                return res.status(404).send(
                    "Organization not found."
                );

            }

            const projects =
                await organizationsModel.getProjectsByOrganizationId(
                    organizationId
                );

            res.render("organization-detail", {
                title: organization.organization_name,
                organization,
                projects
            });

        } catch (error) {

            next(error);

        }

    }
);


// ============================================
// PROJECTS LIST
// ============================================

app.get(
    "/projects",
    async (req, res, next) => {

        try {

            const projects =
                await projectsModel.getProjects();

            res.render("projects", {
                title: "Service Projects",
                projects
            });

        } catch (error) {

            next(error);

        }

    }
);


// ============================================
// PROJECT DETAILS
// ============================================

app.get(
    "/projects/:id",
    async (req, res, next) => {

        try {

            const projectId =
                parseInt(req.params.id, 10);

            if (Number.isNaN(projectId)) {

                return res.status(400).send(
                    "Invalid project ID."
                );

            }

            const project =
                await projectsModel.getProjectById(
                    projectId
                );

            if (!project) {

                return res.status(404).send(
                    "Project not found."
                );

            }

            const categories =
                await projectsModel.getCategoriesByProjectId(
                    projectId
                );

            res.render("project-detail", {
                title: project.title,
                project,
                categories
            });

        } catch (error) {

            next(error);

        }

    }
);


// ============================================
// CATEGORIES LIST
// ============================================

app.get(
    "/categories",
    async (req, res, next) => {

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
);


// ============================================
// CATEGORY DETAILS
// ============================================

app.get(
    "/categories/:id",
    async (req, res, next) => {

        try {

            const categoryId =
                parseInt(req.params.id, 10);

            if (Number.isNaN(categoryId)) {

                return res.status(400).send(
                    "Invalid category ID."
                );

            }

            const category =
                await categoriesModel.getCategoryById(
                    categoryId
                );

            if (!category) {

                return res.status(404).send(
                    "Category not found."
                );

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
);


// ============================================
// 404
// ============================================

app.use(
    (req, res) => {

        res.status(404).render(
            "index",
            {
                title: "Page Not Found",
                organizations: [],
                projects: [],
                categories: []
            }
        );

    }
);


// ============================================
// ERROR HANDLER
// ============================================

app.use(
    (err, req, res, next) => {

        console.error(
            "Application Error:",
            err
        );

        res.status(500).send(
            "Sorry, there was an error communicating with the database."
        );

    }
);


// ============================================
// START SERVER
// ============================================

app.listen(
    PORT,
    () => {

        console.log(
            `Server running on port ${PORT}`
        );

    }
);