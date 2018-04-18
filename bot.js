const { CommandoClient, SQLiteProvider } = require('discord.js-commando');
const path = require('path');
const sqlite = require('sqlite');
const token = require('./data/settings.json').token;
const prefix = require('./data/settings.json').prefix;
const activities = require('./data/activities.json');


const client = new CommandoClient ({
    owner: '147800635046232064',
    commandPrefix: '\\',
    disableEveryone: true,
    unknownCommandResponse: false
});

client.on('ready', () => {
    console.log('Logged in!');
    client.setInterval(() => {
		const activity = activities[Math.floor(Math.random() * activities.length)];
		client.user.setActivity(activity.text, { type: activity.type });
    }, 60000);
    console.log(prefix);
});

sqlite.open(path.join(__dirname, "settings.sqlite3")).then((db) => {
     client.setProvider(new SQLiteProvider(db));
})

client.registry
    .registerDefaultTypes()
    .registerGroups([
        ['currency', 'Currency Commands'],
        ['owner', 'Owner Commands'],
        ['summoning', 'Summoning Commands'],
        ['test', 'Test Commands']
    ])
    .registerDefaultGroups()
    .registerDefaultCommands()
    .registerCommandsIn(path.join(__dirname, 'commands'));

client.login(token)