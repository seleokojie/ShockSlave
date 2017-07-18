client.on("message", message => {
	//Logs messages
	logger.write(`${message.guild} - ${message.channel.name} - @${message.author.username}#${message.author.discriminator} ( ${message.author} ) - ${message.createdAt} - ${message.content}\n`);
	
	//If message doesn't start with prefix
	if(!message.content.startsWith(prefix)) return;
		
	//Get data after a command
	var args = message.content.split(" ").slice(1);	//Takes user message and splits it
	var argresult = args.join(" ");//Reforms user message wihout prefix or command
	
	//So that bots don't accidentally send commands
	if(message.author.bot) return;
	
	if (message.content.startsWith(prefix + "ping")){	//Gets the sending speed
		var calar = Math.abs(Math.random()*16777215).toString(16);
		calar = parseInt(calar, 16);
		message.channel.send({embed:{"description":`**pong \`${Date.now() - message.createdTimestamp} ms\`**`, "color":`${calar}`}});	//Sends pong and the time it took to do so
	}else
		
	if (message.content.startsWith(prefix + "setGame")){	//Sets the bot's game
	
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
			console.log("Game Changed");
			client.user.setGame(argresult);
		} else if(message.member.roles.has(myRole2.id)){
			console.log("Game Changed");
			client.user.setGame(argresult);
		}else{
			message.channel.send({embed:{"description":`Looks like you're not an Admin :(`, "color": `${calar}`}});
		}
	}else
		
	if (message.content.startsWith(prefix + "setStatus")){	//Sets the bot's status
		
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
			console.log("Status Changed");
			client.user.setStatus(argresult);
		} else if(message.member.roles.has(myRole2.id)){
			console.log("Status Changed");
			client.user.setStatus(argresult);
		}else{
			message.channel.send({embed:{"description":`Looks like you're not an Admin :(`, "color": `${calar}`}});
		}
	}else
	
	if (message.content.startsWith(prefix + "oyes")){	//Simple input-output
		message.channel.send("ono");
	}else
		
	if (message.content.startsWith(prefix + "worldchamp")){	//Returns who the true World Champ is
		message.channel.send({embed:{"description":`**Not 8k**`}});	//Sends pong and the time it took to do so
	}else
		
	if (message.content.startsWith(prefix + "purge")){	//Purges an amount of messages
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
	}else
		
	if (message.content.startsWith(prefix + "manual")){	//Shows Game Manual info
		if(message.content.startsWith(prefix + "manual find")){
			
			//redefining argresult to take away 2 sections instead of 1
			args = message.content.split(" ").slice(2);
			argresult = args.join(" ");
			argresult.toLowerCase();
			
			//Globally defining the search embed
			const embed = new Discord.RichEmbed()
				.setColor(0xc43c57)
				.setTitle(`**Search the VEX In The Zone Game Manual**`)
				.setDescription(`These are the clauses and definitions that contain ${argresult}:`)
				.setURL("https://www.vexrobotics.com/vexedr/competition/vrc-current-game");
					  
			var limit = 50;	//Character limit in the search
			var found = false;	//Returns true if argresult is in the manual
			var counter = 1;
			
			for(var key in Manual) {
				//console.log(key);
				var y = Manual[key];
				
				if(((y).toLowerCase()).includes(argresult)){
					y = (y.length < limit) ? y : y.substring(0, limit) + '...';
					//console.log(y);
					embed.addField(`#${counter}`, `${key}`, true);
					found = true;
					counter++;
					if(counter == 25){
						embed.addField("Reached Limit", "Results have reached a limit.");
						message.channel.send({embed});
						return;
					}
				}
			}
			if(!found){
				return message.channel.send("Not found in manual");
			}
			message.channel.send({embed});
		}else{
			var x = argresult.toUpperCase();	//So that having some things misspelt isn't a problem
			
			y = Manual[x];	//Checks the manual JSON under the index of x
			if(!y){	//If not in the manual
				message.channel.send("This is not part of the Rulebook. Check your spelling.");
			}else{
			
				if(y.length >1024){	//Embeds won't send messages longer than 1024 characters, so this is a backup
					if(y.length >2000){
						var x = y.substring(0,1963);	//1965 is beginning of f-clause in R7 in manual.JSON
						message.channel.send(x);
						message.channel.send(y.substring(1963));
					}else{
					message.channel.send("***Due to the size of this ruling, it cannot be shown in the cool font*** :sob:\n\n" + y);
					}
				}else{
					message.channel.send({embed:{"author": {"name": "VEX Robotics Competition In the Zone Rulebook", "url": "https://google.com", "icon_url": "https://discordapp.com/api/users/198968141886259200/avatars/78b7e617ddb706c02ac0a6d7bf8ed448.jpg"}, color: 0xc43c57,"fields": [{"name": `**${x}**`,"value": `${y}`}] }});
				}
			}
		}
	}else
		
	if (message.content.startsWith(prefix + "help")){	//Shows help screen
		message.channel.send({embed});
	}else
		
	if (message.content.startsWith(prefix + "admin_help")){	//Shows help screen
	
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
	}else
		
	if (message.content.startsWith(prefix + "team")){	//Start of REST API stuff. Gets the info of a particular team
		number = argresult;
		
		var website_team = "https://vexdb.io/teams/view/";
		website_team+=number;	//Sets the website to be the team number
		url = "http://api.vexdb.io/v1/get_teams?team=" + number;
		
		// get is a simple wrapper for request()
		// which sets the http method to GET
		var request = http.get(url, function (response) {
			// data is streamed in chunks from the server
			// so we have to handle the "data" event    
			var buffer = "", 
				data,
				result;

			response.on("data", function (chunk) {
				buffer += chunk;
			}); 

			response.on("end", function (err) {
				// finished transferring data
				// dump the raw data
				console.log(buffer);
				console.log("\n");
				data = JSON.parse(buffer);
				result = data.result[0];

				if(data.size == 0){
					return message.channel.send({embed:{"description":"**That team does not exist. Check your spelling**", "color": 0xc43c57}});
				}if(!result.robot_name){
					result.robot_name = "None";
				}if(!result.region){
					result.region = result.country;
				}
					return message.channel.send({embed:{"author": {"name": `${result.program} Team ${result.number} - ${result.team_name}`, "url": `${website_team}`}, color: 0xc43c57,"fields": [{"name":"**Location**","value": `${result.city}, ${result.region}`, "inline": true}, {"name":"**Organization**","value":`${result.organisation}`, "inline": true}, {"name":"**Robot Name**","value":`${result.robot_name}`}]}});
				
			}); 
		}); 		
	}else
		
	if (message.content.startsWith(prefix + "skills")){	//Simple input-output
		
		if(!argresult){	//If there is no team specified, return a list of the top 12 skills runs in the World
		
		var website_team = "https://vexdb.io/teams/view/";	//Sets the website to be the team page
		url = "http://api.vexdb.io/v1/get_skills?season=In The Zone&type=2&season_rank=true";
		
		// get is a simple wrapper for request()
		// which sets the http method to GET
		var request = http.get(url, function (response) {	//World Skills Data Get
			// data is streamed in chunks from the server
			// so we have to handle the "data" event    
			var buffer = "", 
				data;

			response.on("data", function (chunk) {
				buffer += chunk;
			}); 

			response.on("end", function (err) {
				// finished transferring data
				// dump the raw data
				console.log(buffer);
				console.log("\n");
				data = JSON.parse(buffer);
				var result = [...data.result];	//ES6 way of copying an array
				//message.channel.send(result.number + "\n" + result.team_name + "\n" + result.program + "\n" +  result.organization + "\n" + result.robot_name + "\n" + result.city + "\n" + result.region + "\n" + result.country + "\n" + result.grade + "\n" + result.is_registered);
				message.channel.send({embed:{"author": {"name": "In The Zone Top 12", "url": `${website_team}`}, color: 0xc43c57,"fields": [{"name":"#1 :first_place: ","value": `**[${result[0].team}](${website_team}${result[0].team})** - ${result[0].score}`, "inline": true}, {"name":"#2 :second_place:","value":`**[${result[1].team}](${website_team}${result[1].team})** - ${result[1].score}`, "inline": true}, {"name":"#3 :third_place:","value":`**[${result[2].team}](${website_team}${result[2].team})** - ${result[2].score}`, "inline": true}, {"name":"#4","value":`**[${result[3].team}](${website_team}${result[3].team})** - ${result[3].score}`, "inline": true}, {"name":"#5","value":`**[${result[4].team}](${website_team}${result[4].team})** - ${result[4].score}`, "inline": true}, {"name":"#6","value":`**[${result[5].team}](${website_team}${result[5].team})** - ${result[5].score}`, "inline": true}, {"name":"#7","value":`**[${result[6].team}](${website_team}${result[6].team})** - ${result[6].score}`, "inline": true}, {"name":"#8","value":`**[${result[7].team}](${website_team}${result[7].team})** - ${result[7].score}`, "inline": true}, {"name":"#9", "value":`**[${result[8].team}](${website_team}${result[8].team})** - ${result[8].score}`, "inline": true}, {"name":"#10","value":`**[${result[9].team}](${website_team}${result[9].team})** - ${result[9].score}`, "inline": true}, {"name":"#11","value":`**[${result[10].team}](${website_team}${result[10].team})** - ${result[10].score}`, "inline": true}, {"name":"#12","value":`**[${result[11].team}](${website_team}${result[11].team})** - ${result[11].score}`, "inline": true}] }});
				
			}); 
		});
		
		}else{	//If a team is specified, return a number of skills-related info
			number = argresult
			url = "http://api.vexdb.io/v1/get_skills?season=In The Zone&type=2&season_rank=true&team=" + number;
			
			
			var request = http.get(url, function (response) {	//Skills for a team Data Get
			    
				var buffer = "", 
					data;

				response.on("data", function (chunk) {
					buffer += chunk;
				}); 

				response.on("end", function (err) {
					
					console.log(buffer);
					console.log("\n");
					data = JSON.parse(buffer);
					var result = [...data.result];	//ES6 way of copying an array
					
					if(!result[0]){	
						message.channel.send({embed:{"description":"**That team does not exist or has not had a skills run yet**", "color": 0xc43c57}});
					}else{
						var website_event = "https://vexdb.io/events/view/"+result[0].sku
						
						message.channel.send({embed:{"title": `__**Best Robot Skills run from Team ${number}**__`, "description": `[${result[0].team}](${website_event}) hello`,"color": 0xc43c57}});
					}
				}); 
			});
		}
	}
		
});