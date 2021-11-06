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
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    email_verified TIMESTAMP WITH TIME ZONE NULL,
    phone VARCHAR(255) NULL,
    role VARCHAR(255) NOT NULL DEFAULT 'user',
    image VARCHAR(1024) NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);
DELETE FROM users
WHERE email = 'radiojeje@hotmail.com';
DELETE FROM users;
DELETE FROM accounts;
DELETE FROM sessions;
DROP TABLE verification_tokens;
DELETE FROM verification_tokens;
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
INSERT INTO cities (slug, name, latitude, longitude)
VALUES (
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
INSERT INTO regions (code, slug, name, latitude, longitude)
VALUES (
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
INSERT INTO countries (code, slug, name, latitude, longitude)
VALUES (
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
INSERT INTO addresses (
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
VALUES (
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
ALTER TABLE address
    RENAME TO addresses;
CREATE TABLE restaurants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug VARCHAR(255),
    owner_id UUID NOT NULL REFERENCES users,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    cuisine VARCHAR(255) NOT NULL,
    image VARCHAR(500) NOT NULL,
    phone VARCHAR(255),
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
ALTER TABLE restaurants
ALTER COLUMN cuisine DROP DEFAULT;
DROP TABLE restaurants CASCADE;
92c6e519-dc99-4778-bc73-f593e9071163
ALTER TABLE restaurants ALTER owner_id DROP DEFAULT;
ALTER TABLE restaurants
ADD address UUID;
UPDATE restaurants
SET address = '2f124fe1-90a0-4ee3-9f91-1477b8ef4b88';
INSERT INTO restaurants (slug, name, intro, description, image)
VALUES (
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
    category UUID NOT NULL,
    name VARCHAR(32) NOT NULL,
    description VARCHAR(240),
    price NUMERIC(6, 2) NOT NULL,
    currency VARCHAR(3) NOT NULL,
    available BOOLEAN DEFAULT TRUE NOT NULL,
    image VARCHAR(500) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);
ALTER TABLE items
ADD COLUMN created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE items
    RENAME COLUMN restaurant TO restaurant_id;
ALTER TABLE items
ADD restaurantId UUID;
DROP TABLE items;
UPDATE items
SET restaurantId = '92c6e519-dc99-4778-bc73-f593e9071163';
INSERT INTO items (slug, category, name, description, price, image)
VALUES (
        'big-beef',
        'aaaaaaaaaaaaaaaaaaaa',
        'Big Beef',
        'Swiss beef, ketchup, caramelized onions, batavia salad',
        12.90,
        'https://www.holycow.ch/wp-content/uploads/2020/12/HolyCoW_BurgerBoeuf_BigBeef_550x440.jpg'
    );
INSERT INTO items (
        restaurant,
        slug,
        category,
        name,
        description,
        price,
        currency,
        image
    )
VALUES (
        '92c6e519-dc99-4778-bc73-f593e9071163',
        'big-beef',
        '92c6e519-dc99-4778-bc73-f593e9071163',
        'Big Beef',
        '150g pure swiss beef',
        '12.9',
        'CHF',
        'https://waiter.fra1.digitaloceanspaces.com/36c76f38-c190-4fdf-949e-fe1acc3586eb'
    );
INSERT INTO items (slug, category, name, description, price, image)
VALUES (
        'big-cheese',
        'aaaaaaaaaaaaaaaaaaaa',
        'Big Cheese',
        'Swiss beef, ketchup, caramelized onions, batavia salad',
        12.90,
        'https://www.holycow.ch/wp-content/uploads/2020/12/HolyCoW_BurgerBoeuf_BigCheese_550x440.jpg'
    )
RETURNING *;
CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
    restaurant_id UUID REFERENCES restaurants ON DELETE CASCADE,
    name VARCHAR(32) NOT NULL,
    description VARCHAR(240)
);
ALTER TABLE categories
ADD restaurant UUID;
ALTER TABLE categories DROP COLUMN slug;
UPDATE categories
SET restaurant = '92c6e519-dc99-4778-bc73-f593e9071163';
INSERT INTO categories (slug, name, description)
VALUES (
        'beef-burgers',
        'Beef burgers',
        '160g of 100% Swiss Chicken'
    );
SELECT restaurants,
    array_agg(itms) as items
FROM restaurants
    JOIN items itms ON restaurants.id = itms.restaurantId
GROUP BY restaurants.id;
CREATE TABLE subscriptions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    plan VARCHAR(255),
    amount NUMERIC(6, 2),
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);
UPDATE restaurants
SET name = 'Burger Company';
DELETE FROM categories
WHERE categories.id = '6e458376-b059-47f9-ac0d-df9bad1005b0';
CREATE TABLE schedules (
    restaurant_id UUID NOT NULL REFERENCES restaurants ON DELETE CASCADE,
    day_of_week INTEGER NOT NULL,
    open TIME NOT NULL,
    close TIME NOT NULL
) CREATE TABLE favorites (
    user_id UUID NOT NULL REFERENCES users ON DELETE CASCADE,
    restaurant_id UUID NOT NULL REFERENCES restaurants ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);
DROP TABLE favorites
ALTER TABLE favorites
ADD COLUMN create_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP