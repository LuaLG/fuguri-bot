const {Command} = require('discord.js-commando');
const Discord = require('discord.js');
// const moment = require('moment');
const jsonfile = require('jsonfile');
const path = require('path');
const money = require('discord-money');

module.exports = class BalanceCommand extends Command {
  constructor (client) {
    super(client, {
      name: 'balance',
      group: 'currency',
      aliases: ['bal', 'amount'],
      memberName: 'balance',
      description: 'Displays the amount of orbs you have',
      examples: ['balance']
    });
  }

  run (msg) {
    const balance = jsonfile.readFileSync(path.join(__dirname, '../../data/balances.json'));

    if (balance[msg.author.id]) {
      money.fetchBal(msg.author.id).then((i) => { // money.fetchBal grabs the userID, finds it, and puts it into 'i'.

        balance[msg.author.id] = {orbs: i};

        try {
          jsonfile.writeFileSync(path.join(__dirname, '../../data/balances.json'), balance, {spaces: 4});
        } catch (err) {
          console.error(err);
        }

        const orbEmbed = new Discord.MessageEmbed()
          .setColor(msg.member.displayHexColor)
          .setThumbnail('https://cdn.discordapp.com/attachments/373832853353398274/435915393438318602/Orb.png')
          .setAuthor(msg.author.tag, msg.author.avatarURL)
          .addBlankField(true)
          .addField('Orb Balance', `${i.money}`);
        
        return msg.channel.send(orbEmbed);

      });
    } else {
      msg.reply(`You are not in the database! Please use the ${msg.guild.commandPrefix}join command to be added to the database!`);
    }
  }
};