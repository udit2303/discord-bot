const Discord = require("discord.js-light");
const snowshot = require("snowshot");
module.exports = {
    name:"ss",
    async execute(message, args, client){
        const window = new snowshot();
        if(!args.join(" ")) return message.channel.send("You need to include some code");
        window.load(args.join(" "), true);
        if(args.join(" ").toLowerCase().startsWith("http://") || args.join(" ").toLowerCase().startsWith("https://")){
        return message.channel.send("Screenshot of websites isn't currently available. This is due to users being able to get the ip of the server the bot is hosted on.")  
        }
        const screenshot = await window.screenshot();
        const attachment = new Discord.MessageAttachment(screenshot, "screenshot.png");
        const embed = new Discord.MessageEmbed()
        .attachFiles(attachment)
        .setColor("BLUE")
        .setDescription(`Here is the screenshot for\n \`\`\`${args.join(" ")} \`\`\``)
        .setImage("attachment://screenshot.png");
        return message.channel.send(embed);
    }
}