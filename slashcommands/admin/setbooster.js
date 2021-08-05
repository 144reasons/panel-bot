module.exports = {
	name: 'setbooster',
	description: 'Replies with Options!',
	options: [{
		name: 'role',
		type: 'ROLE',
		description: 'The role to set as the booster role',
		required: true,
	}],
	async execute(interaction, client) {
		if(!interaction.member.permissions.has('ADMINISTRATOR')) return interaction.reply('You arent an administrator!');

		const boosterrole = interaction.options.getRole('role');

		client.guilddb.set(`${interaction.guild.id}_booster`, boosterrole.id);

		await interaction.reply({ content: 'Set the booster role!', ephemeral: true });
	},
};
