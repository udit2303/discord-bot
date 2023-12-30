const Discord = require('discord.js-light');
module.exports = {
  name:"invite",
  description: "Generate an invite for the bot",
  async execute(message, args, client){
    const embed = new Discord.MessageEmbed()
    .setTitle(`Invite Links`)
    .setDescription(`**Administrator Permissions**\n         [Click Here](https://discord.com/oauth2/authorize?client_id=752391742770249800&scope=bot&permissions=8) \n \n **Required Permissions** \n                              [Click Here](https://discord.com/oauth2/authorize?client_id=752391742770249800&scope=bot&permissions=1177939905)`)
    return message.channel.send(embed)
  }
}