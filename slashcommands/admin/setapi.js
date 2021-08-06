const { getUsers } = require('../../utils/wrapper');

module.exports = {
	name: 'setapi',
	description: 'Replies with Options!',
	options: [{
		name: 'api',
		type: 'STRING',
		description: 'The input to echo back',
		required: true,
	}],
	async execute(interaction, client) {
		if(!interaction.member.permissions.has('ADMINISTRATOR')) return interaction.reply('You arent an administrator!');

		const { value: string } = interaction.options.get('api');

		if(string.length !== 48) return interaction.reply({ content: 'Your token is invalid, please doublecheck it! \nError: Token too short/long', ephemeral: true });

		const url = await client.guilddb.get(`${interaction.guild.id}_control_url`);

		if(!url) return interaction.reply({ content: 'Your token cannot be validated. You need to set your panels url using /seturl, so that we can check if your token is valid', ephemeral: true });

		getUsers(url, string).then(async res => {
			client.guilddb.set(`${interaction.guild.id}_control_api`, string);

			await interaction.reply({ content: 'Set the api token!', ephemeral: true });
		}).catch(async err => {
			if(err.code === 'ECONNREFUSED') return message.channel.send('ECONNREFUSED! Is the server down?');

			if(err.response.status === 500) return message.channel.send('500! There was an internal server error!');

			await interaction.reply({ content: 'Your token is invalid, please doublecheck it! \nError: Api says invalid', ephemeral: true });
		});
	},
};
