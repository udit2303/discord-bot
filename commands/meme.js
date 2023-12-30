const randomPuppy = require("random-puppy");
const Discord = require("discord.js-light");
const fetch = require('node-fetch');
require('dotenv').config()
module.exports = {
    name: "meme",
    description: "Posts a meme",
    async execute(message) {
       const response = await fetch(`http://api.snowflakedev.cf:9019/api/meme` , {
     headers:{
       "authorization" : process.env.API
     }
   })
        const json = await response.json();
        const meme = {
          title: json.title,
          img: json.url,
          link: json.link,
          subreddit: json.subreddit
        }
        const memeembed = new Discord.MessageEmbed()
        .setTitle(`${meme.title}`)
        .setImage(meme.img)
        .setColor('RANDOM')
        .setURL(meme.link);
        return message.channel.send(memeembed).catch(console.error);
    }
}