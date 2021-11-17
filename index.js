const Discord = require("discord.js");
const config = require('./config.json')

// Error if missing configuration
if (!config.token) {
	console.log("Error: Missing configurations! See config.json.example.");
	return;
}

console.log(config.token);

const client = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS] });

let mentionString = "";

client.once("ready", () => {
	console.log(`Logged in as ${client.user.tag}.`);
	mentionString = `<@!${client.user.id}>`

	client.user.setActivity("no one.", {type: "LISTENING"});
});

client.on("message", async message => {
	if (message.content === mentionString) {
		message.channel.send(`Hello!`);
		return;
	}
});


client.login(config.token);
