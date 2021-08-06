const { clearUserCredits } = require('../../utils/wrapper.js');

module.exports = {
	name: 'clearbalance',
	description: 'Give a user credits',
	options: [
		{
			name: 'target',
			type: 'USER',
			description: 'The user to clear the balance of',
			required: true,
		},
	],
	async execute(interaction, client, args) {
		const user = interaction.options.getUser('target');

		clearUserCredits(await client.guilddb.get(`${interaction.guild.id}_control_url`), await client.guilddb.get(`${interaction.guild.id}_control_api`), user.id).then(res => {
			interaction.reply('Cleared users credits');
		}).catch(err => {
			if(err.code === 'ECONNREFUSED') return interaction.reply('ECONNREFUSED! Is the server down?');

			if(err.response.status === 500) return interaction.reply('500! There was an internal server error!');

			else return interaction.reply(`${err.response.status}! We have no info about this error. Please report this error to your server admin!`);
		});
	},
};