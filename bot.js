const  Commando = require('discord.js-commando');
const path = require('path');
const sqlite = require('sqlite');
const token = require('./data/settings.json').token;
const activities = require('./data/activities.json');


const client = new Commando.Client ({
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
});

client.setProvider(
  sqlite.open(path.join(__dirname, 'settings.sqlite3')).then(db => new Commando.SQLiteProvider(db))
 ).catch(console.error);

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

client.login(token);
