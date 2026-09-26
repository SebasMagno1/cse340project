const pool = require("../database/pool");


// Get all projects
async function getProjects() {
    const sql = `SELECT
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


// Get one project by ID
async function getProjectById(projectId) {
    const sql = `SELECT
            p.project_id,
            p.organization_id,
            p.title,
            p.description,
            p.location,
            p.project_date,
            o.organization_name
        FROM projects p
        INNER JOIN organizations o
            ON p.organization_id = o.organization_id
        WHERE p.project_id = $1;
    `;

    const result = await pool.query(
        sql,
        [projectId]
    );

    return result.rows[0];
}


module.exports = {
    getProjects,
    getProjectById
};
