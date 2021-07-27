const { MessageActionRow, MessageSelectMenu } = require('discord.js');

module.exports = {
	name: 'deploy',
	description: 'Deploy all slash commands',
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

		const commands = await client.application?.commands.set(toDep);
		console.log(commands);
	},
};