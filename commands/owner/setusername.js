const { Command } = require('discord.js-commando');
const prefix = require("../../data/prefix.json");

module.exports = class SetUsernameCommand extends Command {
    constructor (client) {
        super(client, {
            name: 'setusername',
            aliases: ['setun'],
            group: 'owner',
            memberName: 'setusername',
            description: 'Sets the username of the bot.',
            examples: ['setusername'],
            'guildOnly': true,
            'ownerOnly': true,
            userPermissions: ['ADMINISTRATOR']
        });
      }
    
    has(msg) {
        if (!this.client.isOwner(msg.author)) return 'Only the bot owner(s) may use this command.';
        return true;
    }

    async run (msg) {
        if (this.client.isOwner(msg.author)) {
            this.client.user.setUsername('Fuguri')
                .then(user => console.log(`My new username is ${user.username}`))
                .catch(console.error);
        } else {
            msg.reply('Only the bot owner(s) may use this command.');
        }
    }
};