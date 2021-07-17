const { MessageMenu, MessageMenuOption } = require('discord-buttons');
const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'setapi',
	description: 'setapi',
	ownersOnly: false,
	category: 'Admin',
	hidden: false,
	async execute(message, client, args, db) {
		if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('You arent an administrator!');

		if(!args[0]) return message.channel.send('You need to define an api key!');

		await db.set(`${message.guild.id}_apiKey`, args[0]);

		message.channel.send('Set your new api token! Make sure to not share the token');
	},
};