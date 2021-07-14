
module.exports = async (client) => {
    console.log(`${client.user.tag} has started!`);
  
    client.user.setActivity('God.', { type: "PLAYING" });
}