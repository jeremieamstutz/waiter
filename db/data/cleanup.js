let items = require('./items.json')
const fs = require('fs')

items = items.map((item) => {
	delete item.slug
	return item
})

fs.writeFile('items.json', JSON.stringify(items), (err) => {
	if (err) throw err
})
