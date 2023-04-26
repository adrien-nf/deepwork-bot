import fs from "fs";
import path from "path";

export class CommandsReader {
	public static getCommands() {
		const foldersPath = path.join(__dirname, '../../commands');
		const commandFolders = fs.readdirSync(foldersPath);

		const commands = new Map<string, any>();

		for (const folder of commandFolders) {
			const commandsPath = path.join(foldersPath, folder);
			const commandFiles = fs.readdirSync(commandsPath).filter((file: string) => file.endsWith('.ts'));

			for (const file of commandFiles) {
				const filePath = path.join(commandsPath, file);

				import(filePath).then(command => {
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