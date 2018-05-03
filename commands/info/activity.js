const { Command } = require('discord.js-commando');
const Discord = require('discord.js')

module.exports = class ActivityCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'activity',
            aliases: ['presence'],
            group: 'info',
            memberName: 'activity',
            description: 'Displays information about a certain user',
            examples: ['activity AinoMinako'],
            guildOnly: true,
            args: [
              {
                'key': 'member',
                'prompt': 'What user would you like to view the activity of?',
                'type': 'member'
              }
            ]
        });
    }

    run(msg, args) {
        var tag = args.member.user.tag;
        var activity = args.member.presence.activity;
        
        var avatar = args.member.user.displayAvatarURL({ format: 'png' });
        var color = args.member.displayHexColor;

        //console.log(activityType + ": " + activityName)
        if(activity === null) {
            //console.log(args.member.presence.activity.name)
            console.log(args.member.presence)
            const activityEmbed = new Discord.MessageEmbed()
                .setAuthor(tag)
                .setColor(color)
                .setThumbnail(avatar)
		        .addField('Activity', "Nothing");
                msg.channel.send(activityEmbed);
        } else {
            var activityName = activity.name;
            var activityType = activity.type;
            //console.log(args.member.presence.activity.name)
            console.log(args.member.presence)
            const activityEmbed = new Discord.MessageEmbed()
                .setAuthor(tag)
                .setColor(color)
                .setThumbnail(avatar)
		        .addField('Activity', activityType + ": " + activityName, true);
            msg.channel.send(activityEmbed);
        }
            
    }  
};