const {Command} = require('discord.js-commando');
const {MessageEmbed} = require('discord.js');

module.exports = class EmojiCommand extends Command {
  constructor (client) {
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

  run (msg) {
    // create emoji list
    const emojiList = msg.guild.emojis.map(e => e.toString()).join(' '); // this is wrong btw. It does not actually give the actual emojis
    // create embed to display emoji list
    const embedEmoji = new MessageEmbed();

    embedEmoji
      .setColor('#E91E63')
      .setDescription(emojiList);

    // send the emoji list as a reply
    // msg.embed(embedEmoji);

    return msg.embed(embedEmoji);
  }
};