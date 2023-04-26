import { ClientEvents } from "discord.js";

export interface AppEvent {
	name: keyof ClientEvents,
	once: boolean,
	execute: Function,
}