import { Executable } from "../../interfaces/Executable";

export class Pomodoro implements Executable {
	public execute(interaction: any) {
		interaction.reply("Pomodoro")
	}
}