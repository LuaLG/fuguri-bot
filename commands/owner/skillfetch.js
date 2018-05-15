const {Command} = require('discord.js-commando');
const jsonfile = require('jsonfile');
const path = require('path');
const stats = require('fire-emblem-heroes-stats');

module.exports = class HeroFetchCommand extends Command {
  constructor (client) {
    super(client, {
      name: 'skillfetch',
      aliases: ['sfetch'],
      group: 'owner',
      memberName: 'skillfetch',
      description: 'Fetches a list of all Fire Emblem Heroes skills',
      examples: ['skillfetch'],
      guildOnly: false,
      ownerOnly: true
    });
  }

  async run (msg) {
    try {
      const skills = await stats.getAllSkills();

      jsonfile.writeFileSync(path.join(__dirname, '../../data/skills.json'), skills, {spaces: 2});

      return msg.embed({description: 'All skills written to file'});
    } catch (err) {
      return console.error(err);
    }
  }
};