const Discord = require("discord.js");
const {token} = require("./config.json")

// Error if missing configuration
if (!token) {
	console.log("Error: Missing configurations! See config.json.example.");
	return;
}
