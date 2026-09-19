const pool = require("../database/pool");


async function getProjects() {
    const sql = `
        SELECT
            p.project_id,
            p.organization_id,
            p.title,
            p.description,
            p.location,
            p.date,
            o.name AS organization_name,
            COALESCE(
                STRING_AGG(c.name, ', ' ORDER BY c.name),
                'No category'
            ) AS categories
        FROM projects p

        JOIN organizations o
            ON p.organization_id = o.organization_id

        LEFT JOIN project_categories pc
            ON p.project_id = pc.project_id

        LEFT JOIN categories c
            ON pc.category_id = c.category_id

        GROUP BY
            p.project_id,
            p.organization_id,
            p.title,
            p.description,
            p.location,
            p.date,
            o.name

        ORDER BY p.date;
    `;

    const result = await pool.query(sql);

    return result.rows;
}


async function getProjectById(projectId) {
    const sql = `
        SELECT
            p.project_id,
            p.organization_id,
            p.title,
            p.description,
            p.location,
            p.date,
            o.name AS organization_name,
            COALESCE(
                STRING_AGG(c.name, ', ' ORDER BY c.name),
                'No category'
            ) AS categories
        FROM projects p

        JOIN organizations o
            ON p.organization_id = o.organization_id

        LEFT JOIN project_categories pc
            ON p.project_id = pc.project_id

        LEFT JOIN categories c
            ON pc.category_id = c.category_id

        WHERE p.project_id = $1

        GROUP BY
            p.project_id,
            p.organization_id,
            p.title,
            p.description,
            p.location,
            p.date,
            o.name;
    `;

    const result = await pool.query(sql, [projectId]);

    return result.rows[0];
}


module.exports = {
    getProjects,
    getProjectById
};