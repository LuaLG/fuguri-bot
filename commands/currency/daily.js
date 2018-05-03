const { Command } = require('discord.js-commando');
const money = require('discord-money');
var fs = require('fs');
const Discord = require('discord.js');
const path = require('path');
const moment = require('moment');
const balance = JSON.parse(fs.readFileSync(path.join(__dirname, '../../data/balances.json'), "utf8"));

module.exports = class DailyCommand extends Command {
    constructor(client) {
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

    run(msg) {
        var todaysDate = moment().format('L'); //moment().unix();
        //var msgdate = msg.createdTimestamp;
        var lastDaily, gotDaily, nextDaily;
        gotDaily = Date.now() + 86400000; // + 86400000
        //gotDailyAt = moment(gotDaily).format('L')
        nextDaily = moment(gotDaily).fromNow();
        lastDaily = balance[msg.author.id].orbs.lastDaily
        //console.log(gotDaily);
        //console.log(nextDaily);

        if (Date.now() < lastDaily) {
            // If the user already obtained the daily orbs
            msg.channel.send(`Sorry, but you are not due to get your daily yet! Please try again ${nextDaily}.`); 
            return;
        } else {
            if(balance[msg.author.id]) {
                // set the date the user last obtained the daily orbs
                balance[msg.author.id].orbs.lastDaily = gotDaily;
            }

            // update the user's balance
            money.updateBal(msg.author.id, 20).then((i) => {
                msg.channel.send("You received your daily log-in bonus of **20 orbs!**");
            });
            
            // write the info to the json
            fs.writeFile(path.join(__dirname, '../../data/balances.json'), JSON.stringify(balance, null, 4), (err) => {
                if (err) console.error(err)
            });
        }
    }
};