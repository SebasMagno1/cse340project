const pool = require("../database/pool");


// Get all organizations
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


// Get one organization
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


module.exports = {
    getOrganizations,
    getOrganizationById
};