const { Client, Collection } = require("discord.js");
const { loadCommands, loadEvents } = require("./utils/register");
const { token } = require('../config.json')

const client = new Client();
client.commands = new Collection();

(async () => {
  await loadCommands(client);
  await loadEvents(client);
  await client.login(token);
})();

module.exports = {
  client,
};