const { owners } = require("../../config.json");
const { MessageEmbed } = require('discord.js')

module.exports.run = async (client, message, args) => {
    if(!owners.includes(message.author.id)) return message.channel.send('You are not worthy!')

    try {
        const code = args.join(" ");
        let evaled = eval(code);
    
        if (typeof evaled !== "string") evaled = require("util").inspect(evaled);
    
        const embed = new MessageEmbed()
        .setTitle('Eval Successful')
        .setDescription(`\`\`\`${evaled}\`\`\``)
        return message.channel.send(embed);
      } catch (err) {
          message.channel.send(`\`\`\`${err}\`\`\``)
          return message.channel.send('Thats a no from internals, chief!')
      }
}

module.exports.help = {
    name: "eval",
    category: "Owner",
    description: "eval",
    usage: "eval [code]",
  };