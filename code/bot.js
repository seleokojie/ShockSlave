const Discord = require("discord.js");
const client = new Discord.Client();
const Auth = require("./auth.json").token;
const Manual = require("./manual.json");
require('./util/eventLoader')(client);



const express = require('express');
const app = express();

// set the port of our application
// process.env.PORT lets the port be set by Heroku
const port = process.env.PORT || 5000;

// set the view engine to ejs
app.set('view engine', 'ejs');

// make express look in the `public` directory for assets (css/js/img)
app.use(express.static(__dirname + '/public'));

// set the home page route
app.get('/', (request, response) => {
    // ejs render automatically looks in the views folder
    response.render('index');
});

app.listen(port, () => {
    // will echo 'Our app is running on http://localhost:5000 when run locally'
    console.log('Our app is running on http://localhost:' + port);
});

// pings server every 15 minutes to prevent dynos from sleeping
setInterval(() => {
 http.get('http://discordjs-heroku.herokuapp.com');
}, 900000);

var number = "";

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
