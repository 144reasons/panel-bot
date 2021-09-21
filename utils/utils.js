function chance(percentage) {
	return Math.random() * 100 < percentage;
}

function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomIntNF(min, max) {
	return Math.random() * (max - min + 1) + min;
}

function roundNumber(num, scale) {
	if (Math.round(num) != num) {
		if (Math.pow(0.1, scale) > num) {
			return 0;
		}
		const sign = Math.sign(num);
		const arr = ('' + Math.abs(num)).split('.');
		if (arr.length > 1) {
			if (arr[1].length > scale) {
				const integ = +arr[0] * Math.pow(10, scale);
				let dec = integ + (+arr[1].slice(0, scale) + Math.pow(10, scale));
				const proc = +arr[1].slice(scale, scale + 1);
				if (proc >= 5) {
					dec = dec + 1;
				}
				dec = sign * (dec - Math.pow(10, scale)) / Math.pow(10, scale);
				return dec;
			}
		}
	}
	return num;
}

module.exports = {
	chance,
	getRandomInt,
	getRandomIntNF,
	roundNumber,
};