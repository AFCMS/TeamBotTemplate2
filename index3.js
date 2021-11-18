const fs = require("fs");
const { REST } = require("@discordjs/rest");
const { SlashCommandBuilder } = require('@discordjs/builders');
const { Routes } = require("discord-api-types/v9");
const Discord = require("discord.js");
const config = require('./config.json')

// Error if missing configuration
if (!config.token) {
	console.log("Error: Missing configurations! See config.json.example.");
	return;
}

// console.log(config.token);

const client = new Discord.Client({
	intents: [
		Discord.Intents.FLAGS.GUILDS,
		Discord.Intents.FLAGS.GUILD_MESSAGES,
		Discord.Intents.FLAGS.GUILD_INTEGRATIONS,
	]
});


client.once("ready", () => {
	console.log(`Logged in as ${client.user.tag}.`);
	const data = {
		"name": "test",
		"description": "test command",
	}
	client.api.applications(client.user.id).guilds(config.guildid).commands.post({data: data})
});

client.login(config.token);