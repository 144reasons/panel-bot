const { MessageEmbed } = require('discord.js');
const { botColour } = require('../../config.json');

module.exports = {
	name: 'help',
	description: 'Replies with a Help embed!',
	async execute(interaction, client) {

		const scommands = client.slashcommands;

		const embed = new MessageEmbed()
			.setColor(botColour)
			.setTitle('All Slash Commands');


		function autoDeploy(value) {
			embed.addField(`/${value.name}`, value.description, false);
		}

		scommands.forEach(autoDeploy);

		await interaction.reply({ embeds: [embed] });

	},
};