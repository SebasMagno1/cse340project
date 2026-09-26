const pool = require("../database/pool");

/*
 * Get all service projects
 */
async function getProjects() {
    const sql = `
        SELECT
            p.project_id,
            p.title,
            p.description,
            p.location,
            p.project_date,
            p.organization_id,
            o.organization_name
        FROM projects p
        INNER JOIN organizations o
            ON p.organization_id = o.organization_id
        ORDER BY p.project_date;
    `;

    const result = await pool.query(sql);

    return result.rows;
}


/*
 * Get one service project by ID
 */
async function getProjectById(projectId) {
    const sql = `
        SELECT
            p.project_id,
            p.title,
            p.description,
            p.location,
            p.project_date,
            p.organization_id,
            o.organization_name
        FROM projects p
        INNER JOIN organizations o
            ON p.organization_id = o.organization_id
        WHERE p.project_id = $1;
    `;

    const result = await pool.query(sql, [projectId]);

    return result.rows[0];
}


/*
 * Get all categories for a specific project
 */
async function getCategoriesByProjectId(projectId) {
    const sql = `
        SELECT
            c.category_id,
            c.category_name,
            c.description
        FROM categories c
        INNER JOIN project_categories pc
            ON c.category_id = pc.category_id
        WHERE pc.project_id = $1
        ORDER BY c.category_name;
    `;

    const result = await pool.query(sql, [projectId]);

    return result.rows;
}


module.exports = {
    getProjects,
    getProjectById,
    getCategoriesByProjectId
};
