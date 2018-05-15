const {Command} = require('discord.js-commando');
const money = require('discord-money');
const jsonfile = require('jsonfile');
const path = require('path');
const moment = require('moment');
const balance = jsonfile.readFileSync(path.join(__dirname, '../../data/balances.json'));

module.exports = class DailyCommand extends Command {
  constructor (client) {
    super(client, {
      name: 'daily',
      group: 'currency',
      aliases: ['login', 'day'],
      memberName: 'daily',
      description: 'Receive your daily orb bonus!',
      examples: ['daily'],
      throttling: {
        usages: 1,
        duration: 3
      }
    });
  }

  run (msg) {
    const todaysDate = moment().format('L'); // moment().unix();
    // var msgdate = msg.createdTimestamp;
    let lastDaily, gotDaily, nextDaily;

    gotDaily = Date.now() + 86400000; // + 86400000
    // gotDailyAt = moment(gotDaily).format('L')
    nextDaily = moment(gotDaily).fromNow();
    lastDaily = balance[msg.author.id].orbs.lastDaily;
    // console.log(gotDaily);
    // console.log(nextDaily);

    if (Date.now() < lastDaily) {
      // If the user already obtained the daily orbs
      msg.channel.send(`Sorry, but you are not due to get your daily yet! Please try again ${nextDaily}.`);

    } else if (balance[msg.author.id]) {
      // set the date the user last obtained the daily orbs
      balance[msg.author.id].orbs.lastDaily = gotDaily;

      // update the user's balance
      money.updateBal(msg.author.id, 20).then(() => {
        msg.channel.send('You received your daily log-in bonus of **20 orbs!**');
      });

      // write the info to the json

      jsonfile.writeFileSync(path.join(__dirname, '../../data/balances.json'), balance, {spaces: 4});
    } else {
      msg.reply(`You aren't in the database! Please use the ${msg.guild.commandPrefix}join to get yourself entered.`);
    }
  }
};