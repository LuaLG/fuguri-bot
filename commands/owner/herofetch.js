const { Command } = require('discord.js-commando');
const fs = require('fs');
const path = require('path');
var stats = require('fire-emblem-heroes-stats');

module.exports = class HeroFetchCommand extends Command {
    constructor (client) {
        super(client, {
            name: 'herofetch',
            aliases: ['hfetch'],
            group: 'owner',
            memberName: 'herofetch',
            description: 'Fetches a list of all Fire Emblem Heroes heroes',
            examples: ['herofetch'],
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
            fs.writeFileSync(path.join(__dirname, '../../data/heroes.json'), JSON.stringify(await stats.getAllHeroes(), null, 2), 'utf8', function (err) {
                if (err) {
                    return console.log(err);
                }
            }); 
            console.log('All heroes file written!');

            /*fs.writeFileSync(path.join(__dirname, '../../data/eventheroes.json'), JSON.stringify(await stats.getEventHeroes(), null, 2), 'utf8', function (err) {
                if (err) {
                    return console.log(err);
                }
            }); 
            console.log('Event heroes file written!');*/

            fs.writeFileSync(path.join(__dirname, '../../data/releasedheroes.json'), JSON.stringify(await stats.getReleasedHeroes(), null, 2), 'utf8', function (err) {
                if (err) {
                    return console.log(err);
                }
            }); 
            console.log('Released heroes file written!');
        } else {
            msg.reply('Only the bot owner(s) may use this command.');
        }
    }
};