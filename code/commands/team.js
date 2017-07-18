var http = require("http");
exports.run = function(client, message, args, argresult){
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
}