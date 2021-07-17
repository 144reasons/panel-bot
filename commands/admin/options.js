const { MessageMenu, MessageMenuOption } = require('discord-buttons');
const { MessageEmbed } = require('discord.js');
const message = require('../../events/message');
const userinfo = require('../info/userinfo');

module.exports = {
	name: 'options',
	description: 'Options',
	ownersOnly: false,
	category: 'Admin',
	hidden: false,
	async execute(message, client, args, db) {

		if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('You arent an administrator!');

		if(!args[0]) return message.channel.send('You need to select a command/section to edit!');

		const userinfo = [ 'accountid', 'accountname', 'accountrole', 'accountbalance,', 'verifiedtof' ];

		let options = [];

		const createOptions = async (item) => {
			const pushme = { value: item, description: `Enabled: ${await db.get(`${message.guild.id}_${item}`)}` };

			options = options.concat(pushme);
		};

		if(args[0] == 'userinfo') for (let i = 0; i < userinfo.length; i++) await createOptions(userinfo[i]);

		const Selection = new MessageMenu()
			.setID('optionsmenu')
			.setMaxValues(options.length)
			.setMinValues(0)
			.setPlaceholder('Click me to set your options!');


		options.forEach(option => {
			const row = new MessageMenuOption()
				.setLabel(option.label ? option.label : option.value)
				.setValue(option.value)
				.setDescription(option.description)
				.setDefault();
			if(option.emoji) row.setEmoji(option.emoji);
			Selection.addOption(row);
		});

		const MenuEmbed = new MessageEmbed()
			.setColor('PURPLE')
			.setAuthor('Settings', client.user.displayAvatarURL())
			.setDescription('***Select what you need in the `Options Menu` down Below!***');

		message.channel.send(MenuEmbed, Selection);


	},
};