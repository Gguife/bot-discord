const { SlashCommandBuilder } = require("discord.js")

module.exports = {
  data: new SlashCommandBuilder()
    .setName("playlist")
    .setDescription("Escute a playlist para estudos"),

  async execute(interaction) {
    await interaction.reply("https://open.spotify.com/playlist/6u7viETKZQYpWiszSUgHRD?si=98a207ba20464576")
  }
}