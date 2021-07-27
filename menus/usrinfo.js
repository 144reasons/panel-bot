const { MessageActionRow, MessageSelectMenu } = require('discord.js');

module.exports.run = async (interaction, client) => {
	const checkEach = async (item) => {
		if(await client.guilddb.get(`${interaction.guild.id}_${item}`) === 'true') await client.guilddb.set(`${interaction.guild.id}_${item}`, 'false');
		else await client.guilddb.set(`${interaction.guild.id}_${item}`, 'true');
	};

	interaction.values.forEach(checkEach);
	await interaction.update({ content: 'Successfully edited the user info command settings!', components: [] });
};