-- ============================================
-- CSE 340 SERVICE PROJECTS DATABASE
-- ============================================

-- Delete existing tables so the script can be
-- executed again without errors.

DROP TABLE IF EXISTS project_categories;
DROP TABLE IF EXISTS projects;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS organizations;


-- ============================================
-- ORGANIZATIONS
-- ============================================

CREATE TABLE organizations (
    organization_id SERIAL PRIMARY KEY,
    organization_name VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    website VARCHAR(255)
);


-- ============================================
-- CATEGORIES
-- ============================================

CREATE TABLE categories (
    category_id SERIAL PRIMARY KEY,
    category_name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT NOT NULL
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
    project_date DATE NOT NULL,

    CONSTRAINT fk_projects_organization
        FOREIGN KEY (organization_id)
        REFERENCES organizations(organization_id)
        ON DELETE CASCADE
);



-- ============================================
-- PROJECT CATEGORIES
-- MANY-TO-MANY RELATIONSHIP
-- ============================================

CREATE TABLE project_categories (
    project_id INT NOT NULL,
    category_id INT NOT NULL,

    PRIMARY KEY (project_id, category_id),

    CONSTRAINT fk_project_categories_project
        FOREIGN KEY (project_id)
        REFERENCES projects(project_id)
        ON DELETE CASCADE,

    CONSTRAINT fk_project_categories_category
        FOREIGN KEY (category_id)
        REFERENCES categories(category_id)
        ON DELETE CASCADE
);


-- ============================================
-- ORGANIZATION DATA
-- ============================================

INSERT INTO organizations
    (organization_name, description, website)
VALUES
(
    'Community Care Utah',
    'An organization dedicated to helping individuals and families in local communities.',
    'https://example.org/community-care'
),
(
    'Green Utah',
    'An environmental organization focused on protecting nature and improving local green spaces.',
    'https://example.org/green-utah'
),
(
    'Education Partners',
    'An organization that provides educational opportunities, tutoring, and student support.',
    'https://example.org/education-partners'
);


-- ============================================
-- CATEGORY DATA
-- ============================================

INSERT INTO categories
    (category_name, description)
VALUES
(
    'Community Service',
    'Projects designed to help strengthen and support local communities.'
),
(
    'Environmental',
    'Projects focused on protecting, restoring, and improving the environment.'
),
(
    'Educational',
    'Projects focused on education, tutoring, learning, and student support.'
),
(
    'Health and Wellness',
    'Projects focused on supporting health, wellness, and quality of life.'
);


-- ============================================
-- PROJECT DATA
-- ============================================

INSERT INTO projects
    (
        organization_id,
        title,
        description,
        location,
        project_date
    )
VALUES
(
    1,
    'Community Cleanup',
    'Help clean and improve public spaces while working with other community volunteers.',
    'Orem Community Park',
    '2026-10-10'
),
(
    2,
    'Tree Planting',
    'Help plant trees and improve local green spaces while supporting a healthier environment.',
    'Provo Canyon',
    '2026-10-17'
),
(
    3,
    'Educational Support',
    'Help students with learning activities, tutoring, and educational programs.',
    'Orem Community Center',
    '2026-10-24'
),
(
    1,
    'Food Donation Drive',
    'Help collect and organize food donations for local families.',
    'Orem Community Center',
    '2026-11-07'
),
(
    3,
    'Student Tutoring',
    'Support students through tutoring and educational activities.',
    'Orem Library',
    '2026-11-14'
);


-- ============================================
-- PROJECT/CATEGORY RELATIONSHIPS
-- ============================================

INSERT INTO project_categories
    (project_id, category_id)
VALUES
(1, 1),
(1, 4),

(2, 2),

(3, 3),

(4, 1),
(4, 4),

(5, 3);