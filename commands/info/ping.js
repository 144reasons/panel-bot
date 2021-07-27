const { MessageActionRow, MessageSelectMenu } = require('discord.js');

module.exports = {
	name: 'ping',
	description: 'Options',
	ownersOnly: false,
	category: 'Info',
	async execute(message, client) {
		await message.channel.send(`Pong! The bots websocket ping is ${client.ws.ping}ms!`);
	},
};