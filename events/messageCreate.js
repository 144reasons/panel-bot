const { prefix, owners } = require('../config.json');

module.exports = {
	name: 'messageCreate',
	async execute(message, client) {
		if (!message.content.toLowerCase().startsWith(prefix) || message.author.bot) {return;}

		if(await client.guilddb.get(`${message.guild.id}_control_url`) === null | await client.guilddb.get(`${message.guild.id}_control_api`) === null) return message.channel.send('Sorry, but the owner of the server needs to first add the credentials for their panel. They can do this by using the slash commands `/setapi` and `/seturl`. This is in place to make sure people cannot see your api token when setting the bot up!');

		const args = message.content.slice(prefix.length).trim().split(/ +/);
		const command = args.shift().toLowerCase();

		if (!client.commands.has(command)) return;

		try {
			const cmd = client.commands.get(command);
			if (cmd.ownersOnly && message.author.id !== owners) {return message.channel.send('This command isnt made for you!');}
			cmd.execute(message, client, args);
		}
		catch (error) {
			console.log(`There was an error executing the command "${command}": \n${error}`);
			message.reply('There was an error while executing this command! If this happens often, contact the developer!');
		}
	},
};