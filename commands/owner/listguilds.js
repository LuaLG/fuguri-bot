const { Command } = require('discord.js-commando');

module.exports = class ListGuildsCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'listguilds',
            aliases: ['list', 'guilds'],
            group: 'owner',
            memberName: 'listguilds',
            description: 'Retrieves the number of guilds the bot is in and the list of the guilds',
            examples: ['listguilds'],
            guildOnly: true,
            userPermissions: ['ADMINISTRATOR'],
            /*args: [
                {
                    key: 'invite',
                    prompt: 'What text would you like the bot to say?',
                    type: 'invite'
                }
            ]*/
        });
    }

    has(msg) {
        if (!this.client.isOwner(msg.author)) return 'Only the bot owner(s) may use this command.';
        return true;
    }

    run(msg) {
        if (this.client.isOwner(msg.author)) {
            msg.channel.send(`\`\`\`The current guild count: ${this.client.guilds.size} \n\n**Guild list:**\n${this.client.guilds.map(m => m.name).join('\n')}\`\`\``, {'split': true})
        } else {
            msg.reply('Only the bot owner(s) may use this command.');
        }
    }
};