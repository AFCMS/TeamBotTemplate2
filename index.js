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

/*
commands.push(
	new SlashCommandBuilder()
		.setName('team')
		.setDescription('A dummy command')
		.addSubcommandGroup((group) => group
			.setName("management")
			.setDescription("Management command")
			.addSubcommand((subcommand) => subcommand
				.setName("create")
				.setDescription("Test")
			)
		)
		/*
		.addUserOption((option) => option
			.setName("user")
			.setDescription("User")
			.setRequired(false)
		)
		*/
		/*
		.addSubcommandGroup((group) => {return group
			.setName("management")
			.setDescription('Manage teams')
			.addSubcommand((subcommand) => {return subcommand
				.setName("create")
				.setDescription("Create a new Team")
			})
			.addSubcommand((subcommand) => {return subcommand
				.setName("delete")
				.setDescription("Create a new Team")
			})
		})

);
*/

commands.push(
	new SlashCommandBuilder()
		.setName('test')
		.setDescription('A dummy command')
		//.addStringOption(input)
);

commands.push(new SlashCommandBuilder()
	.setName('info')
	.setDescription('Get info about a user or a server!')
	.addSubcommand(subcommand =>
		subcommand
			.setName('user')
			.setDescription('Info about a user')
			.addUserOption(option => option.setName('target').setDescription('The user'))
		)
	.addSubcommand(subcommand =>
		subcommand
			.setName('server')
			.setDescription('Info about the server')
		)
);

commands.push(
	new SlashCommandBuilder()
		.setName('rank')
		.setDescription('Rank')
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
		var tr = new Discord.MessageEmbed()
			.setTitle("Title")
			.setColor("RED")
			.setTimestamp()
		//.addField({name: "test", value: "ttt", inline: true}) ;
		//interaction.reply({
		//	content: "You used a command!",
			//ephemeral: true,
		//})
		interaction.reply({
			embeds: [tr]
			//content: tr,
			//ephemeral: true,
		})
	} else if (commandName === "team") {
		console.log(interaction)
		interaction.reply({
			//embeds: [tr]
			content: "Hello! :partying_face:",
			//ephemeral: true,
		})
	} else if (commandName === "rank") {
		console.log(interaction)
		interaction.reply({
			embeds: [new Discord.MessageEmbed()
				.setColor("#0099ff")
				.setTitle(`${stats.name}, ${ordinalSuffixOf(stats.place)}, ${mode}`)
				.setDescription(`${stats.name} is in ${ordinalSuffixOf(stats.place)} place, with ${Math.round(stats.score)} score, ${mode} mode.`)
				.addFields(fields)
				.setTimestamp()],
			//content: "Hello! :partying_face:",
			ephemeral: true,
		})
	} 
});

client.login(config.token);