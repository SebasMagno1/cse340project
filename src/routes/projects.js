const express = require("express");

const router = express.Router();

const projectsController =
    require("../controllers/projects");


router.get(
    "/projects",
    projectsController.buildProjects
);

router.get(
    "/project/:id",
    projectsController.buildProjectDetail
);


module.exports = router;