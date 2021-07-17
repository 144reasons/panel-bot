const Discord = require('discord.js');
const { botColour, owners } = require('../../config.json');

module.exports = {
	name: 'eval',
	description: 'Eval',
	ownerOnly: true,
	hidden: true,
	execute(message, client, args) {

		if(message.author.id !== owners) return message.channel.send('This command isnt for you!');

		try {
			const code = args.join(' ');
			let evaled = eval(code);

			if (typeof evaled !== 'string') evaled = require('util').inspect(evaled);

			const embed = new Discord.MessageEmbed()
				.setColor(botColour)
				.setTitle('Eval')
				.setDescription(`\`\`\`${evaled}\`\`\``);

			message.channel.send(embed);
		}
		catch (err) {
			message.channel.send(`\`ERROR\` \`\`\`xl\n${err}\n\`\`\``);
		}
	},
};