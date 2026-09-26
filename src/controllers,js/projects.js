const projectsModel =
    require("../models/projects");

const categoriesModel =
    require("../models/categories");


// Project list
async function buildProjects(
    req,
    res,
    next
) {
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


// Project detail
async function buildProjectDetail(
    req,
    res,
    next
) {
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
            await categoriesModel
                .getCategoriesByProjectId(
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