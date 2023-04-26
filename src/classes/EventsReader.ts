const fs = require('node:fs');
const path = require('node:path');

export class EventsReader {
	public static getEvents(): any[] {
		const eventsPath = path.join(__dirname, '../../events');
		const eventFiles = fs.readdirSync(eventsPath).filter((file: string) => file.endsWith('.ts'));

		const events: Event[] = [];

		for (const file of eventFiles) {
			const filePath = path.join(eventsPath, file);
			const event = require(filePath);
			events.push(event);
		}

		return events;
	}
}