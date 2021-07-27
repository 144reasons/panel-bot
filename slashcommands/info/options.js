const { MessageActionRow, MessageSelectMenu } = require('discord.js');

module.exports = {
	name: 'options',
	description: 'Replies with Options!',
	async execute(interaction, client) {


		if(!interaction.member.permissions.has('ADMINISTRATOR')) return interaction.reply('You arent an administrator!');

		const row = new MessageActionRow()
			.addComponents(
				new MessageSelectMenu()
					.setCustomId('options')
					.setPlaceholder('Nothing selected')
					.addOptions([
						{
							label: 'Account Info',
							description: 'This is a description',
							value: 'first_option',
						},
						{
							label: 'Auto-delete after leave',
							description: 'This is also a description',
							value: 'second_option',
						},
					]),
			);

		await interaction.reply({ content: 'Select a settings tab you want to edit!', components: [row], ephemeral: true });
	},
};
