module.exports = {
	name: 'ping',
	description: 'Replies with Pong!',
	async execute(interaction, client) {
		await interaction.reply(`Pong! The bots websocket ping is ${client.ws.ping}ms!`);
	},
};
