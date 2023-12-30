const { MessageEmbed } = require("discord.js-light");
const { SERVER_NAME } = require("../config1.json");
module.exports = {
  name: "help",
  aliases: ["h"],
  description: "Display all commands and descriptions",
  execute(message) {
    let commands = message.client.commands.array();

    let helpEmbed = new MessageEmbed()
      .setTitle(`Multipurpose+ Help`)
      .setDescription("List of all commands is available at the [website](https://music.udit.gq/commands 'Also check https://udit.gq').")
      .setColor("#F8AA2A")
    helpEmbed.setTimestamp();

    return message.channel.send(helpEmbed).catch(console.error);
  }
};
