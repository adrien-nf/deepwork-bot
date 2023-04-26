import { Client, GatewayIntentBits, Events, RepliableInteraction } from "discord.js";
import { CommandsReader } from "./CommandsReader";
import { EventsReader } from "./EventsReader";
import { AppEvent } from "../interfaces/AppEvent";

export class ClientHandler {
	protected client: Client;
	protected commands: Map<string, any>;

	public constructor() {
		this.client = new Client(
			{ intents: [GatewayIntentBits.Guilds] }
		);

		this.commands = CommandsReader.getCommands();

		this.registerEvents();
		this.registerCommands();

		this.client.login(process.env.DISCORD_TOKEN)
	}

	protected async registerEvents() {
		(await EventsReader.getEvents()).forEach((event: AppEvent) => {
			if (event.once) {
				this.client.once(event.name, (...args) => event.execute(...args));
			} else {
				this.client.on(event.name, (...args) => event.execute(...args));
			}
		})
	}

	protected registerCommands() {
		this.client.on(Events.InteractionCreate, async interaction => {
			if (!interaction.isChatInputCommand()) return;

			const command = this.commands.get(interaction.commandName);

			if (!command) {
				console.error(`No command matching ${interaction.commandName} was found.`);
				return;
			}

			try {
				await command.execute(interaction);
			} catch (error) {
				console.error(error);
				if (interaction.replied || interaction.deferred) {
					await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
				} else {
					await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
				}
			}
		});
	}
}