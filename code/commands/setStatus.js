exports.run = function(client, message, args, argresult){
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
}