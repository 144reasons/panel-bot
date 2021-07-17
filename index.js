// ──────────────────────────────────────────────────────────────────── [ Start of index.js & dependencies ]

const Discord = require('discord.js');
const { setOptions } = require('controlpanel-api');
const chalk = require('chalk');
const fs = require('fs');
const { inspect } = require('util');
const Keyv = require('keyv');
const { token, cpApi, panelUrl } = require('./config.json');
const db = new Keyv('sqlite://./db/main.sqlite', { namespace: 'db' });
db.on('error', err => console.log('Connection Error', err));

// ──────────────────────────────────────────────────────────────────── [ Client start ]

const client = new Discord.Client({
	ws: { properties: { $browser: 'Discord iOS' } },
});
const eventFiles = fs
	.readdirSync('./events')
	.filter((file) => file.endsWith('.js'));
client.commands = new Discord.Collection();
require('discord-buttons')(client);
client.buttons = new Discord.Collection();

// ──────────────────────────────────────────────────────────────────── [ Event handler ]

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args, client, db));
	}
	else {
		client.on(event.name, (...args) => event.execute(...args, client, db));
	}
}

// ──────────────────────────────────────────────────────────────────── [ Part of command handler ]

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

// ──────────────────────────────────────────────────────────────────── [ Button Handler ]

fs.readdir('./buttons/', (err, files) => {
	if (err) console.log(err);

	const jsfile = files.filter((f) => f.split('.').pop() === 'js');
	if (jsfile.length <= 0) {
		console.log('No buttons.');
		return;
	}

	jsfile.forEach((f) => {
		const props2 = require(`./buttons/${f}`);
		client.buttons.set(f, props2);
	});
});

// ──────────────────────────────────────────────────────────────────── [ Pretty exiting reminder ]

process.on('SIGINT', async () => {
	console.log(chalk.bold.red('Process ended! Exiting...'));
	process.exit();
});

// ──────────────────────────────────────────────────────────────────── [ Login ]

module.exports = { client, db };

client.login(token);