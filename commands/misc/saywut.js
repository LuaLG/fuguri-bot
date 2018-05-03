const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const moment = require('moment');

module.exports = class SayWutCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'saywut',
            aliases: ['saywat'],
            group: 'misc',
            memberName: 'saywut',
            description: 'Shows who used the say command last',
            examples: ['saywut'],
            throttling: {
                usages: 2,
                duration: 10
            }
        });
    }

    run(msg) {
        // gets the data from the provider database
        const saycontents = this.client.provider.get(msg.guild.id, 'saydata', null)
        //console.log(saycontents)
        
        // if the contents exist, embed the message
        if(saycontents)
        {
            const wutEmbed = new Discord.MessageEmbed()
            .setColor(saycontents.memberHexColor)
            .setTitle('Wrote')
            .setAuthor(`${saycontents.authorTag}`, saycontents.avatarURL)
            .setFooter(`Last ${saycontents.commandPrefix}say message author | ${moment(saycontents.messageDate).format('dddd, MMMM Do YYYY, h:mm:ss a')}`,  this.client.user.avatarURL)
            .setDescription(saycontents.argString);
        return msg.channel.send(wutEmbed);
        } else {
            // if the contents don't exist, say that message can't be found
            message.reply("Can't find the message")
        }

        // delete the original message
        msg.delete();
    }
};