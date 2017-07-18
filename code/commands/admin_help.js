exports.run = function(client, message, args){
	var calar = Math.abs(Math.random()*16777215).toString(16);
	calar = parseInt(calar, 16);
		
	// get role by name
	let myRole = message.guild.roles.find("name", "Admin");
	let myRole2 = message.guild.roles.find("name", "boot");
		
	if(!myRole){
		myRole = "name"
	}else if(!myRole2){
		myRole2 = "name"
	}
	//Simple Role check so that only users use this mod command
	if(message.member.roles.has(myRole.id)) {
		message.author.send({embed:{"title": "__**Commands of Shockwave's Bot**__","description": "*These are the Commands that you can use with this bot*","color": 0xc43c57,"thumbnail": {"url": "https://images.discordapp.net/avatars/242419277024591872/6ef83fbc0d29d8e8a98a8857b4abf93b.jpg"},"author": {"name": "Shockwave","url": "https://google.com","icon_url": "https://discordapp.com/api/users/198968141886259200/avatars/78b7e617ddb706c02ac0a6d7bf8ed448.jpg"},"fields": [{"name": "setGame","value": "Pretty Straight forward. Sets the game that this bot is playing ```html\n^setGame <message>\n```"},{"name": "setStatus","value": "Sets the status of the bot. You can even make me invisible and spook your friends ```html\n^setStatus <status>\n```"},{"name": "purge","value": "Purges a number of messages to clear chat```html\npurge <number_of_messages>```"},{"name": "admin_help","value": "You're kinda seeing what admin_help does right now :thinking:."}]}});
	} else if(message.member.roles.has(myRole2.id)){
		return message.author.send({embed:{"title": "__**Commands of Shockwave's Bot**__","description": "*These are the Commands that you can use with this bot*","color": 0xc43c57,"thumbnail": {"url": "https://images.discordapp.net/avatars/242419277024591872/6ef83fbc0d29d8e8a98a8857b4abf93b.jpg"},"author": {"name": "Shockwave","url": "https://google.com","icon_url": "https://discordapp.com/api/users/198968141886259200/avatars/78b7e617ddb706c02ac0a6d7bf8ed448.jpg"},"fields": [{"name": "setGame","value": "Pretty Straight forward. Sets the game that this bot is playing ```html\n^setGame <message>\n```"},{"name": "setStatus","value": "Sets the status of the bot. You can even make me invisible and spook your friends ```html\n^setStatus <status>\n```"},{"name": "purge","value": "Purges a number of messages to clear chat```html\npurge <number_of_messages>```"},{"name": "admin_help","value": "You're kinda seeing what admin_help does right now :thinking:."}]}});

	}else{
		return message.channel.send({embed:{"description":`Looks like you're not an Admin :(`, "color": `${calar}`}});
	}
}