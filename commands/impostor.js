const Discord = require("discord.js-light");
module.exports = {
  name:"impostor",
  description:"Udit was the impostor...",
  async execute(message, args, client){
    let user = message.mentions.users.first() ||await client.users.fetch(args[0]).catch(e => nu) || message.author;
    let name = user.username
    const embed = new Discord.MessageEmbed()
    .setColor(`YELLOW`)
    .setDescription(`。　　　　•　 　ﾟ　　。 　　.

　　　.　　　 　　.　　　　　。　　 。　. 　

.　　 。　　　　　 ඞ 。 . 　　 • 　　　　•

　　ﾟ　　 ${name}  was The Impostor.　 。　.

　　'　　　 0 Impostor remains 　 　　。

　　ﾟ　　　.　　　. ,　　　　.　 .`);
message.channel.send(embed)
  }
}