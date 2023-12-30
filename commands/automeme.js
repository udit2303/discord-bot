require("dotenv").config();
module.exports = {
  name:"automeme",
  description:"Sets automeme for your server",
  async execute(message, args, client, db){
    if(!message.member.hasPermission('MANAGE_CHANNELS')) return message.channel.send('You cannot run this command.');
    let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);
    if(!channel) return message.channel.send(`No channel specified.`)
    await db.push(`automemes`, channel.id);
    message.channel.send(`Awesome, now I'll be posting memes in ${channel} in every 30minutes`);  
  }
}