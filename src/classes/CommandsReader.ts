const fs = require('node:fs');
const path = require('node:path');

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
				const command = require(filePath);
				// Set a new item in the Collection with the key as the command name and the value as the exported module
				if ('data' in command && 'execute' in command) {
					commands.set(command.data.name, command);
				} else {
					console.warn(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
				}
			}
		}

		return commands;
	}
}