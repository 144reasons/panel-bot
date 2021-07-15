const { cpApi, panelUrl, userInfo } = require('../../config.json');
const { MessageEmbed, Message } = require('discord.js');
const { getUserData, setOptions } = require('controlpanel-api');
setOptions(panelUrl, cpApi);

module.exports.run = async (client, message, args) => {
	getUserData(7358).then(res => {

		const embed = new MessageEmbed()
			.setTitle('Your User Info');


		if(userInfo.accountID) embed.addField('Account ID', res.data.id, true);
		if(userInfo.accountName) embed.addField('Account Name', res.data.name, true);
		if(userInfo.accountRole) embed.addField('Account Role', res.data.role, true);
		if(userInfo.accountBalance) embed.addField('Account Balance', res.data.credits, true);
		if(userInfo.accountDiscordVerified) embed.addField('Verified on Discord', res.data.discord_verified_at, true);


		message.channel.send(embed);
	}).catch(err => {
		console.log(err);
	});
};

module.exports.help = {
	name: 'userinfo',
	category: 'General',
	description: 'See your user info',
	usage: 'userinfo',
};