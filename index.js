const fs = require("fs");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const Discord = require("discord.js");
const config = require('./config.json')

// Error if missing configuration
if (!config.token) {
	console.log("Error: Missing configurations! See config.json.example.");
	return;
}

console.log(config.token);

const client = new Discord.Client({
	intents: [
		Discord.Intents.FLAGS.GUILDS,
		Discord.Intents.FLAGS.GUILD_MESSAGES
	]
});


const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));

const commands = [];

clients.commands = new Collection();

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
	client.commands.set(command.data.name, command);
}

let mentionString = "";

client.once("ready", () => {
	console.log(`Logged in as ${client.user.tag}.`);
	mentionString = `<@!${client.user.id}>`

	client.user.setActivity("no one.", {type: "LISTENING"});
	const CLIENT_ID = client.user.id
	const rest = new REST({
		version: "9"
	}).setToken(config.token);

	(async () => {
		try {
			await rest.put(Routes.applicationCommand(CLIENT_ID), {
				body: commands
			})
			console.log("Commands Registered!");
		} finally {}
	});
});

client.on("messageCreate", async message => {
	if (message.content === mentionString) {
		message.reply(`Ping!`);
		return;
	}
	//message.channel.send(`Hello!`);
});


client.login(config.token);
