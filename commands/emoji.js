module.exports = {
  name:"emoji",
  description:"Add an emoji to the server",
  async execute(message, args, client){
    if(!message.member.hasPermission('MANAGE_CHANNELS')) return message.channel.send("You cannot run this command.");
    if(!args[0]) return message.channel.send("Usage: .emoji <image link> <emoji name>");
    if(!args[1]) return message.channel.send("Usage: .emoji <image link> <emoji name>");
    try { 
     const emote = await message.guild.emojis.create(args[0], args[1]);
     message.channel.send(`Created ${emote}, \`${emote }\``)
    } catch(e){
      message.channel.send(`Ran into an error: ${e}`)
    }
  }
}