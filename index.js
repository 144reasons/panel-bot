// ──────────────────────────────────────────────────────────────────── [ Start of index.js & dependencies ]

const fs = require('fs');
const { Client, Intents, Collection } = require('discord.js');
const { token } = require('./config.json');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
client.commands = new Collection();

const eventFiles = fs
	.readdirSync('./events')
	.filter((file) => file.endsWith('.js'));

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args, client));
	}
	else {
		client.on(event.name, (...args) => event.execute(...args, client));
	}
}

const { readdirSync } = require('fs');
const commandFolders = readdirSync('./commands');
commandFolders.forEach((x) => {
	const commandFiles = fs
		.readdirSync(`./commands/${x}`)
		.filter((file) => file.endsWith('.js'));
	commandFiles.forEach((d) => {
		const command = require(`./commands/${x}/${d}`);

		client.commands.set(command.name, command);
	});
});

client.login(token);
