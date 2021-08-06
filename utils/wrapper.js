const axios = require('axios');

options = {
	method: 'GET',
	url: null,
	headers: {
		'authorization': 'Bearer ',
		'Content-Type': 'application/json',
		'Accept': 'application/json',
	},
};

const checkUrl = (url) => {
	return new Promise((resolve) => {
		/* eslint no-useless-escape: "off" */

		const res = String(url).match(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)[/]/gi);
		resolve(res !== null);
	});
};

const checkKey = (key) => {
	return new Promise((resolve) => {
		if(key.length === 48) resolve(true);
		else resolve(false);
	});
};

const getUsers = async (url, key) => {
	return new Promise((resolve, reject) => {
		if(!checkUrl(url)) reject('Not a valid URI');
		if(!checkKey(key)) reject('Not a valid Key');

		options = {
			method: 'GET',
			headers: {
				'authorization': `Bearer ${key}`,
				'Content-Type': 'application/json',
				'Accept': 'application/json',
			},
		};

		options['url'] = `${url}api/users/`;
		axios(options).then(res => {
			resolve(res);
		}).catch(err => {
			reject(err);
		});
	});
};

const getUserData = async (url, key, id) => {
	return new Promise((resolve, reject) => {
		if(!checkUrl(url)) reject('Not a valid URI');
		if(!checkKey(key)) reject('Not a valid Key');

		options = {
			method: 'GET',
			headers: {
				'authorization': `Bearer ${key}`,
				'Content-Type': 'application/json',
				'Accept': 'application/json',
			},
		};

		options['url'] = `${url}api/users/` + id;
		axios(options).then(res => {
			resolve(res);
		}).catch(err => {
			reject(err);
		});
	});
};

const addUserCredits = async (url, key, id, credits) => {
	return new Promise((resolve, reject) => {
		if(!checkUrl(url)) reject('Not a valid URI');
		if(!checkKey(key)) reject('Not a valid Key');

		getUserData(url, key, id).then(res => {
			options = {
				method: 'PATCH',
				headers: {
					'authorization': `Bearer ${key}`,
					'Content-Type': 'application/json',
					'Accept': 'application/json',
				},
			};

			options['method'] = 'PATCH';
			if (!credits) return console.log('You need to define a number to add to the existing balance!');
			if (isNaN(credits)) return console.log('That is not a number!');
			options['data'] = { 'credits': +res.data.credits + +credits };
			options['url'] = `${url}api/users/` + id;
			axios(options).then(res => {
				resolve(res);
			}).catch(err => {
				reject(err);
			});
		});
	});
};

const removeUserCredits = async (url, key, id, credits) => {
	return new Promise((resolve, reject) => {
		if(!checkUrl(url)) reject('Not a valid URI');
		if(!checkKey(key)) reject('Not a valid Key');

		getUserData(url, key, id).then(res => {
			options = {
				method: 'PATCH',
				headers: {
					'authorization': `Bearer ${key}`,
					'Content-Type': 'application/json',
					'Accept': 'application/json',
				},
			};

			options['method'] = 'PATCH';
			if (!credits) return console.log('You need to define a number to remove from the existing balance!');
			if (isNaN(credits)) return console.log('That is not a number!');
			options['data'] = { 'credits': +res.data.credits - +credits };
			options['url'] = `${url}api/users/` + id;
			axios(options).then(res => {
				resolve(res);
			}).catch(err => {
				reject(err);
			});
		});
	});
};

const clearUserCredits = async (url, key, id) => {
	return new Promise((resolve, reject) => {
		if(!checkUrl(url)) reject('Not a valid URI');
		if(!checkKey(key)) reject('Not a valid Key');

		getUserData(url, key, id).then(res => {
			options = {
				method: 'PATCH',
				headers: {
					'authorization': `Bearer ${key}`,
					'Content-Type': 'application/json',
					'Accept': 'application/json',
				},
			};

			options['method'] = 'PATCH';
			options['data'] = { 'credits': 0 };
			options['url'] = `${url}api/users/` + id;
			axios(options).then(res => {
				resolve(res);
			}).catch(err => {
				reject(err);
			});
		});
	});
};

module.exports = {
	checkUrl,
	checkKey,
	getUsers,
	getUserData,
	addUserCredits,
	removeUserCredits,
	clearUserCredits,
};