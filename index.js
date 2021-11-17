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

let mentionString = "";

client.once("ready", () => {
	console.log(`Logged in as ${client.user.tag}.`);
	mentionString = `<@!${client.user.id}>`

	client.user.setActivity("no one.", {type: "LISTENING"});
});

client.on("messageCreate", async message => {
	if (message.content === mentionString) {
		message.reply(`Ping!`);
		return;
	}
	//message.channel.send(`Hello!`);
});


client.login(config.token);
