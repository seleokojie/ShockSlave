const Discord = require("discord.js");
const Manual = require("../manual.json");
exports.run = function(client, message, args, argresult, prefix){
	if(!argresult){
		return message.channel.send("--__-- Please specify a ruling or definition to find");
	}
	if(message.content.startsWith(prefix + "manual find")){
			
		//redefining argresult to take away 2 sections instead of 1
		args = message.content.split(" ").slice(2);
		argresult = args.join(" ");
		argresult.toLowerCase();
		if(!argresult){
			return message.channel.send("--__-- Please specify a word or phrase to find");
		}		
			
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
}