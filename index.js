//const fs = require("fs");
const Discord = require("discord.js");
const { SlashCommandBuilder } = require('@discordjs/builders');

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
		.setDescription('A dummy command')
		//.addStringOption(input)
);


client.once("ready", async () => {
	console.log(`Logged in as ${client.user.tag}.`);

	const guild = client.guilds.resolve(config.guildid);

	guild.commands.set(commands).catch(console.log);
});

client.on("interactionCreate", async(interaction) => {
	if (!interaction.isCommand()) {
		return
	}

	const {commandName, options} = interaction

	if (commandName === "test") {
		var tr = new Discord.MessageEmbed({
			title: "Hello!",
			description: "A description",
		})//.addField({name: "test", value: "ttt", inline: true}) ;
		//interaction.reply({
		//	content: "You used a command!",
			//ephemeral: true,
		//})
		interaction.reply({
			content: tr,
			//ephemeral: true,
		})
	}
});

client.login(config.token);