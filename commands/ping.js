exports.run = function(client, message, args){
	var calar = Math.abs(Math.random()*16777215).toString(16);
	calar = parseInt(calar, 16);
	message.channel.send({embed:{"description":`**pong \`${Date.now() - message.createdTimestamp} ms\`**`, "color":`${calar}`}});	//Sends pong and the time it took to do so
}