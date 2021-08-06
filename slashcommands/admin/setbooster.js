module.exports = {
	name: 'setbooster',
	description: 'Replies with Options!',
	options: [
		{
			name: 'role',
			type: 'ROLE',
			description: 'The role to set as the booster role',
			required: true,
		},
		{
			name: 'amount',
			type: 'NUMBER',
			description: 'The amount of credits to give for a boost',
			required: true,
		},
		{
			name: 'log',
			type: 'CHANNEL',
			description: 'The channel to send the announcement of a booster',
			required: true,
		},
	],
	async execute(interaction, client) {
		if(!interaction.member.permissions.has('ADMINISTRATOR')) return interaction.reply('You arent an administrator!');

		const boosterrole = interaction.options.getRole('role');

		const amountcredits = interaction.options.getNumber('amount');

		const logschannel = interaction.options.getChannel('log');

		client.guilddb.set(`${interaction.guild.id}_bfc_role`, boosterrole.id);

		client.guilddb.set(`${interaction.guild.id}_bfc_channel`, logschannel.id);

		client.guilddb.set(`${interaction.guild.id}_bfc_amount`, amountcredits);

		await interaction.reply({ content: 'Set the booster info needed!', ephemeral: true });
	},
};
