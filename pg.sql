CREATE TABLE accounts (
    id SERIAL PRIMARY KEY,
    compoundId VARCHAR(255) NOT NULL,
    userId INTEGER NOT NULL,
    providerType VARCHAR(255) NOT NULL,
    providerId VARCHAR(255) NOT NULL,
    providerAccountId VARCHAR(255) NOT NULL,
    refreshToken TEXT,
    accessToken TEXT,
    accessTokenExpires TIMESTAMPTZ,
    createdAt TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE sessions (
    id SERIAL PRIMARY KEY,
    userId INTEGER NOT NULL,
    expires TIMESTAMPTZ NOT NULL,
    sessionToken VARCHAR(255) NOT NULL,
    accessToken VARCHAR(255) NOT NULL,
    createdAt TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255),
    emailVerified TIMESTAMPTZ,
    image TEXT,
    createdAt TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE verificationRequests (
    id SERIAL PRIMARY KEY,
    identifier VARCHAR(255) NOT NULL,
    token VARCHAR(255) NOT NULL,
    expires TIMESTAMPTZ NOT NULL,
    createdAt TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE cities (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    slug VARCHAR(48),
    name VARCHAR(32),
    description TEXT,
    latitude REAL,
    longitude REAL
);
INSERT INTO cities (slug, name, description, latitude, longitude)
VALUES (
        'lausanne',
        'Lausanne',
        'Nice city next to the lake',
        40,
        8
    );
CREATE TABLE address (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    address VARCHAR(64),
    city UUID,
    postalCode INT
);
INSERT INTO address (address, city, postalcode) VALUES ('Avenue des Figuiers 13', '72705907-664b-40fb-9289-63f65cc05ea1', 1007);
ALTER TABLE address RENAME TO addresses;
CREATE TABLE restaurants (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    owner UUID,
    address UUID,
    slug VARCHAR(48),
    name VARCHAR(32),
    intro VARCHAR(140),
    description TEXT,
    image VARCHAR(500)
);
ALTER TABLE restaurants ADD address UUID;
UPDATE restaurants SET address = '2167b4b7-3eb1-4e5c-86bc-0e4146d851e6';
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
    restaurant UUID NOT NULL,
    slug VARCHAR(48) NOT NULL,
    category UUID NOT NULL,
    name VARCHAR(32) NOT NULL,
    description VARCHAR(240),
    price NUMERIC(6, 2) NOT NULL,
    currency VARCHAR(3) NOT NULL,
    available BOOLEAN DEFAULT TRUE NOT NULL,
    image VARCHAR(500) NOT NULL
);
ALTER TABLE items
ADD restaurantId UUID;
DROP TABLE items;
UPDATE items SET restaurantId = '92c6e519-dc99-4778-bc73-f593e9071163';
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
    restaurant UUID,
    slug VARCHAR(48) NOT NULL,
    name VARCHAR(32) NOT NULL,
    description VARCHAR(240)
);
ALTER TABLE categories ADD restaurant UUID;
UPDATE categories SET restaurant = '92c6e519-dc99-4778-bc73-f593e9071163';
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
    createdAt TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE uploadedImages (
    url VARCHAR(500) PRIMARY KEY UNIQUE,
    createdAt TIMESTAMPTZ NOT NULL DEFAULT NOW()
)

UPDATE restaurants SET name = 'Burger Company';