const fs = require('fs');
const { Client, Intents, Collection } = require('discord.js');
const { token } = require('./config.json');
const Josh = require('@joshdb/core');
const provider = require('@joshdb/sqlite');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_INVITES] });
client.slashcommands = new Collection();
client.commands = new Collection();
client.menus = new Collection();


const guilddb = new Josh({
	name: 'guilddb',
	provider,
});

guilddb.defer.then(() => {
	console.log('Connected to the database.');
	client.guilddb = guilddb;
});

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

const scommandFolders = fs.readdirSync('./slashcommands');
scommandFolders.forEach((x) => {
	const scommandFiles = fs
		.readdirSync(`./slashcommands/${x}`)
		.filter((file) => file.endsWith('.js'));
	scommandFiles.forEach((d) => {
		const scommand = require(`./slashcommands/${x}/${d}`);

		client.slashcommands.set(scommand.name, scommand);
	});
});

const commandFolders = fs.readdirSync('./commands');
commandFolders.forEach((x) => {
	const commandFiles = fs
		.readdirSync(`./commands/${x}`)
		.filter((file) => file.endsWith('.js'));
	commandFiles.forEach((d) => {
		const command = require(`./commands/${x}/${d}`);

		client.commands.set(command.name, command);
	});
});

fs.readdir('./menus/', (err, files) => {
	if (err) console.log(err);

	const jsfile = files.filter((f) => f.split('.').pop() === 'js');
	if (jsfile.length <= 0) {
		console.log('No menus.');
		return;
	}

	jsfile.forEach((f) => {
		const props2 = require(`./menus/${f}`);
		client.menus.set(f, props2);
	});
});

client.login(token);
