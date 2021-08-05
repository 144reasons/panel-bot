module.exports = {
	name: 'setlogs',
	description: 'Replies with Options!',
	options: [{
		name: 'logs',
		type: 'CHANNEL',
		description: 'The channel to set as the logs channel',
		required: true,
	}],
	async execute(interaction, client) {
		if(!interaction.member.permissions.has('ADMINISTRATOR')) return interaction.reply('You arent an administrator!');

		const logschannel = interaction.options.getChannel('logs');

		console.log(logschannel);

		client.guilddb.set(`${interaction.guild.id}_logs`, logschannel.id);

		await interaction.reply({ content: 'Set the logs channel!', ephemeral: true });
	},
};
