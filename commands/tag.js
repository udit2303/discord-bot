const tags = require("../model/tag");
module.exports = {
  name:"tag",
  description:"Create a tag",
  async execute(message, args, client){
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(`You cannot run this command. You need the permission \`MANAGE_MESSAGES\` to run this command. `);
    if(!args[0]) return message.channel.send(`You did not specify any name for the tag.`);
    if(!args[1]) return message.channel.send(`You did not specify any content.`);
    
    tags.findOne({Guild: message.guild.id, Command: args[0]}, async(err, data) => {
      if(err) throw err;
      if(data){
        data.Content = args.slice(1).join(" ")
        data.save();
      }else if(!data){
        let newData = new tags({
          Guild: message.guild.id,
          Tag: args[0],
          Content : args.slice(1).join(" ")
        });
        newData.save();
        return message.channel.send(`Successfully edited the tag \`${args[0]}\`  `)
      }
    });

  }
}