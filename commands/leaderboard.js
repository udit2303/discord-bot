const db = require("quick.db");
require("quick.db-prototypes")(db);
const Discord = require('discord.js-light');
module.exports = {
    name: "leaderboard",
    description:"Shows the leaderboard",
    async execute(message, args, client){
        let money = db.startsWith(`money_${message.guild.id}`, {sort: '.data', limit: 10});
        let content ='';
        for(let i = 0; i < money.length; i++){
          let user = await client.users.fetch(money[i].ID.split('_')[2]).catch(e => null);
          content += `**${i + 1}**. ${user} : $${money[i].data} \n`
        }
    const embed = new Discord.MessageEmbed()
    .setTitle(`Leaderboards`)
    .setDescription(content)
    .setColor('ORANGE');
    message.channel.send(embed);
}
}