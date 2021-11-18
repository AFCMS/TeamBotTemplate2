const fs = require("fs");
const { REST } = require("@discordjs/rest");
const { SlashCommandBuilder } = require('@discordjs/builders');
const { Routes } = require("discord-api-types/v9");
const Discord = require("discord.js");
const config = require('./config.json')

// Error if missing configuration
if (!config.token && !config.guildid) {
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

const commands = [];

commands.push(
	new SlashCommandBuilder()
		.setName('team')
		.setDescription('A dummy command'),
);

commands.push(
	new SlashCommandBuilder()
		.setName('test')
		.setDescription('A dummy command'),
);


client.once("ready", async () => {
	console.log(`Logged in as ${client.user.tag}.`);

	const guild = client.guilds.resolve(config.guildid);

	guild.commands.set(commands);

	// Remove unused commands
	const existing_commands = await guild.commands.fetch();
	const unused_commands = [
		"test"
	];
	for (cname in unused_commands) {
		const result = existing_commands.find(command => command.name = commands[1].name)
		if (result) {
			guild.commands.delete(result.id);
		}
	}
	console.log(existing_commands.find(command => command.name = commands[1].name).id);
});

client.on("interactionCreate", async(interaction) => {
	interaction.reply({content: "You used a command!"})
});

client.login(config.token);