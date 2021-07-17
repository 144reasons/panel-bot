module.exports = {
	name: 'clickMenu',
	async execute(menu, client, db) {
		await client.buttons.get(`${menu.id}.js`).run(menu, client, db);
	},
};