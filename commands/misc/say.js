const {Command} = require('discord.js-commando');

module.exports = class SayCommand extends Command {
  constructor (client) {
    super(client, {
      name: 'say',
      aliases: ['copycat', 'repeat', 'echo', 'parrot'],
      group: 'misc',
      memberName: 'say',
      description: 'Replies with the text you provide.',
      examples: ['say Hi there!'],
      throttling: {
        usages: 2,
        duration: 10
      },
      args: [
        {
          key: 'text',
          prompt: 'What text would you like the bot to say?',
          type: 'string',
          validate: (rep, msg) => {
            if (msg.content.toLowerCase().includes('@here') ||
            msg.content.toLowerCase().includes('@everyone') ||
            msg.cleanContent.toLowerCase().includes('@here') ||
            msg.cleanContent.toLowerCase().includes('@everyone')) {
              if (msg.deletable) {
                msg.delete();
              }
          
              return 'You cannot make me mention `@here` or `@everyone`! Would you like me to say anything else?';
            }

            return true;
          }
        }
      ]
    });
  }

  run (msg, {text}) {
    const saydata = {
      memberHexColor: msg.member.displayHexColor,
      commandPrefix: msg.guild.commandPrefix,
      authorTag: msg.author.tag,
      authorID: msg.author.id,
      avatarURL: msg.author.displayAvatarURL({format: 'png'}),
      messageDate: msg.createdAt,
      argString: msg.argString.slice(1)
    };

    msg.guild.settings.set('saydata', saydata);

    if (msg.deletable) {
      msg.delete();
    }

    return msg.say(text);
  }
};