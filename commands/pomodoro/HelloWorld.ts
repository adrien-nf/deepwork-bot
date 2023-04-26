import { SlashCommandBuilder, RepliableInteraction } from "discord.js"

export const data = new SlashCommandBuilder()
	.setName('ping')
	.setDescription('Replies with Pong!')

export const execute = async (interaction: RepliableInteraction) => {
	await interaction.reply("Hey there")
}