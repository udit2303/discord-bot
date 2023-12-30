const Discord = require('discord.js-light');
const db = require("quick.db");
module.exports = {
  name:'autorole',
  async execute(message, args, client){
    if(!message.guild.me.hasPermission("MANAGE_ROLES")) return message.channel.send("I do not have the permission \`MANAGE_ROLES\` to use this command.");
    if(!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send("You do not have the permission \`MANAGE_GUILD\` to use this command.");
    if(!args[0]) return message.channel.send("You need to specify autorole set as \`enabled\` or \`disable\`");
    if(args[0].toLowerCase() == 'disable'){
      db.set(`autorole_${message.guild.id}`, [false]);
      return message.channel.send("Disabled Autorole");
    };
    if(!args[1]) return message.channel.send("You need to include a Role ID to set up autorole");
    const role = message.guild.roles.cache.get(args[1]) || message.mentions.roles.first();
    if(!role) return message.channel.send("Invalid Role Provided")
    db.set(`autorole_${message.guild.id}`, [true, role.id]);
    const embed = new Discord.MessageEmbed()
    .setColor("RED")
    .setDescription(`Set Autorole for **${message.guild.name}** to ${role}`);
    return message.channel.send(embed);
  }
}