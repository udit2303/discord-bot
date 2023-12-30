const Discord = require('discord.js-light');
module.exports = {
  name:"ban",
  description:"Bans a person from the server",
  async execute(message, args, client){
    if(!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send(`You cannot use this command.`);
    let user = message.mentions.members.first() || await client.users.fetch(args[0]).catch(e => null);
    let reason = args.slice(1).join(" ")
    if(!user) return message.channel.send('Cannot find this user.');
      if(!message.guild.me.hasPermission('BAN_MEMBERS')) return message.channel.send(`I cannot ban anyone in this guild.`)
    if(!user.bannable) return message.channel.send(`I cannot ban this person.`);
    if(!reason) return message.channel.send(`You need to specify a reason for banning the person`);

    const ban = new Discord.MessageEmbed()
    .setColor(`RED`)
    .setTitle(`Banned ${user.tag}`)
    .setDescription(`${message.author} banned ${user} for: \n **${reason}**`)
    .setTimestamp();
    message.channel.send(ban);
    const userembed = new Discord.MessageEmbed()
    .setColor(`RED`)
    .setTitle(`You were banned`)
    .setDescription(`You were banned for the reason: ${reason} \n - by ${message.author}`)
    .setTimestamp();
    try{
      user.send(userembed);
    } catch(e){
      message.channel.send(`Could not send ${user} a dm regarding their ban.`);
    } 
    user.ban({reason: `${reason}, Banned by User ID : ${message.author.id}`});
  }
}