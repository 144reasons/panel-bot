module.exports = {
	name: 'ping',
	description: 'Options',
	async execute(message, client) {
		await message.channel.send(`Pong! The bots websocket ping is ${client.ws.ping}ms!`);
	},
};