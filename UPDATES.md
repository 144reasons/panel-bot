# Updates

## 1.0.1

- Added Message command handler
- Added Slash command handler
- Added menu handler
- Sorted out database by switching keyv to JOSH (Keyv doesnt work on node v14-v16 iirc)
- Added options command (s atm)
- Added ping command (s & m)
- Documentation on how to add commands will be added soon™️

## 1.0.2

- Added deploy and tdeploy. WARNING: deploy updates all commands globally, and will take about an hour to properly dish out. tdeploy will update the command in the test guild you specify in the config.

## 1.0.3

- Added eval
- Added setapi and seturl, both slash commands so that you can run them without your api key getting leaked publicly by accident
- Preparing to add a boost for credits system
- Removed deploy and leaving tdeploy but bad, due to complication my brain cannot handle
- Added invites command, which shows you how many people you have invited. This is EXTREMELY basic, due to complications my brain cannot handle. I will add a REAL invite manager once I have refreshed my mind and can actually create it.

## 1.0.4

- Added setbooster in preparation of boost for credits
- Recoded tdeploy so that it deploys all commands with options include (GUILD-SPECIFIC ONLY)
- Readded deploy so that it deploys all commands with options include (GLOBAL)
- Did reconfiguring so that seturl, setapi, and setbooster can be easily deployed without any complications
- Added userinfo
- Fixed options
- Cleanup

## 1.0.5
- j122j noticed security flaw, aka dont use my wrapper for multiple servers! This bot is secure thought...
- Added boost for credits, and all the needed options to configure it!
- Updated discord.js version, so that all commands actually make sense to the api
- Started on multiserver wrapper

## 1.0.6
- Added clearbalance and givecredits
- Added addUserCredits, clearUserBalance and getUsers
- Cleanup

## 1.0.7
- Added help command
- Started working on issue [#2](https://github.com/somerandomcloud/panel-bot/issues/2)
- Added my util file
- Removed dev version of discord.js, added stable branch (v13.1.0)
- Updated README to be more readable and have more info