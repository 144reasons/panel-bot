const nodemailer = require('nodemailer');

module.exports = {
	name: 'guildMemberRemove',
	once: false,
	async execute(member, client, db) {

		if(db.get(`${member.guild.id}_deleteafterleave`) === 'true') {

			let logs;

			logs = await db.get(`${member.guild.id}_memberlogs`);

			if(!logs) logs = member.guild.channels.cache.find(ch => ch.name === 'member-log');

			if (!logs) return member.guild.owner.send('You havent set up a member log! Either use the command TODO or create a channel called `member-log`');
			logs.send(`${member} has left the server!`);

			member.send(`Hello! We are messaging you because we noticed that you recently left the server ${member.guild.name}. You have ${await db.get(`${member.guild.id}_daysbeforedelete`)} days before your account on the host gets deleted. This includes your credits and servers. If you want to stop the deletion of your account, join back into the discord. Thank you!`);
		}
	},
};