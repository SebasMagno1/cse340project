const express = require("express");
const path = require("path");
require("dotenv").config();

const organizationsModel = require("./src/models/organizations");
const projectsModel = require("./src/models/projects");
const categoriesModel = require("./src/models/categories");

const app = express();

const PORT = process.env.PORT || 3000;


// ============================================
// EJS CONFIGURATION
// ============================================

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


// ============================================
// MIDDLEWARE
// ============================================

app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));


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
// ORGANIZATIONS
// ============================================

app.get("/organizations", async (req, res, next) => {
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
});


// ============================================
// PROJECTS
// ============================================

app.get("/projects", async (req, res, next) => {
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
});


// ============================================
// SINGLE PROJECT
// ============================================

app.get("/projects/:id", async (req, res, next) => {
    try {
        const projectId = parseInt(req.params.id, 10);

        if (Number.isNaN(projectId)) {
            return res.status(400).send("Invalid project ID.");
        }

        const project =
            await projectsModel.getProjectById(projectId);

        if (!project) {
            return res.status(404).send("Project not found.");
        }

        res.render("project-detail", {
            title: project.title,
            project
        });

    } catch (error) {
        next(error);
    }
});


// ============================================
// CATEGORIES
// ============================================

app.get("/categories", async (req, res, next) => {
    try {
        const categories =
            await categoriesModel.getCategoriesWithProjects();

        res.render("categories", {
            title: "Categories",
            categories
        });

    } catch (error) {
        next(error);
    }
});


// ============================================
// 404
// ============================================

app.use((req, res) => {
    res.status(404).render("index", {
        title: "Page Not Found",
        organizations: [],
        projects: [],
        categories: []
    });
});


// ============================================
// ERROR HANDLER
// ============================================

app.use((err, req, res, next) => {
    console.error("Application Error:", err);

    res.status(500).send(
        "Sorry, there was an error communicating with the database."
    );
});


// ============================================
// START SERVER
// ============================================

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});