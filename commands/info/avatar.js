const {Command} = require('discord.js-commando');

module.exports = class AvatarCommand extends Command {
  constructor (client) {
    super(client, {
      name: 'avatar',
      memberName: 'avatar',
      group: 'info',
      aliases: ['icon'],
      description: 'Displays the avatar of the entered user',
      examples: ['avatar AinoMinako'],
      guildOnly: true,
      args: [
        {
          key: 'member',
          prompt: 'What user do you want the avatar of?',
          type: 'member'
        }
      ]
    });
  }

  run (msg, {member}) {
    return msg.embed({image: {url: member.user.displayAvatarURL({format: 'png'})}});
  }
};