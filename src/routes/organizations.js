const express = require("express");

const router = express.Router();

const organizationsController =
    require("../controllers/organizations");


router.get(
    "/organizations",
    organizationsController.buildOrganizations
);

router.get(
    "/organization/:id",
    organizationsController.buildOrganizationDetail
);


module.exports = router;