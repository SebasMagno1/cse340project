const pool = require("../database/pool");


// Get all categories
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


// Get one category by ID
async function getCategoryById(categoryId) {
    const sql = `
        SELECT
            category_id,
            category_name,
            description
        FROM categories
        WHERE category_id = $1;
    `;

    const result = await pool.query(
        sql,
        [categoryId]
    );

    return result.rows[0];
}


// Get all categories for a project
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

    const result = await pool.query(
        sql,
        [projectId]
    );

    return result.rows;
}


// Get all projects for a category
async function getProjectsByCategoryId(categoryId) {
    const sql = `
        SELECT
            p.project_id,
            p.title,
            p.description,
            p.location,
            p.project_date,
            o.organization_name
        FROM projects p
        INNER JOIN project_categories pc
            ON p.project_id = pc.project_id
        INNER JOIN organizations o
            ON p.organization_id = o.organization_id
        WHERE pc.category_id = $1
        ORDER BY p.project_date;
    `;

    const result = await pool.query(
        sql,
        [categoryId]
    );

    return result.rows;
}


module.exports = {
    getCategories,
    getCategoryById,
    getCategoriesByProjectId,
    getProjectsByCategoryId
};