import { Client, GatewayIntentBits, Events, RepliableInteraction } from "discord.js";
import { CommandsReader } from "./CommandsReader";
import { EventsReader } from "./EventsReader";

export class ClientHandler {
	protected client: Client;

	protected commands: Map<string, any>;
	protected events: any[];

	public constructor() {
		this.client = new Client(
			{ intents: [GatewayIntentBits.Guilds] }
		);

		this.events = EventsReader.getEvents();

		this.events.forEach(event => {
			if (event.once) {
				this.client.once(event.name, (...args) => event.execute(...args));
			} else {
				this.client.on(event.name, (...args) => event.execute(...args));
			}
		})

		this.commands = CommandsReader.getCommands();

		this.client.on(Events.InteractionCreate, interaction => {
			if (!interaction.isChatInputCommand()) return;
			interaction.reply("Saluuut")
		});

		this.client.login(process.env.DISCORD_TOKEN)
	}
}