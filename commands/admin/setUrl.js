const { MessageMenu, MessageMenuOption } = require('discord-buttons');
const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'seturl',
	description: 'seturl',
	ownersOnly: false,
	category: 'Admin',
	hidden: false,
	async execute(message, client, args, db) {
		if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('You arent an administrator!');

		if(!args[0]) return message.channel.send('You need to define a url!');

		await db.set(`${message.guild.id}_url`, args[0]);

		message.channel.send('Set your panels URL!');
	},
};