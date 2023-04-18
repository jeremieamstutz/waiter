function standardize(string) {
	return string
		.toString()
		.toLowerCase()
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
}

export function filter(string, query) {
	return standardize(string).indexOf(standardize(query)) > -1
}
