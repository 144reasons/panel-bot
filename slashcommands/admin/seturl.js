module.exports = {
	name: 'seturl',
	description: 'Replies with Options!',
	options: [{
		name: 'url',
		type: 'STRING',
		description: 'The input to echo back',
		required: true,
	}],

	async execute(interaction, client) {

		const checkUrl = (url) => {
			/* eslint no-useless-escape: "off" */
			const res = String(url).match(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)[/]/gi);
			return (res !== null);
		};

		if(!interaction.member.permissions.has('ADMINISTRATOR')) return interaction.reply('You arent an administrator!');

		const { value: string } = interaction.options.get('url');

		if(checkUrl(string) === false) return interaction.reply({ content: 'The provided url isnt a valid URI. Example of valid URI: <https://google.com/> | Invalid URI: google.com\nRemember to also end the URI with `/`', ephemeral: true });

		client.guilddb.set(`${interaction.guild.id}_control_url`, string);
		await interaction.reply({ content: 'Set the url! Please set up your api token now so we can verify both are correct.', ephemeral: true });
	},
};
