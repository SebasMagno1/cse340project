const pool = require("../database/pool");


async function getOrganizations() {
    const sql = `
        SELECT
            organization_id,
            name,
            description,
            image
        FROM organizations
        ORDER BY name;
    `;

    const result = await pool.query(sql);

    return result.rows;
}


async function getOrganizationById(organizationId) {
    const sql = `
        SELECT
            organization_id,
            name,
            description,
            image
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