const { Command } = require('discord.js-commando');
const Discord = require('discord.js')

module.exports = class EmojiCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'emoji',
            aliases: ['emojis'],
            group: 'info',
            memberName: 'emoji',
            description: 'Displays a list of all of the emoji in the server',
            examples: ['changelog'],
            guildOnly: true
        });
    }

    run(msg) {
        // create emoji list
        const emojiList = msg.guild.emojis.map(e=>e.toString()).join(" ");

        // create embed to display emoji list
        const embedEmoji = new Discord.MessageEmbed()
            .setColor(15277667)
            .addField("Emoji List", emojiList)

        // send the emoji list as a reply
        msg.channel.send(embedEmoji);
    }
};