class Geohash {
	static encode({ lat, lon, precision }) {
		if (typeof precision == 'undefined') {
			for (let p = 1; p < 12; p++) {
				const geohash = Geohash.encode({
					lat: lat,
					lon: lon,
					precision: p,
				})
				const coords = Geohash.decode(geohash)

				if (coords.lat === lat && coords.lon === lon) {
					return geohash
				}
			}
			precision = 12
		}

		lat = +lat
		lon = +lon
		precision = +precision

		if (isNaN(lat) || isNaN(lon) || isNaN(precision)) {
			throw new Error('Invalid inputs')
		}

		let direction = 'E-W'
		let hash = ''
		let geohash = ''

		let latMin = -90,
			latMax = 90
		let lonMin = -180,
			lonMax = 180

		/*
		 *  -------------
		 *  |     |     |
		 *  | 0,1 | 1,1 |
		 *  -------------
		 *  |     |     |
		 *  | 0,0 | 1,0 |
		 *  -------------
		 */

		while (geohash.length < precision) {
			switch (direction) {
				case 'E-W':
					const lonMid = (lonMin + lonMax) / 2
					if (lon >= lonMid) {
						hash += 1
						lonMin = lonMid
					} else {
						hash += 0
						lonMax = lonMid
					}
					direction = 'N-S'
					break
				case 'N-S':
					const latMid = (latMin + latMax) / 2
					if (lat >= latMid) {
						hash += 1
						latMin = latMid
					} else {
						hash += 0
						latMax = latMid
					}
					direction = 'E-W'
					break
			}

			if (hash.length % 5 === 0) {
				geohash = parseInt(hash, 2).toString(32)
			}
		}
		// console.log(hash)
		return geohash
	}

	static decode(geohash) {
		const bounds = Geohash.bounds(geohash)

		const { latMin, latMax, lonMin, lonMax } = bounds

		let lat = (latMin + latMax) / 2
		let lon = (lonMin + lonMax) / 2

		lat = lat.toFixed(Math.floor(2 - Math.log(latMax - latMin) / Math.LN10))
		lon = lon.toFixed(Math.floor(2 - Math.log(lonMax - lonMin) / Math.LN10))

		lat = +lat
		lon = +lon

		return { lat, lon }
	}

	static bounds(geohash) {
		if (geohash.length == 0) {
			throw new Error('Invalid geohash')
		}
		let direction = 'E-W'
		let hash = parseInt(geohash, 32).toString(2)

		let latMin = -90,
			latMax = 90
		let lonMin = -180,
			lonMax = 180

		for (let i = 0; i < hash.length; i++) {
			switch (direction) {
				case 'E-W':
					const lonMid = (lonMin + lonMax) / 2
					if (hash[i] >= 1) {
						lonMin = lonMid
					} else {
						lonMax = lonMid
					}
					direction = 'N-S'
					break
				case 'N-S':
					const latMid = (latMin + latMax) / 2
					if (hash[i] >= 1) {
						latMin = latMid
					} else {
						latMax = latMid
					}
					direction = 'E-W'
					break
			}
		}
		const bounds = {
			latMin,
			latMax,
			lonMin,
			lonMax,
		}

		return bounds
	}

	static neighbors(geohash) {
		const bounds = Geohash.bounds(geohash)

		const { latMin, latMax, lonMin, lonMax } = bounds

		const latMid = (latMin + latMax) / 2
		const lonMid = (lonMin + lonMax) / 2

		const width = lonMax - lonMin
		const height = latMax - latMin

		let neighbors = []

		for (let i = 0; i <= 2; i++) {
			neighbors[i] = []
			for (let j = 0; j <= 2; j++) {
				const lat = latMid + (i - 1) * height
				const lon = lonMid + (j - 1) * width
				const hash = Geohash.encode({
					lat,
					lon,
					precision: geohash.length,
				})
				neighbors[i][j] = hash
			}
		}

		return {
			n: neighbors[0][1],
			ne: neighbors[0][2],
			e: neighbors[1][2],
			se: neighbors[2][2],
			s: neighbors[2][1],
			sw: neighbors[2][0],
			w: neighbors[1][0],
			nw: neighbors[0][0],
		}
	}

	static precision(angle) {
		const radius = 6378100
		const arc = (angle / 180) * Math.PI * radius
		return arc
	}
}

const geohash = Geohash.encode({ lat: 52.205, lon: 0.1188, precision: 9 })
const coords = Geohash.decode(geohash)
const neighbors = Geohash.neighbors(geohash)

console.log(geohash)
console.log(neighbors)
