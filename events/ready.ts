import { Events, Client } from "discord.js";
import { AppEvent } from "../src/interfaces/AppEvent";

export const event: AppEvent = {
	name: Events.ClientReady,
	once: true,
	execute: (client: Client) => {
		if (client.user) {
			console.log(`Ready! Logged in as ${client.user.tag}`);
		}
	}
}