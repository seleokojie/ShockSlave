const Discord = require("discord.js");
const client = new Discord.Client();
const Auth = require("./auth.json").token;
const Manual = require("./manual.json");
require('./util/eventLoader')(client);

var number = "";

var fs = require('fs');
var logger = fs.createWriteStream('C:/Users/Owner/Documents/DiscordBot/log.txt', {
  flags: 'a' // 'a' means appending (old data will be preserved)
});

var skills = [];

var http = require("http");

const embed = {//Help command Embed statement

  "title": "__**Commands of Shockwave's Bot**__",
  "description": "*These are the Commands that you can use with this bot*",
  "color": 0xc43c57,
  "thumbnail": {
    "url": "https://images.discordapp.net/avatars/242419277024591872/6ef83fbc0d29d8e8a98a8857b4abf93b.jpg"
  },
  "author": {
    "name": "Shockwave",
    "url": "https://google.com",
    "icon_url": "https://discordapp.com/api/users/198968141886259200/avatars/78b7e617ddb706c02ac0a6d7bf8ed448.jpg"
  },
  "fields": [
    {
		"name": "**ping**",
		"value": "This replies back with the classic 'Pong', but also tells you how fast it took to do so"
    },
    {
		"name": "manual",
		"value": "Returns a section of the manual ```html\nExample: ^manual <SG10>```"
    },
	{
		"name": "oyes",
		"value": "Returns 'ono'"
    },
	{
		"name": "team",
		"value": "Returns basic team info ```html\nStructure: ^team <number>```"
    },
	{
		"name": "skills",
		"value": "Returns basic team info ```html\nStructure: ^skills```"
    },
	{
		"name": "help",
		"value": "You're kinda seeing what help does right now :thinking:."
    },
	{
		"name":"More coming soon",
		"value":":wink:"
	}
  ]
};


var reload = (message, cmd) => {
	delete require.cache[require.resolve("./commands/" + cmd)];
	try {
		let cmdFile = require("./commands/" + cmd);
	} catch(err) {
		message.channel.send(`Problem Loading ${cmd}: ${err}`).then(
			response => response.delete(1000).catch(error => console.log(error.stack))
		).catch(error => console.log(error.stack));
	}
	message.channel.send(`${cmd} reload was a success!`).then(
		response => response.delete(1000).catch(error => console.log(error.stack))
	).catch(error => console.log(error.stack));	
};
exports.reload = reload;

client.login(Auth);

client.on("guildDelete", guild => {
  console.log(`I have left ${guild.name} at ${new Date()}`);
});

client.on("guildCreate", guild => {
  guild.defaultChannel.send(`I have joined ${guild.name}`);
});
