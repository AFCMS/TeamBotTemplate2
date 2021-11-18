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

//const commands = new Discord.ApplicationCommandManager();

//commands.create(
//	new SlashCommandBuilder()
//		.setName('team')
//		.setDescription('A dummy command'),
//);

//commands.create(
//	new SlashCommandBuilder()
//		.setName('test')
//		.setDescription('A dummy command'),
//);

client.once("ready", async () => {
	console.log(`Logged in as ${client.user.tag}.`);

	const guild = client.guilds.resolve(config.guildid);

	guild.commands.create({
		name: "goodmorning",
		description: "Good morning command"
	});

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

	//for (const command of commands) {
	//	client.api.applications(client.user.id).guilds(config.guildid).commands.post({data: commands})
	//}
	//const cache = client.application.commands.fetch({ guildId: config.guildid });
	//console.log(cache);
	//const id = cache.find(command => command.name = commands[1].name).id;
	//const cache = client.guilds.cache.get(config.guildid);

	//console.log(cache);
	//console.log(cache.commands);
	//const id = cache.find(command => command.name == commands[1].name).id;
	//const id2 = cache.commands;
	//client.api.application.guilds.commands.delete(id);
});

client.on("interactionCreate", async(interaction) => {
	interaction.reply({content: "You used a command!"})
});

client.login(config.token);