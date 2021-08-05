const { owners } = require('../../config.json');

module.exports = {
	name: 'eval',
	description: 'Eval',
	async execute(message, client, args) {

		if(message.author.id !== owners) return message.channel.send('This command isnt for you!');

		try {
			const code = args.join(' ');
			let evaled = eval(code);

			if (typeof evaled !== 'string') evaled = require('util').inspect(evaled);

			message.channel.send({ content: `\`\`\`${evaled}\`\`\`` });
		}
		catch (err) {
			message.channel.send(`\`ERROR\` \`\`\`xl\n${err}\n\`\`\``);
		}
	},
};