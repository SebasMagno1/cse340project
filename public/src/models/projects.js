const pool = require("../database/pool");


// ============================================
// GET ALL PROJECTS
// ============================================

async function getProjects() {

    const sql = `
        SELECT
            p.project_id,
            p.organization_id,
            p.title,
            p.description,
            p.location,
            p.project_date,

            o.organization_name,

            COALESCE(
                STRING_AGG(
                    c.category_name,
                    ', '
                    ORDER BY c.category_name
                ),
                'Uncategorized'
            ) AS categories

        FROM projects p

        INNER JOIN organizations o
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
            p.project_date,
            o.organization_name

        ORDER BY p.project_date;
    `;

    const result = await pool.query(sql);

    return result.rows;
}


// ============================================
// GET PROJECT BY ID
// ============================================

async function getProjectById(projectId) {

    const sql = `
        SELECT
            p.project_id,
            p.organization_id,
            p.title,
            p.description,
            p.location,
            p.project_date,

            o.organization_name,

            COALESCE(
                ARRAY_AGG(
                    DISTINCT c.category_name
                ) FILTER (
                    WHERE c.category_name IS NOT NULL
                ),
                ARRAY[]::VARCHAR[]
            ) AS categories

        FROM projects p

        INNER JOIN organizations o
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
            p.project_date,
            o.organization_name;
    `;

    const result = await pool.query(sql, [projectId]);

    return result.rows[0];
}


module.exports = {
    getProjects,
    getProjectById
};