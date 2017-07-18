const prefix = require("../Auth.json").prefix;
module.exports = message => {
	
	var fs = require('fs');
	var logger = fs.createWriteStream('C:/Users/Owner/Documents/DiscordBot/log.txt', {
		flags: 'a' // 'a' means appending (old data will be preserved)
	});
	//Logs messages
	logger.write(`${message.guild} - ${message.channel.name} - @${message.author.username}#${message.author.discriminator} ( ${message.author} ) - ${message.createdAt} - ${message.content}\n`);
	if(!message.content.startsWith(prefix)) return;
	if(message.author.bot) return;
	const client = message.client;
	var args = message.content.split(" ").slice(1);	//Takes user message and splits it
	var argresult = args.join(" ");//Reforms user message wihout prefix or command
	args = message.content.split(" ");	//Takes user message and splits it
	var command = args.shift().slice(prefix.length);
	
	try{
		let cmdFile = require(`../commands/${command}`);
		cmdFile.run(client, message, args, argresult, prefix);
	}catch(err){
		console.log(`Command ${command} Failed!\n${err.stack}`);
	}
};