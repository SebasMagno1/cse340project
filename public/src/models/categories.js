const pool = require("../database/pool");


// ============================================
// GET ALL CATEGORIES
// ============================================

async function getCategories() {

    const sql = `
        SELECT
            category_id,
            category_name,
            description
        FROM categories
        ORDER BY category_name;
    `;

    const result = await pool.query(sql);

    return result.rows;
}


// ============================================
// GET CATEGORIES WITH PROJECTS
// ============================================

async function getCategoriesWithProjects() {

    const sql = `
        SELECT
            c.category_id,
            c.category_name,
            c.description,

            COALESCE(
                JSON_AGG(
                    JSON_BUILD_OBJECT(
                        'project_id', p.project_id,
                        'title', p.title,
                        'description', p.description,
                        'location', p.location,
                        'project_date', p.project_date
                    )
                    ORDER BY p.project_date
                ) FILTER (
                    WHERE p.project_id IS NOT NULL
                ),
                '[]'
            ) AS projects

        FROM categories c

        LEFT JOIN project_categories pc
            ON c.category_id = pc.category_id

        LEFT JOIN projects p
            ON pc.project_id = p.project_id

        GROUP BY
            c.category_id,
            c.category_name,
            c.description

        ORDER BY c.category_name;
    `;

    const result = await pool.query(sql);

    return result.rows;
}


module.exports = {
    getCategories,
    getCategoriesWithProjects
};