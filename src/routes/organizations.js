const express = require("express");

const router = express.Router();

const organizationsController =
    require("../controllers/organizations");

// Organizations list
router.get(
    "/organizations",
    organizationsController.buildOrganizations
);

// Organization details
router.get(
    "/organizations/:id",
    organizationsController.buildOrganizationDetail
);


module.exports = router;