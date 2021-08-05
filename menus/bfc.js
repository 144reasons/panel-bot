module.exports.run = async (interaction, client) => {
	const checkEach = async (item) => {
		if(await client.guilddb.get(`${interaction.guild.id}_${item}`) === 'true') await client.guilddb.set(`${interaction.guild.id}_${item}`, 'false');
		else await client.guilddb.set(`${interaction.guild.id}_${item}`, 'true');
	};

	if(await client.guilddb.get(`${interaction.guild.id}_bfc`) === 'true') await client.guilddb.set(`${interaction.guild.id}_bfc`, 'false');
	else await client.guilddb.set(`${interaction.guild.id}_bfc`, 'true');
	await interaction.update({ content: 'Successfully edited the user info command settings!', components: [] });
};