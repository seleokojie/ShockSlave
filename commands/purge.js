exports.run = function(client, message, args, argresult){
	let modRole_a = message.guild.roles.find("name", "Admin");
	let modRole_b = message.guild.roles.find("name", "Admins");
	let modRole_c = message.guild.roles.find("name", "boot");
    if(message.member.roles.has(modRole_a.id)||message.member.roles.has(modRole_b.id)||message.member.roles.has(modRole_c.id)) {
		let messagecount = parseInt(argresult);	//Parses the amount of messages to delete
		message.author.send("Messages Purged");
			
		//Goes and takes all messages up to the limit and deletes them all in one fell swoop
		message.channel.fetchMessages({limit: messagecount}).then(messages => message.channel.bulkDelete(messages));
	}else{
		return message.reply("Your not an admin :(");
	}
}