const db = require('quick.db');
const Discord = require('discord.js-light');

module.exports = {
    name:"bal",
    description:"Economy",
    async execute(message, args, client){
        let user = message.mentions.users.first() || await client.users.fetch(args[0]).catch(e => null)|| message.author;
        let bal = await db.fetch(`money_${message.guild.id}_${user.id}`);
        if(bal === null) bal = 0;
        let embed = new Discord.MessageEmbed()
        .setTitle(`Balance`)
        .setColor(`BLUE`)
        .setDescription(`${user} currently has $${bal}.`);
        message.channel.send(embed);
    }
}