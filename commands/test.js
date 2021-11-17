const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('test')
		.setDescription('A dummy command'),
	async execute(interaction) {
		await interaction.reply('Pong!');
	},
};