const { owners } = require('../../config.json');

module.exports = {
	name: 'deploy',
	description: 'deploy',
	async execute(message, client, args) {

		if(message.author.id !== owners) return message.channel.send('This command isnt for you!');

		const scommands = client.slashcommands;

		let toDep = [];

		function autoDeploy(value) {

			const pushme = { name: value.name, description: value.description, options: value.options };

			toDep = toDep.concat(pushme);
		}

		scommands.forEach(autoDeploy);

		console.log(toDep);

		const commands = await client.application?.commands.create(toDep);
		console.log(commands);
	},
};