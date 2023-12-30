require("dotenv").config();
const mongo = require("quickmongo").Database;
const db2 = new mongo(process.env.MONGODB);
const randomPuppy = require('random-puppy')
const Discord = require("discord.js-light");
const { Client, Collection } = require("discord.js-light");
const { readdirSync } = require("fs");
const { join } = require("path");
const { PREFIX} = require("./config.json");
const fs = require('fs').promises;
const db = require('quick.db');
const tags = require("./model/tag");
Discord.Constants.DefaultOptions.ws.properties.$browser = "Discord Android";

process.setMaxListeners(12)

const client = new Client({ disableMentions: "everyone", 
cacheGuilds: true,
	cacheChannels: true,
	cacheOverwrites: false,
	cacheRoles: true,
	cacheEmojis: false,
	cachePresences: false
});
const fetch = require('node-fetch');
client.login(process.env.TOKEN);
client.commands = new Collection();
client.prefix = PREFIX;
client.queue = new Map();
const cooldowns = new Collection();
const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

client.on("ready", async () => {
  const BOATS = require('boats.js');
const Boats = new BOATS(process.env.BOAT);
Boats.postStats(client.guilds.cache.size, client.user.id).then(() => {
    console.log('Successfully updated server count.')
}).catch((err) => {
    console.error(err)
});
  console.log(`\n${client.user.username} ready!`);
  client.user.setActivity(`Over ${client.guilds.cache.size} guilds. Use .help for help`, { type : 'WATCHING' });
  setInterval(() => {
     client.user.setActivity(`Over ${client.guilds.cache.size} guilds. Use .help for help`, { type : 'WATCHING' });
  },1800000)
 setInterval(async() => {
  const meme_channels = await db2.get(`automemes`);
   const response = await fetch(`http://api.snowflakedev.cf:9019/api/meme` , {
     headers:{
       "authorization" : process.env.API
     }
   })
    const json = await response.json();
   for(var n in meme_channels){
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
        client.channels.fetch(meme_channels[n]).then(channel => {
          channel.send(memeembed);
        });
 }
 }, 1800000)
});

client.on("guildMemberAdd",async(member) => {
  const autorole = await db.get(`autorole_${member.guild.id}`);
  if(!autorole) return;
  if(!autorole[0]) return;
  member.roles.add(autorole[1]).catch(e => null);

});



client.on("warn", (info) => console.log(info));
client.on("error", console.error);
client.on("guildCreate", async(guild) => {
  const name = guild.name;
  const ownerid = guild.ownerID;
  const owner = await client.users.fetch(ownerid);

  const embed = new Discord.MessageEmbed()
  .setColor('BLUE')
  .setTitle(`Added to a new guild`)
  .setDescription(`Added to **${name}**. \n Owner: **${owner}** [${owner}]`)
  .setFooter(`Current Guild Size: ${client.guilds.cache.size}`)
  client.channels.cache.get('779668040877867038').send(embed);
});
client.on("guildDelete", guild => {
  const name = guild.name;
  const ownerid = guild.ownerID;

  const embed = new Discord.MessageEmbed()
  .setColor('BLUE')
  .setTitle(`Removed from a guild`)
  .setDescription(`Removed from **${name}**. \n Owner: [${ownerid}]`)
  .setFooter(`Current Guild Size: ${client.guilds.cache.size}`)
  client.channels.cache.get('779668040877867038').send(embed);
})


const commandFiles = readdirSync(join(__dirname, "commands")).filter((file) => file.endsWith(".js"));
for (const file of commandFiles) {
  const command = require(join(__dirname, "commands", `${file}`));
  client.commands.set(command.name, command);
}
client.on("messageReactionAdd", async(reaction, user)=> {
  if(reaction.message.partial) await reaction.message.fetch();
  if(reaction.partial) await reaction.fetch();

  if(user.bot) return;
  if(!reaction.message.guild) return;
  if(reaction.message.channel.id !== '779046336090996746') return;
  if(reaction.emoji.id == '779253698692907038'){
    const member = await reaction.message.guild.members.fetch(user.id)
    member.roles.add('721972396428623914');
    user.send('Thanks for accepting the rules! Come chat with us at <#778971491756277801>, or chat with an AI at <#779288458808000532>')
  }
})

client.on("UnhandledPromiseRejection", err => {
  null
})

client.on("message", async (message) => {
  if (message.author.bot) return;
  xp(message);

  const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(PREFIX)})\\s*`);
  if (!prefixRegex.test(message.content)) return;

  const [, matchedPrefix] = message.content.match(prefixRegex);

  const args = message.content.slice(matchedPrefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();
    tags.findOne({
    Guild: message.guild.id,
    Tag: commandName
    }, async(err, data) => {
      if(err) throw err;
      if(data) return message.channel.send(data.Content);
    })
  const command =
    client.commands.get(commandName) ||
    client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));

  if (!command) return;

  if (!cooldowns.has(command.name)) {
    cooldowns.set(command.name, new Collection());
  }

  const now = Date.now();
  const timestamps = cooldowns.get(command.name);
  const cooldownAmount = (command.cooldown || 1) * 1000;

  if (timestamps.has(message.author.id)) {
    const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000;
      return message.reply(
        `please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`
      );
    }
  }

  timestamps.set(message.author.id, now);
  setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

  try {
    command.execute(message, args, client, db2);
  } catch (error) {
    console.error(error);
    message.reply("There was an error executing that command.").catch(console.error);
  }
});

async function xp(message) {
  const xpenabled = await db.get(`xp_enabled_${message.guild.id}`)
  if(xpenabled){
  if(!message.guild) return;
  if(message.content.startsWith(PREFIX)) return;
  const random = Math.floor(Math.random() * 10) + 15;
  db.add(`guild_${message.guild.id}_xp_${message.author.id}`, random);
  db.add(`guild_${message.guild.id}_xptotal_${message.author.id}`, random);
  var level = db.get(`guild_${message.guild.id}_level_${message.author.id}`) || 1;
  var xp = db.get(`guild_${message.guild.id}_xp_${message.author.id}`);
  var xpNeeded = level * 500
  if(xpNeeded < xp){
    var newLevel = db.add(`guild_${message.guild.id}_level_${message.author.id}`, 1);
    db.subtract(`guild_${message.guild.id}_xp_${message.author.id}`, xpNeeded);
    message.channel.send(`${message.author}, you have levelled up to ${newLevel}`)
  }
  }
}
