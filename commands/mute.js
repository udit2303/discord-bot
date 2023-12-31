const ms = require('ms');
module.exports ={
    name:"mute",
    description:"Mutes a member",
    async execute(message, args, client){
      if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(`You don't have the permission\`MANAGE_MESSAGES\` permission for this command.`)
    const role = message.guild.roles.cache.find(r=> r.name == 'Muted');
    if(!role) return message.channel.send ('It seems like you have no \'Muted\' role setup, please create one then try again.');
     let user = message.mentions.members.first();
    if(!user) return message.channel.send('You didn\'t specify a person to mute.');
    if(!args[1]) return message.channel.send('You need to specify time for the mute.');
    if(!args[1].endsWith("d")&&!args[1].endsWith("h")&&!args[1].endsWith("m")) return message.channel.send('You didn\'t use the correct format. Use m(minutes), h(hour), d(day).');
    if(isNaN(args[1][0])) return message.channel.send('This is not a number, please use the correct format.');
    try{ 
    user.roles.add(role);
    message.channel.send(`Muted ${user}.`);
    setTimeout(()=> {
        user.roles.remove(role);
        message.channel.send(`Unmuted ${user}`)
       } , ms(args[1]));
    } catch(err){
        message.channel.send(err);
        console.log(err);
    }
}
}