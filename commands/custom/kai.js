const { Command } = require('discord.js-commando');
const Discord = require('discord.js');

module.exports = class KaiCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'kai',
            group: 'custom',
            memberName: 'kai',
            description: 'Sends an image that says to not bulli Kai',
            examples: ['kai']
        });
    }

    run(msg) {
        msg.channel.send({
            files: [
                "./images/remu/dontbulli.jpg"
            ]
        })
    }
};