const path = require('path');

require('dotenv').config({path: path.join(__dirname, 'data/.env')});

const Database = require('better-sqlite3'),
  activities = require(path.join(__dirname, 'data/activities.json')),
  fs = require('fs'),
  balance = JSON.parse(fs.readFileSync(path.join(__dirname, 'data/balances.json'), 'utf8')),
  money = require('discord-money'),
  xp = JSON.parse(fs.readFileSync(path.join(__dirname, 'data/xp.json'), 'utf8')),
  {
    oneLine,
    stripIndents
  } = require('common-tags'),
  {
    Client,
    FriendlyError,
    SyncSQLiteProvider
  } = require('discord.js-commando');

const client = new Client({
  owner: ['147800635046232064', '112001393140723712'],
  commandPrefix: process.env.prefix,
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

client.on('message', (msg) => {
  // console.log(msg.channel.id);

  if (balance[msg.author.id] && !msg.author.bot) {


    //  xp is a variable obtained from reading the xp json
    //  !xp[msg.author.id] checks if the message's author exists in the json
    //  if it doesn't exist, make new data to write

    if (!xp[msg.author.id]) {
      xp[msg.author.id] = {
        xp: 0,
        level: 0
      };
    }

    // max is the maxinum number of XP to generate
    const max = 13;
    // min is the minimum number of XP to generate
    const min = 10;

    // xpAdd generates a random number between max and min
    const xpAdd = Math.floor(Math.random() * (max - min + 1) + min);

    //   console.log outputs what the xpAdd is for my testing purposes
    //   console.log(xpAdd);

    // this addes the randomly generated xpAdd to the user's current XP
    xp[msg.author.id].xp = xp[msg.author.id].xp + xpAdd;
    // this gets the user's current XP
    const curxp = xp[msg.author.id].xp;
    // this gets the user's current level
    const curlvl = xp[msg.author.id].level;
    // this sets the next level
    const nxtLvl = xp[msg.author.id].level * 300;

    // if the next level is less than the user's xp, the user levels up and obtains 15 orbs
    if (nxtLvl <= curxp) {
      xp[msg.author.id].level = curlvl + 1;
      money.updateBal(msg.author.id, 15).then((i) => {
        console.log(`${msg.author.tag} gained 15 orbs. Their total is now ${i.money}`);
      });
    }

    //   this outputs the curent level to the console
    //   console.log(`level is ${xp[msg.author.id].level}`)

    // this writes the data back to the json

    try {
      return fs.writeFileSync(path.join(__dirname, 'data/xp.json'), JSON.stringify(xp, null, 4));
    } catch (err) {
      return console.error(err);
    }
  }

  return null;
});

const db = new Database(path.join(__dirname, 'settings.sqlite3'));

client.setProvider(
  new SyncSQLiteProvider(db)
);


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
    ['splatoon2 modes', 'Commands for Splatoon 2\'s modes'],
    ['splatoon2 profile', 'Splatoon 2 Profile Commands'],
    ['summoning', 'Summoning Commands'],
    ['test', 'Test Commands']
  ])
  .registerDefaultGroups()
  .registerDefaultCommands({
    help: true,
    prefix: true,
    ping: true,
    eval_: true,
    commandState: true
  })
  .registerCommandsIn(path.join(__dirname, 'commands'));

client.on('error', (e) => {
  console.error(e);
});

client.on('warn', () => {
  console.warn;
});

client.on('disconnect', () => {
  console.warn('Disconnected');
});

client.on('reconnecting', () => {
  console.warn('Reconnecting...');
});

client.on('commandBlocked', (msg, reason) => {
  console.log(oneLine`
  Command ${msg.command ? `${msg.command.groupID}:${msg.command.memberName}` : ''}
  blocked; ${reason}`);
});

client.on('commandError', (cmd, err) => {
  if (err instanceof FriendlyError) {
    return;
  }
  console.error(`Error in command ${cmd.groupID}:${cmd.memberName}`, err);
});

client.login(process.env.token);