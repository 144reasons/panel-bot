const { addUserCredits } = require('../utils/wrapper.js');

module.exports = {
	name: 'guildMemberUpdate',
	async execute(oldMember, newMember, client) {
		if(await client.guilddb.get(`${oldMember.guild.id}_bfc`)) {

			const boosterrole = await client.guilddb.get(`${oldMember.guild.id}_bfc_role`);

			if(!boosterrole) {
				const channel = client.channels.cache.get(await client.guilddb.get(`${oldMember.guild.id}_logs`));

				channel.send('You havent linked a booster role! Link one so users can receive credits!');
			}

			if(newMember.roles.cache.has(boosterrole) && !oldMember.roles.cache.has(boosterrole)) {
				const channel = client.channels.cache.get(await client.guilddb.get(`${oldMember.guild.id}_bfc_channel`));

				addUserCredits(await client.guilddb.get(`${oldMember.guild.id}_control_url`), await client.guilddb.get(`${oldMember.guild.id}_control_api`), newMember.id, await client.guilddb.get(`${oldMember.guild.id}_bfc_amount`)).catch(err => {
					console.log(err);

					if(err.code === 'ECONNREFUSED') return channel.send('ECONNREFUSED! Is the server down?');
				});

				channel.send(`New booster! **${newMember.user.username}** just boosted, and received ${await client.guilddb.get(`${oldMember.guild.id}_bfc_amount`)} credits!`);
			}
		}
	},
};