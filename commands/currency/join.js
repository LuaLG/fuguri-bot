const { Command } = require('discord.js-commando');
const money = require('discord-money');
var fs = require('fs');
const Discord = require('discord.js');
const path = require('path');

module.exports = class JoinCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'join',
            group: 'currency',
            aliases: ['makeaccount', 'createaccount'],
            memberName: 'join',
            description: 'Makes an account to hold your Orb balance',
            examples: ['join']
        });
    }

    run(msg) {
        let balance = JSON.parse(fs.readFileSync(path.join(__dirname, '../../data/balances.json'), "utf8"));
        //let orbs = JSON.parse(fs.readFileSync(path.join(__dirname, '../../data/orbs.json'), "utf8"));

        /*if (fs.existsSync(path.join(__dirname, '../../data/balances.json'))) {
            // Do something
            console.log('file exists');
            
        }*/
        //console.log(path.join(__dirname, '../../data/balances.json'));
        if(!balance[msg.author.id]) {
            money.updateBal(msg.author.id, 200 /* Value */ ).then((i) => { // money.updateBal grabs the (userID, value) value being how much you want to add, and puts it into 'i'.
            
                balance[msg.author.id] = {
                   'orbs': i
                }

                fs.writeFile(path.join(__dirname, '../../data/balances.json'), JSON.stringify(balance, null, 4), (err) => {
                    if (err) console.error(err)
                });

                msg.channel.send("You've been added to the database!");
                const orbEmbed = new Discord.MessageEmbed()
                    .setColor(msg.member.displayHexColor)
                    .setThumbnail('https://cdn.discordapp.com/attachments/373832853353398274/435915393438318602/Orb.png')
                    .setAuthor(msg.author.tag, msg.author.avatarURL)
                    .addBlankField(true)
                    .addField("Orb Balance", `${i.money}`);
                return msg.channel.send(orbEmbed);
                    
            })
        } else {
            msg.reply(`You've already added orbs to your balance! Use the ${msg.guild.commandPrefix}balance command to see how many orbs you have!`);
        }    
    }
};