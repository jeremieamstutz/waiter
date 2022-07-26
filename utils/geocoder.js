export function parseAddress(address) {
	let street = ''
	let streetNumber = ''
	let postalCode = ''
	let city = ''
	let state = ''
	let country = ''

	address.address_components.forEach((component) => {
		const type = component.types[0]
		const name = component.long_name

		if (type === 'route') {
			street = name
		}

		if (type === 'street_number') {
			streetNumber = name
		}

		if (type === 'postal_code') {
			postalCode = name
		}

		if (type === 'locality') {
			city = name
		}

		if (type === 'administrative_area_level_1') {
			state = name
		}

		if (type === 'country') {
			country = name
		}
	})

	return {
		street,
		streetNumber,
		postalCode,
		city,
		state,
		country,
	}
}
