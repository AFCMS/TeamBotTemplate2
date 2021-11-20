const Discord = require("discord.js");
const { SlashCommandBuilder } = require('@discordjs/builders');

const config = require('./config.json')

const client = new Discord.Client({
	intents: [
		Discord.Intents.FLAGS.GUILDS,
		Discord.Intents.FLAGS.GUILD_MESSAGES,
		Discord.Intents.FLAGS.GUILD_INTEGRATIONS,
	]
});

const pointsCommand = new SlashCommandBuilder().setName('points').setDescription('Lists or manages user points');

// Add a manage group
pointsCommand.addSubcommandGroup(group =>
	group
		.setName('manage')
		.setDescription('Shows or manages points in the server')
		.addSubcommand(subcommand =>
			subcommand
				.setName('user_points')
				.setDescription("Alters a user's points")
				.addUserOption(option =>
					option.setName('user').setDescription('The user whose points to alter').setRequired(true),
				)
				.addStringOption(option =>
					option
						.setName('action')
						.setDescription('What action should be taken with the users points?')
						.addChoices([
							['Add points', 'add'],
							['Remove points', 'remove'],
							['Reset points', 'reset'],
						])
						.setRequired(true),
				)
				.addIntegerOption(option => option.setName('points').setDescription('Points to add or remove')),
		),
);

// Add an information group
pointsCommand.addSubcommandGroup(group =>
	group
		.setName('info')
		.setDescription('Shows information about points in the guild')
		.addSubcommand(subcommand =>
			subcommand.setName('total').setDescription('Tells you the total amount of points given in the guild'),
		)
		.addSubcommand(subcommand =>
			subcommand
				.setName('user')
				.setDescription("Lists a user's points")
				.addUserOption(option =>
					option.setName('user').setDescription('The user whose points to list').setRequired(true),
				),
		),
);

// Get the final raw data that can be sent to Discord
//const rawData = pointsCommand.toJSON();

client.once("ready", async () => {
	console.log(`Logged in as ${client.user.tag}.`);

	const guild = client.guilds.resolve(config.guildid);

	guild.commands.set([pointsCommand]).catch(console.log);
});

client.on("interactionCreate", async(interaction) => {
	if (!interaction.isCommand()) {
		return
	}

	const {commandName, options} = interaction

	if (commandName === "points") {
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
	} 
});

client.login(config.token);