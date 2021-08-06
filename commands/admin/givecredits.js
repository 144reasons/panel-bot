const { addUserCredits } = require('../../utils/wrapper.js');

module.exports = {
	name: 'givecredits',
	description: 'Give a user credits',
	async execute(message, client, args) {
		if(!args[0]) return message.channel.send('You didnt mention anyone!');
		if(!args[1]) return message.channel.send('You didnt specify an amount of credits!');

		function getUserFromMention(mention) {
			if (!mention) return;

			if (mention.startsWith('<@') && mention.endsWith('>')) {
				mention = mention.slice(2, -1);

				if (mention.startsWith('!')) {
					mention = mention.slice(1);
				}

				return client.users.cache.get(mention);
			}
		}

		const user = getUserFromMention(args[0]);

		if(isNaN(args[1]) || args[1] < 1 || args[1] > 99999) return message.channel.send('You didnt specify an amount of credits between 1 and 99999!');

		addUserCredits(await client.guilddb.get(`${message.guild.id}_control_url`), await client.guilddb.get(`${message.guild.id}_control_api`), user.id, args[1]).then(res => {
			message.channel.send('Gave the specified user ' + args[0] + ' credits! They now have ' + res.data.credits);
		}).catch(err => {
			if(err.code === 'ECONNREFUSED') return message.channel.send('ECONNREFUSED! Is the server down?');

			if(err.response.status === 500) return message.channel.send('500! There was an internal server error!');

			else return message.channel.send(`${err.response.status}! We have no info about this error. Please report this error to your server admin!`);
		});
	},
};