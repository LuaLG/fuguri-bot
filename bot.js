const Commando = require('discord.js-commando');
const path = require('path');
const sqlite = require('sqlite');
var fs = require('fs');
const token = require('./data/settings.json').token;
const activities = require('./data/activities.json');
const prefix = require('./data/settings.json').prefix;
const Database = require('better-sqlite3');
var xp =  JSON.parse(fs.readFileSync(path.join(__dirname, './data/xp.json'), "utf8"));
const money = require('discord-money');

const client = new Commando.Client ({
    owner: '147800635046232064',
    commandPrefix: '\\',
    disableEveryone: true,
    unknownCommandResponse: false,
    selfbot: false
});

client.on('ready', () => {
    console.log('Logged in!');
    setInterval(() => {
		const activity = activities[Math.floor(Math.random() * activities.length)];
		client.user.setPresence({
            activity: {
                application: client.user.id,
                name: activity.text,
                type: activity.type
            }
        });
	}, 60000);	
});

client.on('message', msg => {
    
    // if the user is a bot, 
    if(msg.author.bot) return undefined;
    
    //console.log(msg.channel.id);
    
    // max is the maxinum number of XP to generate
    var max = 13;
    // min is the minimum number of XP to generate
    var min = 10;

    // xpAdd generates a random number between max and min
    let xpAdd = Math.floor(Math.random()*(max-min+1)+min);
    // console.log outputs what the xpAdd is for my testing purposes
    //console.log(xpAdd);

    // xp is a variable obtained from reading the xp json
    // !xp[msg.author.id] checks if the message's author exists in the json
    // if it doesn't exist, make new data to write
    if (!xp[msg.author.id]) {
        xp[msg.author.id] = {
            'xp': 0,
            'level': 0
        };
    }

    // this addes the randomly generated xpAdd to the user's current XP
    xp[msg.author.id].xp = xp[msg.author.id].xp + xpAdd;
    // this gets the user's current XP
    let curxp = xp[msg.author.id].xp;
    // this gets the user's current level
    let curlvl = xp[msg.author.id].level;
    // this sets the next level
    let nxtLvl = xp[msg.author.id].level * 300;

    // if the next level is less than the user's xp, the user levels up and obtains 15 orbs
    if(nxtLvl <= curxp) {
        xp[msg.author.id].level = curlvl + 1;
        money.updateBal(msg.author.id, 15).then((i) => {
             //console.log(msg.author.tag + ` gained 15 orbs. Their total is now ${i.money}`)
        })
    } 
    // this outputs the curent level to the console
    //console.log(`level is ${xp[msg.author.id].level}`)

    // this writes the data back to the json
    fs.writeFile(path.join(__dirname, './data/xp.json'), JSON.stringify(xp, null, 4), (err) => {
        if(err) {
            console.error(err);
        }
    }) 
})

//const db = new Database(path.join(__dirname, 'settings.sqlite3'));
client.setProvider(
  sqlite.open(path.join(__dirname, 'settings.sqlite3')).then(db => new Commando.SQLiteProvider(db))
 ).catch(console.error);

 /*
this.client.setProvider(
      new SQLiteProvider(db)
    );
 */

client.registry
    .registerDefaultTypes()
    .registerGroups([
        ['currency', 'Currency Commands'],
        ['custom', 'Custom Commands'],
        ['info', 'Random Information Commands'],
        ['misc', 'Misc Commands'],
        ['music', 'Music Commands'],
        ['owner', 'Owner Commands'],
        ['splatoon2 misc', 'Splatoon 2 Miscellaneous Commands'],
        ['splatoon2 profile', 'Splatoon 2 Profile Commands'],
        ['summoning', 'Summoning Commands'],
        ['test', 'Test Commands']
    ])
    .registerDefaultGroups()
    .registerDefaultCommands({
        'help': true,
        'prefix': true,
        'ping': true,
        'eval_': true,
        'commandState': true
      })
    .registerCommandsIn(path.join(__dirname, 'commands'));

client.login(token);
