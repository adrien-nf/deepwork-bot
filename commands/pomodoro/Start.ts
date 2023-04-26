import { SlashCommandBuilder } from "discord.js"
import { WorkTypes } from "../../src/interfaces/WorkTypes";
import { WorkTypeFactory } from "../../src/classes/WorkTypeFactory/WorkTypeFactory";

export const data = new SlashCommandBuilder()
	.setName('start')
	.setDescription('Start some work system')
	.addStringOption(option =>
		option.setName('type')
			.setDescription('The work system category')
			.addChoices(
				{ name: WorkTypes.Pomodoro, value: WorkTypes.Pomodoro },
			)
	);

export const execute = async (interaction: any) => {
	const type: WorkTypes = interaction.options.getString("type");

	WorkTypeFactory.get(type).execute(interaction);
}