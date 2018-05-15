const {Command} = require('discord.js-commando');
const Discord = require('discord.js');

module.exports = class ActivityCommand extends Command {
  constructor (client) {
    super(client, {
      name: 'activity',
      aliases: ['presence'],
      group: 'info',
      memberName: 'activity',
      description: 'Displays the activity of a specific user',
      examples: ['activity AinoMinako'],
      guildOnly: true,
      args: [
        {
          key: 'member',
          prompt: 'What user would you like to view the activity of?',
          type: 'member'
        }
      ]
    });
  }

  run (msg, args) {
    const tag = args.member.user.tag;
    const activity = args.member.presence.activity;

    const avatar = args.member.user.displayAvatarURL({format: 'png'});
    const color = args.member.displayHexColor;

    // console.log(activityType + ": " + activityName)
    if (activity === null) {
      // console.log(args.member.presence.activity.name)
      console.log(args.member.presence);
      const activityEmbed = new Discord.MessageEmbed()
        .setAuthor(tag)
        .setColor(color)
        .setThumbnail(avatar)
        .addField('Activity', 'Nothing');

      return msg.channel.send(activityEmbed);
    }
    const activityName = activity.name;
    const activityType = activity.type;
    // console.log(args.member.presence.activity.name)

    console.log(args.member.presence);
    const activityEmbed = new Discord.MessageEmbed()
      .setAuthor(tag)
      .setColor(color)
      .setThumbnail(avatar)
      .addField('Activity', `${activityType}: ${activityName}`, true);

    return msg.channel.send(activityEmbed);
  }
};