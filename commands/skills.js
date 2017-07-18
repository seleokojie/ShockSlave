var http = require("http");
var result;
exports.run = function(client, message, args, argresult){
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
				result = [...data.result];	//ES6 way of copying an array
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
				result = [...data.result];	//ES6 way of copying an array
					
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