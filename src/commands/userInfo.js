const { cpApi, panelUrl } = require("../../config.json");
const { MessageEmbed } = require("discord.js")
const { getUserData, setOptions } = require('controlpanel-api')
setOptions(panelUrl, cpApi)

module.exports.run = async (client, message, args) => {
    getUserData(7358).then(res => {
        const embed = new MessageEmbed()
            .setTitle(`Your ControlPanel User Data`)
            .addFields(
                { name: `Account Name`, value: res.data.name},
                { name: `Account Balance`, value: res.data.credits},
                { name: `Pterodactyl`} // TODO
            )
        
        message.channel.send(embed)
    }).catch(err => {
        console.log(err);
    });
}

module.exports.help = {
    name: "userinfo",
    category: "General",
    description: "See your user info",
    usage: "userinfo"
  };