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


client.login(config.token);


const commands = [
	new SlashCommandBuilder().setName('ping').setDescription('Replies with pong!'),
	new SlashCommandBuilder().setName('server').setDescription('Replies with server info!'),
	new SlashCommandBuilder().setName('user').setDescription('Replies with user info!'),
]
	.map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(config.token);

rest.put(Routes.applicationGuildCommands(client.user.id, config.guildid), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);