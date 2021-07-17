module.exports.run = async (menu, client, db) => {
	if(!menu.clicker.member.hasPermission('ADMINISTRATOR')) return menu.message.channel.send('You arent an admin!');

	menu.reply.defer();
	menu.message.channel.send('Set your new settings!');

	const checkEach = async (item) => {
		if(await db.get(`${menu.message.guild.id}_${item}`) === 'true') await db.set(`${menu.message.guild.id}_${item}`, 'false');
		else await db.set(`${menu.message.guild.id}_${item}`, 'true');
	};

	menu.values.forEach(checkEach);
};