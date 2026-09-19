-- ============================================
-- ORGANIZATIONS
-- ============================================

CREATE TABLE IF NOT EXISTS organizations (
    organization_id SERIAL PRIMARY KEY,
    organization_name VARCHAR(100) NOT NULL
);


-- ============================================
-- SERVICE PROJECTS
-- ============================================

CREATE TABLE IF NOT EXISTS projects (
    project_id SERIAL PRIMARY KEY,
    organization_id INT NOT NULL,
    title VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(150) NOT NULL,
    project_date DATE NOT NULL,

    CONSTRAINT fk_project_organization
        FOREIGN KEY (organization_id)
        REFERENCES organizations(organization_id)
        ON DELETE CASCADE
);


-- ============================================
-- CATEGORIES
-- ============================================

CREATE TABLE IF NOT EXISTS categories (
    category_id SERIAL PRIMARY KEY,
    category_name VARCHAR(100) NOT NULL UNIQUE
);


-- ============================================
-- PROJECT CATEGORIES
-- MANY-TO-MANY RELATIONSHIP
-- ============================================

CREATE TABLE IF NOT EXISTS project_categories (
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

INSERT INTO organizations (organization_name)
VALUES
    ('Community Organization'),
    ('Environmental Organization'),
    ('Educational Organization')
ON CONFLICT DO NOTHING;


-- ============================================
-- SERVICE PROJECTS
-- 5 projects for each organization
-- ============================================

INSERT INTO projects
    (organization_id, title, description, location, project_date)
VALUES

-- Community Organization
(
    1,
    'Community Cleanup',
    'Help clean and improve public spaces in the local community.',
    'Orem Community Park',
    '2026-10-03'
),
(
    1,
    'Food Donation Drive',
    'Collect and organize food donations for local families.',
    'Community Center',
    '2026-10-10'
),
(
    1,
    'Neighborhood Support',
    'Assist local families with community support activities.',
    'Orem Neighborhood Center',
    '2026-10-17'
),
(
    1,
    'Senior Center Assistance',
    'Help staff and visitors at a local senior center.',
    'Orem Senior Center',
    '2026-10-24'
),
(
    1,
    'Community Garden',
    'Help maintain a garden that provides resources to the community.',
    'Community Garden',
    '2026-10-31'
),

-- Environmental Organization
(
    2,
    'Tree Planting',
    'Plant trees and improve local green spaces.',
    'Orem City Park',
    '2026-10-04'
),
(
    2,
    'River Cleanup',
    'Remove trash and debris from a local river area.',
    'Provo River',
    '2026-10-11'
),
(
    2,
    'Recycling Event',
    'Help organize a community recycling event.',
    'Environmental Center',
    '2026-10-18'
),
(
    2,
    'Trail Maintenance',
    'Help maintain and clean local hiking trails.',
    'Provo Canyon',
    '2026-10-25'
),
(
    2,
    'Wildlife Habitat Project',
    'Help improve natural habitat areas for local wildlife.',
    'Utah County',
    '2026-11-01'
),

-- Educational Organization
(
    3,
    'Educational Support',
    'Help students with learning activities and tutoring.',
    'Local School',
    '2026-10-05'
),
(
    3,
    'Reading Program',
    'Help children improve their reading skills.',
    'Orem Library',
    '2026-10-12'
),
(
    3,
    'Math Tutoring',
    'Provide math tutoring and academic support.',
    'Community Learning Center',
    '2026-10-19'
),
(
    3,
    'Computer Skills Workshop',
    'Help students learn basic computer skills.',
    'Technology Center',
    '2026-10-26'
),
(
    3,
    'School Supply Drive',
    'Collect school supplies for students in need.',
    'Educational Center',
    '2026-11-02'
);


-- ============================================
-- CATEGORIES
-- ============================================

INSERT INTO categories (category_name)
VALUES
    ('Community Service'),
    ('Environmental'),
    ('Educational'),
    ('Health and Wellness')
ON CONFLICT (category_name) DO NOTHING;


-- ============================================
-- PROJECT CATEGORY RELATIONSHIPS
-- ============================================

INSERT INTO project_categories
    (project_id, category_id)
VALUES
    (1, 1),
    (2, 1),
    (3, 1),
    (4, 4),
    (5, 1),

    (6, 2),
    (7, 2),
    (8, 2),
    (9, 2),
    (10, 2),

    (11, 3),
    (12, 3),
    (13, 3),
    (14, 3),
    (15, 3)
ON CONFLICT DO NOTHING;


-- ============================================
-- VERIFY DATA
-- ============================================

SELECT *
FROM organizations;

SELECT *
FROM projects;

SELECT *
FROM categories;

SELECT *
FROM project_categories;