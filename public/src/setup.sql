-- ============================================
-- CSE 340 SERVICE PROJECTS DATABASE
-- ============================================

-- Delete existing tables if they exist
DROP TABLE IF EXISTS project_categories;
DROP TABLE IF EXISTS projects;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS organizations;


-- ============================================
-- ORGANIZATIONS
-- ============================================

CREATE TABLE organizations (
    organization_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    image VARCHAR(255)
);


-- ============================================
-- PROJECTS
-- ============================================

CREATE TABLE projects (
    project_id SERIAL PRIMARY KEY,
    organization_id INT NOT NULL,
    title VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(150) NOT NULL,
    date DATE NOT NULL,

    CONSTRAINT projects_organization_fk
        FOREIGN KEY (organization_id)
        REFERENCES organizations(organization_id)
        ON DELETE CASCADE
);


-- ============================================
-- CATEGORIES
-- ============================================

CREATE TABLE categories (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);


-- ============================================
-- PROJECT CATEGORIES
-- Many-to-many relationship
-- ============================================

CREATE TABLE project_categories (
    project_id INT NOT NULL,
    category_id INT NOT NULL,

    PRIMARY KEY (project_id, category_id),

    CONSTRAINT project_categories_project_fk
        FOREIGN KEY (project_id)
        REFERENCES projects(project_id)
        ON DELETE CASCADE,

    CONSTRAINT project_categories_category_fk
        FOREIGN KEY (category_id)
        REFERENCES categories(category_id)
        ON DELETE CASCADE
);


-- ============================================
-- ORGANIZATION DATA
-- ============================================

INSERT INTO organizations
    (name, description, image)
VALUES
(
    'Community Food Bank',
    'Provides food and support to families and individuals in need.',
    'food-bank.jpg'
),
(
    'Utah Clean Community',
    'Organizes environmental cleanup activities in local communities.',
    'cleanup.jpg'
),
(
    'Helping Hands',
    'Supports local families through volunteer service projects.',
    'helping-hands.jpg'
);


-- ============================================
-- CATEGORY DATA
-- ============================================

INSERT INTO categories
    (name)
VALUES
('Food'),
('Environment'),
('Education'),
('Community'),
('Families');


-- ============================================
-- PROJECT DATA
-- ============================================

INSERT INTO projects
    (
        organization_id,
        title,
        description,
        location,
        date
    )
VALUES
(
    1,
    'Community Food Drive',
    'Volunteers help organize and distribute food to local families.',
    'Orem Community Center',
    '2026-10-10'
),
(
    2,
    'Park Cleanup',
    'Volunteers clean a local park and help improve the environment.',
    'Orem City Park',
    '2026-10-17'
),
(
    3,
    'Family Support Event',
    'Volunteers help families with community resources and activities.',
    'Provo Community Center',
    '2026-10-24'
),
(
    1,
    'Thanksgiving Food Distribution',
    'Volunteers prepare and distribute food packages to families.',
    'Utah County Food Bank',
    '2026-11-21'
),
(
    2,
    'River Cleanup',
    'Volunteers collect trash and protect the local environment.',
    'Provo River',
    '2026-11-07'
);


-- ============================================
-- PROJECT ↔ CATEGORY RELATIONSHIPS
-- ============================================

INSERT INTO project_categories
    (project_id, category_id)
VALUES
(1, 1),
(1, 4),
(2, 2),
(2, 4),
(3, 4),
(3, 5),
(4, 1),
(4, 5),
(5, 2),
(5, 4);


-- ============================================
-- TEST QUERIES
-- ============================================

SELECT *
FROM organizations;

SELECT *
FROM projects;

SELECT *
FROM categories;

SELECT
    p.project_id,
    p.title,
    o.name AS organization,
    p.description,
    p.location,
    p.date
FROM projects p
JOIN organizations o
    ON p.organization_id = o.organization_id;