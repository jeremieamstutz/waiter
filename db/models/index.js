import User from './user'
import Account from './account'
import Session from './session'
import VerificationToken from './verification-token'
import PaymentMethod from './payment-method'

import Restaurant from './restaurant'
import Address from './address'
import Schedule from './schedule'
import Cuisine from './cuisine'
import RestaurantCuisine from './restaurant-cuisine'
import RestaurantImage from './restaurant-image'
import Table from './table'

import Menu from './menu'
import Category from './category'
import Item from './item'
import ItemModifier from './item-modifier'
import Modifier from './modifier'
import Option from './option'

import Cart from './cart'
import CartItem from './cart-item'

import Order from './order'
import OrderItem from './order-item'

import Booking from './booking'

import Feedback from './feedback'
import Flag from './flag'
import Favorite from './favorite'

User.hasMany(Account)
User.hasMany(Session)
User.hasMany(Cart)
User.hasMany(Order)
User.hasMany(Booking)
User.hasMany(Feedback)
User.hasMany(PaymentMethod)
User.hasMany(Favorite)

Account.belongsTo(User)

Session.belongsTo(User)

PaymentMethod.belongsTo(User)

Restaurant.hasOne(Address)
Restaurant.belongsToMany(Cuisine, { through: RestaurantCuisine })
Restaurant.belongsTo(User, { as: 'owner' })
Restaurant.hasMany(Menu)
Restaurant.hasMany(Category)
Restaurant.hasMany(RestaurantImage, { as: 'images' })
Restaurant.hasMany(Item)
Restaurant.hasMany(Schedule)
Restaurant.hasMany(Table)
Restaurant.hasMany(Booking)
Restaurant.hasMany(Favorite)

Address.belongsTo(Restaurant)
Schedule.belongsTo(Restaurant)
RestaurantImage.belongsTo(Restaurant)
Cuisine.belongsToMany(Restaurant, { through: RestaurantCuisine })
Table.belongsTo(Restaurant)
Table.hasMany(Booking)

Menu.belongsTo(Restaurant)
Menu.hasMany(Category)

Category.belongsTo(Menu)
Category.belongsTo(Restaurant)
Category.hasMany(Item)

Item.belongsTo(Restaurant)
Item.belongsTo(Category)
Item.belongsToMany(Cart, { through: CartItem })
Item.belongsToMany(Order, { through: OrderItem })
Item.belongsToMany(Modifier, { through: ItemModifier })

Modifier.belongsTo(Restaurant)
Modifier.belongsToMany(Item, { through: ItemModifier })
Modifier.hasMany(Option)

Option.belongsTo(Modifier)

Cart.belongsTo(User)
Cart.belongsToMany(Item, { through: CartItem })

Order.belongsTo(User)
Order.belongsToMany(Item, { through: OrderItem })

Booking.belongsTo(User)
Booking.belongsTo(Restaurant)
Booking.belongsTo(Table)

Feedback.belongsTo(User)
Favorite.belongsTo(User)
Favorite.belongsTo(Restaurant)

export {
	User,
	Account,
	Session,
	VerificationToken,
	PaymentMethod,
	Restaurant,
	RestaurantImage,
	Menu,
	Category,
	Item,
	Cart,
	Order,
	Flag,
	Favorite,
}
