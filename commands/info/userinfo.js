const {Command} = require('discord.js-commando');
const Discord = require('discord.js');
const moment = require('moment');

module.exports = class UserInformationCommand extends Command {
  constructor (client) {
    super(client, {
      name: 'userinfo',
      memberName: 'userinfo',
      group: 'info',
      aliases: ['user', 'info', 'uinfo'],
      description: 'Displays information about a specific user.',
      examples: ['userinfo AinoMinako'],
      guildOnly: true,
      throttling: {
        usages: 2,
        duration: 3
      },
      args: [
        {
          key: 'member',
          prompt: 'What user would you like get information on?',
          type: 'member'
        }
      ]
    });
  }

  arrayClean (deleteValue, array) {
    for (let val in array) {
      if (array[val] === deleteValue) {
        array.splice(val, 1);
        val -= 1;
      }
    }
  
    return array;
  }

  run (msg, args) {
    // msg.channel.send("reply");

    // console.log(args.member.presence.activity.name)
    const tag = args.member.user.tag;
    const username = args.member.user.username;
    const roles = args.member.roles.size > 1 ? this.arrayClean(null, args.member.roles.map((r) => {
      if (r.name !== '@everyone') {
        return r.name;
      }

      return null;
    })).join(' | ') : 'None';
    let joinedDiscord = null,
      joinedServer = null;
    const nickname = args.member.nickname;
    const activity = args.member.presence.activity;
    const color = args.member.displayHexColor;
    const avatar = args.member.user.displayAvatarURL({format: 'png'});

    joinedDiscord = moment(args.member.user.createdAt).format('dddd, MMMM Do YYYY, h:mm:ss a');
    joinedServer = moment(args.member.joinedAt).format('dddd, MMMM Do YYYY, h:mm:ss a');

    console.log(roles);
    console.log(tag);
    console.log(username);

    if (activity === null) {
      const uinfoEmbed = new Discord.MessageEmbed()
        .setAuthor(tag)
        .setThumbnail(avatar)
        .setColor(color)
        .addField('Name', username, true)
        .addField('Nickname', nickname ? nickname : 'No Nickname', true)
        .addField('Activity', 'Nothing', true)
        .addField('Roles', roles, true)
        .addField('Joined Discord', joinedDiscord)
        .addField('Joined Server', joinedServer);

      msg.channel.send(uinfoEmbed);
    } else {
      const activityName = args.member.presence.activity.name;
      const activityType = args.member.presence.activity.type;
      const uinfoEmbed = new Discord.MessageEmbed()
        .setAuthor(tag)
        .setThumbnail(avatar)
        .setColor(color)
        .addField('Name', username, true)
        .addField('Nickname', nickname ? nickname : 'No Nickname', true)
        .addField('Activity', `${activityType}: ${activityName}`, true)
        .addField('Roles', roles, true)
        .addField('Joined Discord', joinedDiscord)
        .addField('Joined Server', joinedServer);

      msg.channel.send(uinfoEmbed);
    }

    /* const vals = {
          'member': args.member,
          'user': args.member.user
        };
        //console.log(vals.user.tag)

        var tag = vals.user.tag
        var username = vals.user.username
        var roles = vals.member.roles.size > 1 ? vals.member.roles.map(r => r.name).slice(1).join(' | ') : 'None';
        var joinedDiscord, joinedServer
        joinedDiscord = moment(vals.user.createdAt).format("dddd, MMMM Do YYYY, h:mm:ss a")
        joinedServer = moment(vals.member.joinedAt).format("dddd, MMMM Do YYYY, h:mm:ss a")

        //var activitytype = vals.member.presence.game.name
        //var activity;
        //console.log(activity)

        /*if (args.member.presence.game.name === null) {
          activity = "Nothing"
        } else {
          activity = activitytype
        }

        //console.log(activity)
        console.log(args.member.presence)

        //const member = args.member || msg.member;
		    //const { user } = member;*/


    // console.log(vals.user.presence.activity.type)
  }
};