module.exports = {
	name: 'guildMemberUpdate',
	async execute(oldMember, newMember, client) {
		const boosterrole = await client.guilddb.get(`${oldMember.guild.id}_booster`);

		if(!boosterrole) return console.log('e');

		if(newMember.roles.cache.has(boosterrole) && !oldMember.roles.cache.has(boosterrole)) return console.log('New booster!');

		// Ignore this file for now, its part of issue #3
	},
};