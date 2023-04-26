import fs from "fs";
import path from "path";
import { AppEvent } from "../interfaces/AppEvent";

export class EventsReader {
	public static async getEvents(): Promise<AppEvent[]> {
		const eventsPath = path.join(process.env.ROOT_DIR as string, '/events');
		const eventFiles = fs.readdirSync(eventsPath).filter((file: string) => file.endsWith('.ts'));

		const events: AppEvent[] = [];

		for (const file of eventFiles) {
			const filePath = path.join(eventsPath, file);
			await import(filePath).then((data: { event: AppEvent }) => {
				events.push(data.event);
			})
		}

		return events;
	}
}