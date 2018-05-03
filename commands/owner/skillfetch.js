const { Command } = require('discord.js-commando');
const fs = require('fs');
const path = require('path');
var stats = require('fire-emblem-heroes-stats');

module.exports = class HeroFetchCommand extends Command {
    constructor (client) {
        super(client, {
            name: 'skillfetch',
            aliases: ['sfetch'],
            group: 'owner',
            memberName: 'skillfetch',
            description: 'Fetches a list of all Fire Emblem Heroes skills',
            examples: ['skillfetch'],
            'guildOnly': false,
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
            //msg.reply('test');
            //console.log(path.join(__dirname, '../../data/heroes.json'));
            fs.writeFileSync(path.join(__dirname, '../../data/skills.json'), JSON.stringify(await stats.getAllSkills(), null, 2), 'utf8', function (err) {
                if (err) {
                    return console.log(err);
                }
            }); 
            console.log('All skills file written!');
        } else {
            msg.reply('Only the bot owner(s) may use this command.');
        }
    }
};