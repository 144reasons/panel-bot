const { MessageMenu, MessageMenuOption } = require('discord-buttons');
const { MessageEmbed } = require('discord.js');
const { addUserCredits } = require('controlpanel-api');

module.exports = {
	name: 'givecredits',
	description: 'givecredots',
	category: 'Admin',
	async execute(message, client, args, db) {
		if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('You arent an administrator!');

		if(!args[0]) return message.channel.send('You need to define the number of credits you want to give!');

		if(isNaN(args[0])) return message.channel.send('You need to define a valid number that is below 99999999');

		if(args[0] > 99999999) return message.channel.send('You need to choose a number below 99999999');

		if(!message.mentions.users.size) return message.channel.send('You need to mention someone to give credits!');

		const taggedUser = message.mentions.users.first();

		addUserCredits(taggedUser.id).catch(err => message.channel.send('Couldnt give user credits'));
	},
};