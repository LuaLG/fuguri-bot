const { Command } = require('discord.js-commando');
const Discord = require('discord.js');

module.exports = class KaiCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'kai',
            aliases: ['thunder'],
            group: 'custom',
            memberName: 'kai',
            description: 'Sends an image that says to not bulli Kai',
            examples: ['kai']
        });
    }

    run(msg) {
        // if (msg.guild.id === 373826006651240450) else "You can't use this command here"
        msg.channel.send({
            files: [
                "./images/remu/dontbulli.jpg"
            ]
        })
    }
};