# Panel-bot

Panel-bot is a [Discord](https://discord.com/) bot, made with [discord.js](https://discord.js.org/). These docs are temporary

## Updates

Read `UPDATES.md`

## Installation

Install [nodejs](https://nodejs.org/en/download/).

Create a Discord bot application on the [Discord portal](https://discord.com/developers/applications).

Rename `config.example.json` to `config.json`, and fill in the secrets.

Run `npm i` to install the dependencies.

## Usage

Run `npm start` to start panel-bot.

To deploy all slash commands globally, run the text command `<prefix>gdeploy`, to deploy them to a specific guild, fill in the configs "testguild" requirement with the guild you want to add the commands to, then run `<prefix>tdeploy`

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)