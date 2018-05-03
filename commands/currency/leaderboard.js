const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const moment = require('moment');
var fs = require('fs');
const path = require('path');
const money = require('discord-money');
const sqlite = require('sqlite');
var Database = require('better-sqlite3');
var db = new Database(path.join(__dirname, '../../userMoney.sqlite'));

//let balance = JSON.parse(fs.readFileSync(path.join(__dirname(), '../OffTheHookCommando/data/balances.json'), 'utf8'));

module.exports = class BalanceCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'leaderboard',
            group: 'currency',
            aliases: ['lb'],
            memberName: 'leaderboard',
            description: 'Displays the top 5 leaders in orb amounts for that specific server',
            examples: ['leaderboard']
        });
    }

    run(msg) {
        //let balance = JSON.parse(fs.readFileSync(path.join(__dirname, '../../data/balances.json'), "utf8"));
        //let orbs = JSON.parse(fs.readFileSync(path.join(__dirname, '../../data/orbs.json'), "utf8"));
        //var number1, number2, number3, number4, number5;
        //var largestNumber = [];
        //const orbCount = sqlite.open(path.join(__dirname, '../../userMoney.sqlite3'));
        //const query = orbCount.prepare(`SELECT * FROM "${money}" ORDER BY money DESC LIMIT 5;`)

        //console.log(query)
        //427647120149839887
        /*const orbCount = sqlite.open(path.join(__dirname, '../../userMoney.sqlite')).then(db =>
            db.get('SELECT * FROM moneyset WHERE money > 0 ORDER BY money DESC')
        ); */

        /*var serverIDQuery = db.prepare(`SELECT * FROM moneyset WHERE serverID="373826006651240450"`).all();
        console.log(serverIDQuery);*/
        
        var query = db.prepare(`SELECT * FROM moneyset WHERE serverID="${msg.guild.id}" ORDER BY money DESC LIMIT 5`).all();
       
        //console.log(query.userID, query.money, query.lastDaily, query.serverID);
        const lbEmbed = new Discord.MessageEmbed()
            .setTitle("Top 5 Orb Amounts")
            .setColor(msg.member.displayHexColor)
            .setThumbnail('https://cdn.discordapp.com/attachments/373832853353398274/435915393438318602/Orb.png')

        if (query) {
            for (const player in query) {
              lbEmbed.addField(`#${parseInt(player, 10) + 1} ${msg.guild.members.get(query[player].userID).displayName}`, `Orbs: ${query[player].money}`);
            }
            return msg.channel.send(lbEmbed);
          }
        
        //console.log(query);

        //var array = [];
        //array.push(balance[msg.author.id].orbs.money);
        //console.log(balance[msg.author.id].length);
        /*for (var i = 0; i < balance.length; i++) {

        }*/
        //console.log(array);

        //console.log(balance[msg.author.id].orbs.money);

        //var num = [4,5,1,3];
        //console.log(Math.max.apply(null, num)); // logs 5
        
    }
};