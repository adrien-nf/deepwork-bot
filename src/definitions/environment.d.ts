declare global {
	namespace NodeJS {
		interface ProcessEnv {
			DISCORD_TOKEN: string;
			DISCORD_APP_CLIENT_ID: string;
			DISCORD_SERVER_GUILD_ID: string;
			ROOT_DIR: string;
		}
	}
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export { }