const reqEvent = (event) => require(`../events/${event}`)
module.exports = client => {
	client.on('ready', () => reqEvent('ready')(client));
	client.on('guildCreate', () => reqEvent('guildCreate')(client));
	client.on('guildDelete', () => reqEvent('guildDelete')(client));
	client.on('message', reqEvent('message'));
};
