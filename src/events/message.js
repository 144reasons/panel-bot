const { prefix } = require("../../config.json");

module.exports = (client, message) => {
  if (
    message.author.bot ||
    message.channel.type === "dm" ||
    !message.content.toLowerCase().startsWith(prefix)
  )
    return;

  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  const cmd = client.commands.get(command);
  if (cmd) cmd.run(client, message, args);
};