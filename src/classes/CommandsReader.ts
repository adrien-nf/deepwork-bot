import fs from "fs";
import path from "path";
import { AppCommand } from "../interfaces/AppCommand";

export class CommandsReader {
	public static getCommands() {
		const foldersPath = path.join(process.env.ROOT_DIR as string, '/commands');
		const commandFolders = fs.readdirSync(foldersPath);

		const commands = new Map<AppCommand["name"], AppCommand>();

		for (const folder of commandFolders) {
			const commandsPath = path.join(foldersPath, folder);
			const commandFiles = fs.readdirSync(commandsPath).filter((file: string) => file.endsWith('.ts'));

			for (const file of commandFiles) {
				const filePath = path.join(commandsPath, file);

				import(filePath).then((command: AppCommand) => {
					if ('data' in command && 'execute' in command) {
						commands.set(command.data.name, command);
					} else {
						console.warn(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
					}
				})
			}
		}

		return commands;
	}
}