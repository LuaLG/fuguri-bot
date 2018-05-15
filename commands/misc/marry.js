const {Command} = require('discord.js-commando');
const jsonfile = require('jsonfile');
const path = require('path');
const marriages = jsonfile.readFileSync(path.join(__dirname, '../../data/marriages.json'));


module.exports = class MarryCommand extends Command {
  constructor (client) {
    super(client, {
      name: 'marry',
      aliases: ['marriage', 'hitch', 'gethitched'],
      group: 'misc',
      memberName: 'marry',
      description: 'Marries the message author to the user specified',
      examples: ['marry AinoMinako'],
      throttling: {
        usages: 2,
        duration: 10
      },
      args: [
        {
          key: 'member',
          prompt: 'Who do you want to marry?',
          type: 'member'
        }
      ]
    });
  }

  run (msg, args) {
    if (args.member.user.username === msg.author.username) {
      // if the user tries to marry themselves, let them know they can't
      return msg.reply('You can\'t marry yourself, dummy!');
    }
    try {
      // check to see if the message author is already married
      if (!marriages[msg.author.id]) {
        marriages[msg.author.id] = {marriedTo: args.member.user.username};

        // writes the marriages to the json
        jsonfile.writeFileSync(path.join(__dirname, '../../data/marriages.json'), marriages, {spaces: 2});

        // display a message that the user successfully married the other user
        return msg.say(`**${msg.author.username}** is now married to **${args.member.user.username}**! Congrats!`);
      }

      return msg.reply(`You are already married to **${marriages[msg.author.id].marriedTo}**. You can't marry someone else!`);

    } catch (err) {
      return msg.reply(`An error occured: ${err.message}. Try again later!`);
    }

  }
};