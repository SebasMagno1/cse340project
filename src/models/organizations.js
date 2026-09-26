const pool = require("../database/pool");

/*
 * Get all organizations
 */
async function getOrganizations() {
    const sql = `
        SELECT
            organization_id,
            organization_name,
            description,
            website
        FROM organizations
        ORDER BY organization_name;
    `;

    const result = await pool.query(sql);

    return result.rows;
}


/*
 * Get one organization by ID
 */
async function getOrganizationById(organizationId) {
    const sql = `
        SELECT
            organization_id,
            organization_name,
            description,
            website
        FROM organizations
        WHERE organization_id = $1;
    `;

    const result = await pool.query(sql, [organizationId]);

    return result.rows[0];
}


/*
 * Get all projects for an organization
 */
async function getProjectsByOrganizationId(organizationId) {
    const sql = `
        SELECT
            project_id,
            title,
            description,
            location,
            project_date,
            organization_id
        FROM projects
        WHERE organization_id = $1
        ORDER BY project_date;
    `;

    const result = await pool.query(sql, [organizationId]);

    return result.rows;
}


module.exports = {
    getOrganizations,
    getOrganizationById,
    getProjectsByOrganizationId
};
