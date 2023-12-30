require("dotenv").config();
const Discord = require("discord.js-light");
module.exports = {
    name: "eval",
    description: "Evalutes javascript code",

    async execute(message, args, client, db2) {
       if (message.author.id !== '360064639175884800') return message.channel.send('```You aren\'t allowed to use this command!```');
      let codeArr = args.slice(0).join(" ").split("\n");

    if (!codeArr[codeArr.length - 1].startsWith("return")) {
      codeArr[codeArr.length - 1] = `return ${codeArr[codeArr.length - 1]}`;
    }

    const code = `async () => { ${codeArr.join("\n")} }`;

    if (!args[0]) { await message.channel.send("Please provide code to run"); return; }
    try{
    let func = eval(code);
    let evaled = await func();

    if (typeof evaled !== "string") {
      evaled = require("util").inspect(evaled);
    }

    evaled = evaled.replace(process.env.TOKEN, "[TOKEN]");

    await message.channel.send(evaled, { split: true, code: "js" });
    }catch(e){
      return message.channel.send(e, {split: true, code:"js"})
    }
    }
}