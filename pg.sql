DROP TABLE accounts;

CREATE TABLE accounts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users ON DELETE CASCADE,
    type VARCHAR(255),
    provider VARCHAR(255) NOT NULL,
    provider_account_id VARCHAR(65535) NOT NULL,
    refresh_token VARCHAR(65535),
    access_token VARCHAR(65535) NULL,
    expires_at INTEGER NULL,
    token_type VARCHAR(255) NULL,
    scope VARCHAR(255),
    id_token VARCHAR(65535),
    oauth_token_secret VARCHAR(65535),
    oauth_token VARCHAR(65535),
    session_state VARCHAR(65535),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE sessions;

CREATE TABLE sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users ON DELETE CASCADE,
    expires_at TIMESTAMP WITH TIME ZONE,
    session_token VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE users;

CREATE TABLE users (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "slug" VARCHAR(255) NOT NULL,
    "first_name" VARCHAR(255) NOT NULL,
    "last_name" VARCHAR(255) NOT NULL,
    "phone" VARCHAR(255) NULL,
    "birthdate" DATE NULL,
    "gender" VARCHAR(32) NULL,
    "email" VARCHAR(255) UNIQUE NOT NULL,
    "email_verified" TIMESTAMP WITH TIME ZONE NULL,
    "role" VARCHAR(255) NOT NULL DEFAULT 'user',
    "image" VARCHAR(1024) NULL,
    "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

UPDATE
    users
SET
    role = 'admin'
WHERE
    email = 's.hachemane@gmail.com';

DELETE FROM
    users
WHERE
    email = 'zelod.contact@gmail.com';

ALTER TABLE
    users
ALTER COLUMN
    name DROP NOT NULL;

ALTER TABLE
    users
ADD
    COLUMN birthdate DATE NULL;

DELETE FROM
    users
WHERE
    email = 'radiojeje@hotmail.com';

DELETE FROM
    users;

DELETE FROM
    accounts;

DELETE FROM
    accounts
WHERE
    provider = 'facebook';

DELETE FROM
    sessions;

DROP TABLE verification_tokens;

DELETE FROM
    verification_tokens;

CREATE TABLE verification_tokens (
    token VARCHAR(255) PRIMARY KEY,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    identifier VARCHAR(255) NOT NULL
);

CREATE TABLE cities (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    slug VARCHAR(32) NOT NULL,
    name VARCHAR(32) NOT NULL,
    latitude REAL NOT NULL,
    longitude REAL NOT NULL
);

INSERT INTO
    cities (slug, name, latitude, longitude)
VALUES
    (
        'lausanne',
        'Lausanne',
        40,
        8
    );

CREATE TABLE regions (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    code VARCHAR(5) NOT NULL,
    slug VARCHAR(32) NOT NULL,
    name VARCHAR(32) NOT NULL,
    latitude REAL NOT NULL,
    longitude REAL NOT NULL
);

INSERT INTO
    regions (code, slug, name, latitude, longitude)
VALUES
    (
        'vd',
        'vaud',
        'Vaud',
        40,
        8
    );

CREATE TABLE countries (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    code VARCHAR(3) NOT NULL,
    slug VARCHAR(32) NOT NULL,
    name VARCHAR(32) NOT NULL,
    latitude REAL NOT NULL,
    longitude REAL NOT NULL
);

INSERT INTO
    countries (code, slug, name, latitude, longitude)
VALUES
    (
        'CH',
        'switzerland',
        'Switzerland',
        40,
        8
    );

DROP TABLE addresses;

CREATE TABLE addresses (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    address VARCHAR(255) NOT NULL,
    street VARCHAR(64) NOT NULL,
    number INTEGER,
    city UUID NOT NULL REFERENCES cities,
    postal_code INT NOT NULL,
    region UUID NOT NULL REFERENCES regions,
    country UUID NOT NULL REFERENCES countries,
    latitude REAL NOT NULL,
    longitude REAL NOT NULL
);

INSERT INTO
    addresses (
        address,
        street,
        number,
        postal_code,
        city,
        region,
        country,
        latitude,
        longitude
    )
VALUES
    (
        'Avenue des Figuiers 13, 1007 Lausanne, Suisse',
        'Avenue des Figuiers',
        13,
        1007,
        '72705907-664b-40fb-9289-63f65cc05ea1',
        'a86575e3-246d-436e-bdce-35c7e66ea8d0',
        '1d4569c6-d469-4873-84da-f2673e13bec6',
        40,
        8
    );

ALTER TABLE
    address RENAME TO addresses;

CREATE TABLE restaurants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug VARCHAR(255) UNIQUE,
    owner_id UUID NOT NULL REFERENCES users,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    cuisine VARCHAR(255) NOT NULL,
    image VARCHAR(500) NOT NULL,
    phone VARCHAR(255),
    website VARCHAR(255),
    address VARCHAR(255) NOT NULL,
    street VARCHAR(255) NOT NULL,
    street_number INTEGER NOT NULL,
    postal_code INTEGER NOT NULL,
    city VARCHAR(255) NOT NULL,
    region VARCHAR(255) NOT NULL,
    country VARCHAR(255) NOT NULL,
    latitude REAL NOT NULL,
    longitude REAL NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE
    restaurants
ALTER COLUMN
    cuisine DROP DEFAULT;

ALTER TABLE
    restaurants
ADD
    CONSTRAINT unique_slug UNIQUE (slug);

DROP TABLE restaurants CASCADE;

92c6e519 - dc99 -4778 - bc73 - f593e9071163
ALTER TABLE
    restaurants ALTER owner_id DROP DEFAULT;

ALTER TABLE
    restaurants
ADD
    website VARCHAR(255);

UPDATE
    restaurants
SET
    address = '2f124fe1-90a0-4ee3-9f91-1477b8ef4b88';

INSERT INTO
    restaurants (slug, name, intro, description, image)
VALUES
    (
        'holycow',
        'Holy Cow!',
        'A fresh gourmet burger, served only with local and tasty products, all in less than 10 minutes.',
        'A fresh gourmet burger, served only with local and tasty products, all in less than 10 minutes.',
        'https://www.flughafen-zuerich.ch/-/jssmedia/airport/portal/bilder/shopfinder/bilder/gastro/oeffentlicher-bereich/check-in-2/small_1_holy_cow_x0a0922tc.jpg?vs=1&mw=1920'
    );

CREATE TABLE items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
    restaurant_id UUID NOT NULL REFERENCES restaurants ON DELETE CASCADE,
    slug VARCHAR(48) NOT NULL,
    category_id UUID NOT NULL REFERENCES categories,
    name VARCHAR(32) NOT NULL,
    description VARCHAR(240),
    price NUMERIC(6, 2) NOT NULL,
    currency VARCHAR(3) NOT NULL,
    available BOOLEAN DEFAULT TRUE NOT NULL,
    image VARCHAR(500) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE
    items
ADD
    COLUMN created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP;

ALTER TABLE
    items RENAME COLUMN category TO category_id;

ALTER TABLE
    items
ADD
    restaurantId UUID;

DROP TABLE items;

UPDATE
    items
SET
    restaurantId = '92c6e519-dc99-4778-bc73-f593e9071163';

INSERT INTO
    items (slug, category, name, description, price, image)
VALUES
    (
        'big-beef',
        'aaaaaaaaaaaaaaaaaaaa',
        'Big Beef',
        'Swiss beef, ketchup, caramelized onions, batavia salad',
        12.90,
        'https://www.holycow.ch/wp-content/uploads/2020/12/HolyCoW_BurgerBoeuf_BigBeef_550x440.jpg'
    );

INSERT INTO
    items (
        restaurant,
        slug,
        category,
        name,
        description,
        price,
        currency,
        image
    )
VALUES
    (
        '92c6e519-dc99-4778-bc73-f593e9071163',
        'big-beef',
        '92c6e519-dc99-4778-bc73-f593e9071163',
        'Big Beef',
        '150g pure swiss beef',
        '12.9',
        'CHF',
        'https://waiter.fra1.digitaloceanspaces.com/36c76f38-c190-4fdf-949e-fe1acc3586eb'
    );

INSERT INTO
    items (slug, category, name, description, price, image)
VALUES
    (
        'big-cheese',
        'aaaaaaaaaaaaaaaaaaaa',
        'Big Cheese',
        'Swiss beef, ketchup, caramelized onions, batavia salad',
        12.90,
        'https://www.holycow.ch/wp-content/uploads/2020/12/HolyCoW_BurgerBoeuf_BigCheese_550x440.jpg'
    ) RETURNING *;

CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
    restaurant_id UUID REFERENCES restaurants ON DELETE CASCADE,
    name VARCHAR(32) NOT NULL,
    slug VARCHAR(48) NOT NULL DEFAULT,
    description VARCHAR(240),
    order INTEGER
);

