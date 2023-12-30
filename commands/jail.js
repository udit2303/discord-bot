const Canvacord = require('canvacord');
const Discord = require('discord.js-light')
module.exports = {
  name:"jail",
  description:"jail a person",
  async execute(message, args, client){
    let user = message.mentions.users.first() ||await client.users.fetch(args[0]).catch(e => null) || message.author;
    if(!user) return message.channel.send(`Could not find a user.`);
    let avatar = user.displayAvatarURL({dynamic : true, format:'png'});
    let image = await Canvacord.Canvas.jail(avatar);
   let attachment = new Discord.MessageAttachment(image, "jail.png");
    message.channel.send(attachment);

  }
}