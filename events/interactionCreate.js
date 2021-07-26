module.exports = {
	name: 'interactionCreate',
	once: true,
	async execute(interaction, client) {

		console.log(interaction);

		if (!interaction.isCommand()) return;

		if (!client.commands.has(interaction.commandName)) return;

		try {
			await client.commands.get(interaction.commandName).execute(interaction, client);
		}
		catch (error) {
			console.error(error);
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	},
};