SELECT
    id,
    ROW_NUMBER() OVER (
        PARTITION BY restaurant_id
        ORDER BY
            id ASC
    ) AS order
FROM
    categories
UPDATE
    categories
SET
    "order" = ordered.order
FROM
    (
        SELECT
            id,
            ROW_NUMBER() OVER (
                PARTITION BY restaurant_id
                ORDER BY
                    id ASC
            ) AS order
        FROM
            categories
    ) AS ordered
WHERE
    ordered.id = categories.id;

ALTER TABLE
    categories RENAME COLUMN restaurant TO restaurant_id;

ALTER TABLE
    categories
ADD
    COLUMN slug VARCHAR(48) NOT NULL DEFAULT 'category';

ALTER TABLE
    categories
ADD
    restaurant UUID;

ALTER TABLE
    categories DROP COLUMN slug;

UPDATE
    categories
SET
    slug = REPLACE(LOWER(name), ' ', '-');

ALTER TABLE
    categories
ALTER COLUMN
    slug DROP DEFAULT;

INSERT INTO
    categories (slug, name, description)
VALUES
    (
        'beef-burgers',
        'Beef burgers',
        '160g of 100% Swiss Chicken'
    );

SELECT
    restaurants,
    array_agg(itms) as items
FROM
    restaurants
    JOIN items itms ON restaurants.id = itms.restaurantId
