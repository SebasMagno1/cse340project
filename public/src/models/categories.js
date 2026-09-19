const pool = require("../database/pool");


async function getCategories() {
    const sql = `
        SELECT
            category_id,
            name
        FROM categories
        ORDER BY name;
    `;

    const result = await pool.query(sql);

    return result.rows;
}


async function getCategoriesWithProjects() {
    const sql = `
        SELECT
            c.category_id,
            c.name,
            COUNT(pc.project_id)::INT AS project_count
        FROM categories c

        LEFT JOIN project_categories pc
            ON c.category_id = pc.category_id

        GROUP BY
            c.category_id,
            c.name

        ORDER BY c.name;
    `;

    const result = await pool.query(sql);

    return result.rows;
}


module.exports = {
    getCategories,
    getCategoriesWithProjects
};