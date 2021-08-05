const { getUserData, setOptions } = require('controlpanel-api');
const { MessageEmbed } = require('discord.js');
const { botColour } = require('../../config.json');

module.exports = {
	name: 'userinfo',
	description: 'Check user info',
	async execute(message, client) {

		setOptions(await client.guilddb.get(`${message.guild.id}_control_url`), await client.guilddb.get(`${message.guild.id}_control_api`));

		let accountid;
		let accountname;
		let accountrole;
		let accountbalance;

		if(await client.guilddb.get(`${message.guild.id}_accountid`) == 'true') accountid = true;
		if(await client.guilddb.get(`${message.guild.id}_accountname`) == 'true') accountname = true;
		if(await client.guilddb.get(`${message.guild.id}_accountrole`) == 'true') accountrole = true;
		if(await client.guilddb.get(`${message.guild.id}_accountbalance`) == 'true') accountbalance = true;

		getUserData(message.author.id).then(res => {

			const embed = new MessageEmbed()
				.setTitle('Your User Info')
				.setColor(botColour);

			if(accountid === true) embed.addField('Account ID', `${res.data.id}`, true);
			if(accountname === true) embed.addField('Account Name', `${res.data.name}`, true);
			if(accountrole === true) embed.addField('Account Role', `${res.data.role}`, true);
			if(accountbalance === true) embed.addField('Account Balance', `${res.data.credits}`, true);

			message.channel.send({ embeds: [embed] });
		}).catch(err => {

			console.log(err);
			if(err.code === 'ECONNREFUSED') return message.channel.send('ECONNREFUSED! Is the server down?');

			if(err.response.data.message.startsWith('No query results')) return message.channel.send('404! Could not find you in the database!');

			if(err.response.status === 500) return message.channel.send('500! There was an internal server error!');

			message.channel.send(`${err.response.status}! We have no info about this error. Please report this bug to your server admin!`);

		});

	},
};