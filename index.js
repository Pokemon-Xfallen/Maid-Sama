const Discord = require("discord.js");
const fs = require("fs");
const config = {
    "TOKEN" : process.env.BOT_TOKEN,
    "PREFIX" : "&"
}
const bot = new Discord.Client;
bot.commands = new Discord.Collection();

bot.on("ready", () => require("./events/ready.js")(bot));

fs.readdir("./commands/", (err, files) => {

    if(err) console.log(err);
  
    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if(jsfile.lenght <= 0){
      console.log("Couldn't find commands.");
      return;
    }
  
  
    jsfile.forEach((f, i) =>{
      let props = require(`./commands/${f}`);
      console.log(`${f} loaded`)
      bot.commands.set(props.help.name, props);
    })
  
  });

  bot.on("message", async message => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;
  
    let prefix = config.PREFIX;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);
  
    let commandfile = bot.commands.get(cmd.slice(prefix.length));
    if(commandfile) commandfile.run(bot,message,args);
  
  });

bot.on("message", msg => {

    if(msg.content === "ping"){
        msg.reply("Pong")
    }

});

bot.login(config.TOKEN)
//bot.login(config.TOKEN2)
