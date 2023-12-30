const passcode = process.env.PASSCODE;
module.exports ={
    name:"kill",
    description:"Restarts the bot",
    async execute (message, args,  client){
        if(!args[0]) return;
        if (args[0] == passcode){
        message.channel.send('Restarting the bot.');
        setTimeout(()=> {
         try{
            process.exit();
        } catch(err){
            console.log(err)
        }
    }, 10000);
}}}