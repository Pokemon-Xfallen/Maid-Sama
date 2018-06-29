const Discord = require("discord.js");
const config = {
    "TOKEN" : process.env.BOT_TOKEN,
    "PREFIX" : "&"
}

const bot = new Discord.Client;

bot.on("ready", () => {
    console.log(`${bot.user.username} Is Onlien!!`);
});

bot.on("message", msg => {

    if(msg.content === "ping"){
        msg.reply("Pong")
    }

});

bot.login(process.env.BOT_TOKEN)
//bot.login(config.TOKEN2)
