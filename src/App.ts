import { ClientHandler } from "./classes/ClientHandler";

export class App {
	protected static app: App;
	protected clientHandler: ClientHandler;

	protected constructor() {
		this.clientHandler = new ClientHandler();
	}

	public static start() {
		App.getInstance();
	}

	public static getInstance() {
		if (App.app) return App.app;

		App.app = new App();
	}
}