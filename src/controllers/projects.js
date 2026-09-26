const projectsModel =
    require("../models/projects");

const categoriesModel =
    require("../models/categories");


/*
 * Display the upcoming service projects
 */
async function buildProjects(req, res, next) {
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


/*
 * Display one service project and its categories
 */
async function buildProjectDetail(req, res, next) {
    try {
        const projectId =
            parseInt(req.params.id, 10);

        if (Number.isNaN(projectId)) {
            return res.status(404).render("errors/404", {
                title: "Project Not Found"
            });
        }

        const project =
            await projectsModel.getProjectById(
                projectId
            );

        if (!project) {
            return res.status(404).render("errors/404", {
                title: "Project Not Found"
            });
        }

        const categories =
            await categoriesModel.getCategoriesByProjectId(
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


module.exports = {
    buildProjects,
    buildProjectDetail
};