const db = require('quick.db');
module.exports = {
  name:"xpset",
  description:"Sets the XP settings for your server",
  async execute(message, args, client){
    try{
    if(!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send(`You cannot run this command.`);
    if(!args[0]) return message.channel.send(`Inavlid arguements! Required 'Enable' or 'Disable'`);
    if(args[0].toLowerCase() == 'enable'){
      db.set(`xp_enabled_${message.guild.id}`, true);
      return message.channel.send(`Enabled XP for your server`);
    }
    else if (args[0].toLowerCase() == 'disable'){
      db.set(`xp_enabled_${message.guild.id}`, false);
      return message.channel.send(`Disabled XP for your server`);
    }
    } catch(e){
      return  message.channel.send(`I am unable to get permissions for this server. ${e}`)
    }
  }
}