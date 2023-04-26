import fs from "fs";
import path from "path";

export class EventsReader {
	public static async getEvents(): Promise<any[]> {
		const eventsPath = path.join(process.env.ROOT_DIR as string, '/events');
		const eventFiles = fs.readdirSync(eventsPath).filter((file: string) => file.endsWith('.ts'));

		const events: any[] = [];

		for (const file of eventFiles) {
			const filePath = path.join(eventsPath, file);
			await import(filePath).then(event => {
				events.push(event);
			})
		}

		return events;
	}
}