GROUP BY
    restaurants.id;

CREATE TABLE subscriptions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    plan VARCHAR(255),
    amount NUMERIC(6, 2),
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

UPDATE
    restaurants
SET
    name = 'Burger Company';

DELETE FROM
    categories
WHERE
    categories.id = '6e458376-b059-47f9-ac0d-df9bad1005b0';

CREATE TABLE schedules (
    restaurant_id UUID NOT NULL REFERENCES restaurants ON DELETE CASCADE,
    day_of_week INTEGER NOT NULL,
    open TIME NOT NULL,
    close TIME NOT NULL
);

CREATE TABLE favorites (
    user_id UUID NOT NULL REFERENCES users ON DELETE CASCADE,
    restaurant_id UUID NOT NULL REFERENCES restaurants ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE favorites
ALTER TABLE
    favorites
ADD
    COLUMN created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
SELECT
    pg_terminate_backend(pg_stat_activity.pid)
FROM
    pg_stat_activity
WHERE
    datname = current_database()
    AND pid <> pg_backend_pid();

SELECT
    restaurants.name,
    COUNT(*)
FROM
    items
    JOIN restaurants ON restaurants.id = items.restaurant_id
WHERE
    restaurants.city != 'Démos'
GROUP BY
    restaurants.name
SELECT
    AVG(count)
FROM
    (
        SELECT
            restaurants.name,
            COUNT(*)
        FROM
            items
            JOIN restaurants ON restaurants.id = items.restaurant_id
        WHERE
            restaurants.city != 'Démos'
        GROUP BY
            restaurants.name
    ) AS counts
SELECT
    restaurants.name,
    (MAX(items.created_at) - MIN(items.created_at)) as duration
FROM
    items
    JOIN restaurants ON restaurants.id = items.restaurant_id
WHERE
    restaurants.city != 'Démos'
GROUP BY
    restaurants.name CREATE EXTENSION pg_trgm;

SELECT
    *
FROM
    restaurants
WHERE
    '%burg%' % ANY(STRING_TO_ARRAY(name, ' '));

SELECT
    *
FROM
    restaurants
WHERE
    SIMILARITY(name, 'et') > 0.2;

EXPLAIN ANALYSE
SELECT
    *
FROM
    restaurants
WHERE
    SIMILARITY(name, '%etoile%') > 0.1;

SELECT
    SIMILARITY(
        name || ' ' || city || ' ' || cuisine,
        'lausanne'
    ) AS sml,
    *
FROM
    restaurants
WHERE
    SIMILARITY(
        name || ' ' || city || ' ' || cuisine,
        'lausanne'
    ) > 0.3
ORDER BY
    sml DESC;

SELECT
    SIMILARITY(items.name, 'Filet de Merlan') + SIMILARITY(items.description, 'Filet de Merlan') AS sml,
    items.*,
    items.restaurant_id AS "restaurantId",
    restaurants.owner_id AS "ownerId",
    items.category_id AS "categoryId",
    restaurants.slug AS "restaurantSlug",
    categories.slug AS "categorySlug"
FROM
    items
    JOIN restaurants ON restaurants.id = items.restaurant_id
    JOIN categories ON categories.id = items.category_id
WHERE
    (
        LENGTH('Merlan') < 2
        OR SIMILARITY(items.name, 'Filet de Merlan') > 0.2
    )
    OR (
        LENGTH('Merlan') < 2
        OR SIMILARITY(items.description, 'Filet de Merlan') > 0.2
    )
ORDER BY
    sml DESC,
    created_at DESC;

SELECT
    *
FROM
    restaurants
WHERE
    city = 'Lausanne'
SELECT
    *
FROM
    restaurants
WHERE
    name LIKE 'burgers';

EXPLAIN ANALYSE
SELECT
    SIMILARITY(items.name, '') + SIMILARITY(items.description, '') AS sml,
    items.*,
    items.restaurant_id AS "restaurantId",
    restaurants.owner_id AS "ownerId",
    items.category_id AS "categoryId",
    restaurants.slug AS "restaurantSlug",
    categories.slug AS "categorySlug"
FROM
    items
    JOIN restaurants ON restaurants.id = items.restaurant_id
    JOIN categories ON categories.id = items.category_id
WHERE
    LENGTH('') < 2
    OR (
        SIMILARITY(items.name, '') > 0.2
        OR SIMILARITY(items.description, '') > 0.2
    )
ORDER BY
    sml DESC,
    created_at DESC
LIMIT
    10;

EXPLAIN ANALYSE
SELECT
    SIMILARITY(name, '') + SIMILARITY(city, '') + SIMILARITY(cuisine, '') AS sml,
    *
FROM
    restaurants
WHERE
    (
        LENGTH('') < 2
        OR (
            SIMILARITY(name, '') > 0.2
            OR SIMILARITY(city, '') > 0.2
            OR SIMILARITY(cuisine, '') > 0.2
        )
    )
ORDER BY
    sml DESC,
    created_at DESC
LIMIT
    20;

CREATE TABLE feedbacks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
    user_id UUID NOT NULL REFERENCES users,
    emotion VARCHAR(24) NULL,
    message TEXT NOT NULL,
    url VARCHAR(256) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
);

