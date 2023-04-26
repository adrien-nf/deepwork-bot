
import { REST, RESTPostAPIChatInputApplicationCommandsJSONBody, Routes } from 'discord.js';
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import { AppCommand } from './src/interfaces/AppCommand';

dotenv.config();

const getCommands = async () => {
	const foldersPath = path.join(process.env.ROOT_DIR as string, '/commands');
	const commandFolders = fs.readdirSync(foldersPath);

	const commands: RESTPostAPIChatInputApplicationCommandsJSONBody[] = [];

	for (const folder of commandFolders) {
		const commandsPath = path.join(foldersPath, folder);
		const commandFiles = fs.readdirSync(commandsPath).filter((file: string) => file.endsWith('.ts'));

		for (const file of commandFiles) {
			const filePath = path.join(commandsPath, file);

			await import(filePath).then((command: AppCommand) => {
				if ('data' in command && 'execute' in command) {
					commands.push(command.data.toJSON());
				} else {
					console.warn(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
				}
			})
		}
	}

	return commands;
}

// Construct and prepare an instance of the REST module
const rest = new REST().setToken(process.env.DISCORD_TOKEN as string);

getCommands().then(commands => {
	// and deploy your commands!
	(async () => {
		try {
			console.log(`Started refreshing ${commands.length} application (/) commands.`);

			// The put method is used to fully refresh all commands in the guild with the current set
			const data = await rest.put(
				Routes.applicationGuildCommands(process.env.DISCORD_APP_CLIENT_ID as string, process.env.DISCORD_SERVER_GUILD_ID as string),
				{ body: commands },
			) as unknown[];

			console.log(`Successfully reloaded ${data.length} application (/) commands.`);
		} catch (error) {
			// And of course, make sure you catch and log any errors!
			console.error(error);
		}
	})();
})

