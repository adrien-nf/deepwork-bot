import { SlashCommandBuilder } from "discord.js";

export interface AppCommand {
	name: typeof SlashCommandBuilder.name,
	data: SlashCommandBuilder
}