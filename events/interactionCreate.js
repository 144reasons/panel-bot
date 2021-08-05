module.exports = {
	name: 'interactionCreate',
	async execute(interaction, client) {

		if (interaction.isCommand()) {
			if (!client.slashcommands.has(interaction.commandName)) return;

			try {
				await client.slashcommands.get(interaction.commandName).execute(interaction, client);
			}
			catch (error) {
				console.error(error);
				await interaction.reply({ content: 'There was an error while executing this command! If this happens often, contact the developer!', ephemeral: true });
			}
		}


		if (interaction.isSelectMenu()) {
			try {
				await client.menus.get(`${interaction.customId}.js`).run(interaction, client);
			}
			catch (error) {
				console.error(error);
				await interaction.update({ content: 'There was an error while executing this command! If this happens often, contact the developer!', components: [], ephemeral: true });
			}

		}
	},
};