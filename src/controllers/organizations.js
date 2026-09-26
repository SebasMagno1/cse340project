const organizationsModel =
    require("../models/organizations");

    
/*
 * Display all organizations
 */
async function buildOrganizations(req, res, next) {
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


/*
 * Display one organization and all of its projects
 */
async function buildOrganizationDetail(req, res, next) {
    try {
        const organizationId =
            parseInt(req.params.id, 10);

        if (Number.isNaN(organizationId)) {
            return res.status(404).render("errors/404", {
                title: "Organization Not Found"
            });
        }

        const organization =
            await organizationsModel.getOrganizationById(
                organizationId
            );

        if (!organization) {
            return res.status(404).render("errors/404", {
                title: "Organization Not Found"
            });
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


module.exports = {
    buildOrganizations,
    buildOrganizationDetail
};