-- TODO
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
    user_id UUID NOT NULL REFERENCES users ON DELETE CASCADE,
    status VARCHAR(32) NOT NULL,
    total NUMERIC(6, 2) NOT NULL,
    remark TEXT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- TODO
CREATE TABLE orders_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
    order_id UUID NOT NULL REFERENCES orders ON DELETE CASCADE,
    item_id UUID NOT NULL REFERENCES items ON DELETE CASCADE,
    price NUMERIC(6, 2) NOT NULL,
    quantity INTEGER NOT NULL
);

-- TODO
CREATE TABLE menus (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
    restaurant_id UUID NOT NULL REFERENCES restaurants ON DELETE CASCADE,
    name VARCHAR(32) NOT NULL,
    start_time VARCHAR(16) NULL,
    end_time VARCHAR(16) NULL,
    visible BOOLEAN DEFAULT TRUE NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- TODO
CREATE TABLE wishlists (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
    user_id UUID NOT NULL REFERENCES users ON DELETE CASCADE,
    name VARCHAR(32) NOT NULL,
    image VARCHAR(512) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE favorites (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
    user_id UUID NOT NULL REFERENCES users ON DELETE CASCADE,
    wishlist_id UUID NOT NULL REFERENCES wishlists ON DELETE CASCADE,
    restaurant_id UUID NOT NULL REFERENCES restaurants ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- TODO
-- CREATE TABLE images (
--     id UUID PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
--     user_id UUID NOT NULL REFERENCES users ON DELETE CASCADE,
--     url VARCHAR(512) NOT NULL,
--     status VARCHAR(16) NOT NULL DEFAULT "visible",
--     created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
-- );
CREATE TABLE restaurant_images (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
    "restaurant_id" UUID NOT NULL REFERENCES restaurants ON DELETE CASCADE,
    "url" VARCHAR(512) NOT NULL,
    "alt" VARCHAR(256) NULL,
    "legend" VARCHAR(256) NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "status" VARCHAR(16) NOT NULL DEFAULT 'visible',
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE restaurant_images;

-- TODO
CREATE TABLE items_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
    item_id UUID NOT NULL REFERENCES items ON DELETE CASCADE,
    image_id UUID NOT NULL REFERENCES images ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- TODO
CREATE TABLE amenities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
    name VARCHAR(64) NOT NULL,
    description TEXT NULL,
    icon VARCHAR(512) NULL,
    status VARCHAR(16) NOT NULL DEFAULT "visible",
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- TODO
CREATE TABLE restaurants_amenities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
    restaurant_id UUID NOT NULL REFERENCES restaurants ON DELETE CASCADE,
    amenity_id UUID NOT NULL REFERENCES amenities ON DELETE CASCADE,
    status VARCHAR(16) NOT NULL DEFAULT "visible",
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- TODO
CREATE TABLE payment_methods (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
    user_id UUID NOT NULL REFERENCES users ON DELETE CASCADE,
    name VARCHAR(64) NOT NULL,
    provider
);

-- TODO
CREATE TABLE payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
    order_id UUID NOT NULL REFERENCES orders ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users ON DELETE CASCADE,
    amount NUMERIC(6, 2) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
);

-- TEST AUDIT TABLE
CREATE TABLE audit (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
    table VARCHAR(64) NOT NULL,
    field VARCHAR(64) NOT NULL,
    record_id UUID NOT NULL,
    value VARCHAR(512),
    user_id UUID NOT NULL REFERENCES users ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- TEST HISTORY TABEL
CREATE TABLE items_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
    -- ADD FIELDS FROM THE ITEMS TABLE
    created_by UUID NOT NULL REFERENCES users ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- TODO
CREATE TABLE subscriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
    user_id UUID NOT NULL REFERENCES users ON DELETE CASCADE,
    name VARCHAR(64) NOT NULL,
    plan VARCHAR(32) NOT NULL,
    price NUMERIC(6, 2) NOT NULL,
    status VARCHAR(32) NOT NULL,
    ends_at TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- TODO
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
    user_id UUID NOT NULL REFERENCES users ON DELETE CASCADE,
    type VARCHAR(32) NOT NULL,
    icon VARCHAR(512) NULL,
    body TEXT NOT NULL,
    status VARCHAR(32) NOT NULL,
    -- SENT / DELIVERED / READ / DELETED
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- TODO
CREATE TABLE roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
    name VARCHAR(64) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- TODO
CREATE TABLE permissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- TODO
CREATE TABLE roles_permissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- TODO
CREATE TABLE promotions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
    name VARCHAR(64) NOT NULL,
    description TEXT NULL,
    usage_limit INTEGER NULL,
    status VARCHAR(32) NOT NULL,
    starts_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    ends_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- TODO
CREATE TABLE coupons (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
    promotion_id UUID NOT NULL REFERENCES promotions ON DELETE CASCADE,
    code VARCHAR(32) NOT NULL,
    used BOOLEAN NOT NULL,
    starts_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    ends_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- TODO: ADD STATUS (ACTIVE / HISTORY / DELETED) TO EVERYTHING