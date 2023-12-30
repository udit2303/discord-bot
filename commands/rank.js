const canvacord = require("canvacord");
const db = require('quick.db');
const Discord = require('discord.js-light')
module.exports = {
    name:"rank",
    description: "Gives rank of a person",
    async execute(message, args, client){
  try{
      let rank = 0;
        var user = message.mentions.users.first() || await client.users.fetch(args[0]).args(e => null) || message.author;
        var level = db.get(`guild_${message.guild.id}_level_${user.id}`) || 0;
        var currentxp = db.startsWith(`guild_${message.guild.id}_xptotal`, {sort: ".data"})
        let xp = db.get(`guild_${message.guild.id}_xp_${message.author.id}`) || 0;
        var xpNeeded = level * 500 + 500;
        for(var a in currentxp){
          let i = parseInt(a);
          if(currentxp[i].ID.split('_')[3] == user.id){
            rank = i + 1;
          }
          if(i = 0) return message.channel.send(`Well looks like you haven't chatted with anyone.`) && console.log('nope');
        }
        const img = new canvacord.Rank()
            .setUsername(user.username)
            .setDiscriminator(user.discriminator)
            .setStatus(user.presence.status)
            .setCurrentXP(xp)
            .setLevel(level)
            .setRequiredXP(xpNeeded)
            .setRank(rank)
            .setAvatar(user.displayAvatarURL({ format: "png"}));
        img.build().then(data => {
            const attachment = new Discord.MessageAttachment(data, "RankCard.png");
        message.channel.send(attachment);
        })
    }catch(err){
      console.log(err);
    }
    }
}