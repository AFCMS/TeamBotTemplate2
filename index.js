const Discord = require("discord.js");
const config = require('./config.json')

// Error if missing configuration
if (!config.token) {
	console.log("Error: Missing configurations! See config.json.example.");
	return;
}

console.log(config.token);
