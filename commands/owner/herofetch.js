const {Command} = require('discord.js-commando');
const jsonfile = require('jsonfile');
const path = require('path');
const stats = require('fire-emblem-heroes-stats');

module.exports = class HeroFetchCommand extends Command {
  constructor (client) {
    super(client, {
      name: 'herofetch',
      aliases: ['hfetch'],
      group: 'owner',
      memberName: 'herofetch',
      description: 'Fetches a list of all Fire Emblem Heroes heroes',
      examples: ['herofetch'],
      guildOnly: false,
      ownerOnly: true
    });
  }

  async run (msg) {
    const description = [];

    try {
      const allHeroes = await stats.getAllHeroes();

      jsonfile.writeFileSync(path.join(__dirname, '../../data/heroes.json'), allHeroes, {spaces: 2});
      console.log('All heroes file written!');
      description.push('All heroes written to file');
    } catch (err) {
      console.error(err);
    }

    try {
      const eventHeroes = await stats.getEventHeroes();

      jsonfile.writeFileSync(path.join(__dirname, '../../data/eventheroes.json'), eventHeroes, {spaces: 2});
      description.push('Event heroes written to file');
    } catch (err) {
      console.error(err);
    }

    try {
      const releasedHeroes = await stats.getReleasedHeroes();

      jsonfile.writeFileSync(path.join(__dirname, '../../data/releasedheroes.json'), releasedHeroes, {spaces: 2});
      description.push('Released heroes written to file');
    } catch (err) {
      console.error(err);
    }

    return msg.embed({description: description.join('\n')});
  }
};