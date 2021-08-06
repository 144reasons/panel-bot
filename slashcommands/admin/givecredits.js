const { addUserCredits } = require('../../utils/wrapper.js');

module.exports = {
	name: 'givecredits',
	description: 'Give a user credits',
	options: [
		{
			name: 'target',
			type: 'USER',
			description: 'The user to give credits to',
			required: true,
		},
		{
			name: 'amount',
			type: 'NUMBER',
			description: 'The amount of credits to give',
			required: true,
		},
	],
	async execute(interaction, client, args) {
		const user = interaction.options.getUser('target');

		const number = interaction.options.getNumber('amount');

		if(number < 1 || number > 99999) return interaction.reply('You didnt specify an amount of credits between 1 and 99999!');

		addUserCredits(await client.guilddb.get(`${interaction.guild.id}_control_url`), await client.guilddb.get(`${interaction.guild.id}_control_api`), user.id, number).then(res => {
			interaction.reply('Gave the specified user ' + number + ' credits! They now have ' + res.data.credits);
		}).catch(err => {
			if(err.code === 'ECONNREFUSED') return interaction.reply('ECONNREFUSED! Is the server down?');

			if(err.response.status === 500) return interaction.reply('500! There was an internal server error!');

			else return interaction.reply(`${err.response.status}! We have no info about this error. Please report this error to your server admin!`);
		});
	},
};