const { MessageActionRow, MessageSelectMenu } = require('discord.js');
const { testguild } = require('../../config.json');

module.exports = {
	name: 'tdeploy',
	description: 'Deploy all slash commands in a certain guild',
	ownersOnly: true,
	category: 'Owner',
	async execute(message, client) {
		const scommands = client.slashcommands;

		let toDep = [];

		function autoDeploy(value, key) {

			const pushme = { name: value.name, description: value.description };

			toDep = toDep.concat(pushme);
		}

		scommands.forEach(autoDeploy);

		console.log(toDep);

		const commands = await client.guilds.cache.get(testguild)?.commands.set(toDep);
		console.log(commands);
	},
};