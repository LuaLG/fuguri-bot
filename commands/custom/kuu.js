const { Command } = require('discord.js-commando');
const Discord = require('discord.js');

module.exports = class KuuhakuCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'kuu',
            aliases: ['kuuhaku'],
            group: 'custom',
            memberName: 'kuu',
            description: 'Sends an emoji and a random pic to Kuuhaku',
            examples: ['kuu']
        });
    }

    run(msg) {
        // if (msg.guild.id === 373826006651240450) else "You can't use this command here"
        var imgURLs = ["./images/bestgril/1.jpg", "./images/bestgril/2.jpg", "./images/bestgril/3.jpg", "./images/bestgril/4.jpg", "./images/bestgril/5.jpg", "./images/bestgril/6.jpg", "./images/bestgril/7.jpg", "./images/bestgril/8.jpg", "./images/bestgril/9.jpg", "./images/bestgril/10.jpg", "./images/bestgril/11.jpg", "./images/bestgril/12.jpg", "./images/bestgril/13.jpg", "./images/bestgril/14.jpg"]
        var randomNum = Math.floor(Math.random() * imgURLs.length);

        msg.channel.send("<@134309348632559616> <:KannaPanda:427579873977040908>", {
            files: [
                imgURLs[randomNum]
            ]
        })
    }
};