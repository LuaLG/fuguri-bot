const { Command } = require('discord.js-commando');

module.exports = class SayCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'say',
            aliases: ['copycat', 'repeat', 'echo', 'parrot'],
            group: 'misc',
            memberName: 'say',
            description: 'Replies with the text you provide.',
            examples: ['say Hi there!'],
            throttling: {
                usages: 2,
                duration: 10
            },
            args: [
                {
                    key: 'text',
                    prompt: 'What text would you like the bot to say?',
                    type: 'string'
                }
            ]
        });
    }

    run(msg, { text }) {
         const saydata = {
            'memberHexColor': msg.member.displayHexColor,
            'commandPrefix': msg.guild.commandPrefix,
            'authorTag': msg.author.tag,
            'authorID': msg.author.id,
            'avatarURL': msg.author.avatarURL,
            'messageDate': msg.createdAt,
            'argString': msg.argString.slice(1)
        };

        this.client.provider.set(msg.guild.id, 'saydata', saydata);

        msg.delete();

        return msg.channel.send(text);
    }
};