const express = require("express");

const router = express.Router();

const projectsController =
    require("../controllers/projects");

// Projects list
router.get(
    "/projects",
    projectsController.buildProjects
);

// Project details
router.get(
    "/projects/:id",
    projectsController.buildProjectDetail
);


module.exports = router;