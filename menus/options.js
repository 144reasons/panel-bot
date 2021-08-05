const { MessageActionRow, MessageSelectMenu } = require('discord.js');

module.exports.run = async (interaction, client) => {

	const userinfo = [ 'accountid', 'accountname', 'accountrole', 'accountbalance' ];

	let options = [];

	const createOptions = async (item) => {
		const pushme = { label: item, description: `Enabled: ${await client.guilddb.get(`${interaction.guild.id}_${item}`)}`, value: item };

		options = options.concat(pushme);
	};

	if(interaction.values.includes('first_option')) {
		for (let i = 0; i < userinfo.length; i++) await createOptions(userinfo[i]);

		const usrinfo = new MessageActionRow()
			.addComponents(
				new MessageSelectMenu()
					.setCustomId('usrinfo')
					.setPlaceholder('Nothing selected')
					.setMinValues(1)
					.setMaxValues(4)
					.addOptions(options),
			);

		await interaction.update({ content: 'Select to enable true or false', components: [usrinfo] });
	}


};