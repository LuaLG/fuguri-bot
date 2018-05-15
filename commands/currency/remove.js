const {Command} = require('discord.js-commando');
const money = require('discord-money');

module.exports = class RemoveCommand extends Command {
  constructor (client) {
    super(client, {
      name: 'remove',
      group: 'currency',
      aliases: ['rem'],
      memberName: 'remove',
      description: 'Removes orbs from a user',
      examples: ['remove'],
      ownerOnly: true,
      args: [
        {
          key: 'member',
          prompt: 'What member do you want to remove orbs from?',
          type: 'member'
        }
      ]
    });
  }

  has (msg) {
    if (!this.client.isOwner(msg.author)) {
      return 'Only the bot owner(s) may use this command.'; 
    }
    
    return true;
  }

  run (msg, args) {
    if (this.client.isOwner(msg.author)) {
      money.updateBal(args.member.user.id, -55 /* Value */).then((i) => { // money.updateBal grabs the (userID, value) value being how much you want to add, and puts it into 'i'.
        msg.channel.send(`**You removed 55 Orbs!**\n**New Balance:** ${i.money} orbs!`);
      });
    } else {
      msg.reply('Only the bot owner(s) may use this command.');
    }
  }
};