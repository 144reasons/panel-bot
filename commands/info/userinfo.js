const { getUserData, setOptions } = require('controlpanel-api');
const { MessageEmbed } = require('discord.js');
const { botColour } = require('../../config.json');

module.exports = {
	name: 'userinfo',
	description: 'Check user info',
	ownersOnly: false,
	category: 'Info',
	hidden: false,
	async execute(message, client, args, db) {

		setOptions(await db.get(`${message.guild.id}_url`), await db.get(`${message.guild.id}_apiKey`));

		let accountid;
		let accountname;
		let accountrole;
		let accountbalance;
		let verifiedtof;


		if(await db.get(`${message.guild.id}_accountid`) == 'true') accountid = true;
		if(await db.get(`${message.guild.id}_accountname`) == 'true') accountname = true;
		if(await db.get(`${message.guild.id}_accountrole`) == 'true') accountrole = true;
		if(await db.get(`${message.guild.id}_accountbalance`) == 'true') accountbalance = true;
		if(await db.get(`${message.guild.id}_verifiedtof`) == 'true') verifiedtof = true;

		getUserData(message.author.id).then(res => {

			let verified;

			if(res.data.discord_verified_at == null) verified = false;
			else verified = true;

			const embed = new MessageEmbed()
				.setTitle('Your User Info')
				.setColor(botColour);


			if(accountid === true) embed.addField('Account ID', res.data.id, true);
			if(accountname === true) embed.addField('Account Name', res.data.name, true);
			if(accountrole === true) embed.addField('Account Role', res.data.role, true);
			if(accountbalance === true) embed.addField('Account Balance', res.data.credits, true);
			if(verifiedtof === true) embed.addField('Verified on Discord', verified, true);


			message.channel.send(embed);
		}).catch(err => {
			message.channel.send('Could not find you in the db!');
		});

	},
};