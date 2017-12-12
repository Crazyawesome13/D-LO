const Discord = require("discord.js");
const YTDL = require("ytdl-core");

const config = require("./config.json");

function play(connection, message) {
    var server = servers[message.guild.id];

    server.dispatcher = connection.playStream(YTDL(server.queue[0], {filter: "audioonly"}));

    server.queue.shift();

    server.dispatcher.on("end", function() {
        if (server.queue[0]) play(connection, message);
        else connection.disconnect();
    });
}

var fortunes = [
    "Yes",
    "No",
    "I'm not sure, ask again, please.",
    "Maybe.. ;)",
    "Are you sure you want the answer?",
    "probably."
];

var bot = new Discord.Client();

var servers = {};

//bot.on("message", function(message) {
//    if (message.author.equals(bot.user)) return;
//    if (message.content.startsWith("Goodnight"))
//        message.channel.send(`Sleeptight, ${message.author.toString()}!`)
//    if (message.content.startsWith("goodnight"))
//        message.channel.send(`Sleeptight, ${message.author.toString()}!`)
//    if (message.content.startsWith("'night"))
//        message.channel.send(`Sleeptight, ${message.author.toString()}!`)
//    if (message.content.startsWith("Gn"))
//        message.channel.send(`Sleeptight, ${message.author.toString()}!`)
//    if (message.content.startsWith("GN"))
//        message.channel.send(`Sleeptight, ${message.author.toString()}!`)
//    if (message.content.startsWith("gn"))
//        message.channel.send(`Sleeptight, ${message.author.toString()}!`)
//    if (message.content.startsWith("'Night"))
//        message.channel.send(`Sleeptight, ${message.author.toString()}!`)
//});

bot.on("ready", function() {
    console.log("Active."); return;
});

bot.on('ready', () => {
  bot.user.setGame("mind games.")
}); 
//    if (guild.id("341059940707991552" === true)) {
//    bot.on('guildMemberAdd',(member) => { member.addRole('342503439080620033').catch(console.error); });
//    } else { return;
//    }

bot.on("message", function(message) {
    if (message.author.equals(bot.user)) return;

    if (!message.content.startsWith(config.prefix)) return;

    var args = message.content.substring(config.prefix.length).split(" ");

    switch (args[0].toLowerCase()) {

        case "ping":
            message.channel.send(`Pong! ${bot.ping}ms.`)
            break;

        case "info":
            message.channel.send("I am a bot made specifically for the Iniquitous Guild.");
            break;

        case "8ball":
            if (args[1]) message.channel.send(fortunes[Math.floor(Math.random() * fortunes.length)]);
             else message.channel.send("Can't read that");
            break;

        case "senpai":
            message.channel.send(message.author.toString() + " has been noticed.");
            setTimeout(function()
            {
            message.channel.send("JK.")
            }, 1000);
            break;

        case "play":
            if (!args[1]) {
                message.channel.send("Please provide a link");
                return;
            }

            if (!message.member.voiceChannel) {
                message.channel.send("You must be in a Voice Channel");
                return;
            }
            
            if(!servers[message.guild.id]) servers[message.guild.id] = {
                queue: []
            };

            var server = servers[message.guild.id];

            server.queue.push(args[1]);

            if (!message.guild.voiceConnection) message.member.voiceChannel.join().then(function(connection) {
                play(connection, message);
            });
            break;

        case "avatar":
            message.channel.send(`${message.reply(message.author.avatarURL)} This is your avatar!`)
            break;

        case "test":
            message.channel.send(`Good job using that test command, ${message.author.toString()}!`);
            break;

        case "skrra":
            message.channel.send(`the ting go skrra`);
            break;

        case "skip":
            var server = servers[message.guild.id];

            if (server.dispatcher) server.dispatcher.end();
            break;

        case "stop":
            var server = servers[message.guild.id];

            if (message.guild.voiceConnection) message.guild.voiceConnection.disconnect();
            break;

        case "help":
            var embed = new Discord.RichEmbed()
            message.channel.send({embed: {
                    name: "This is the Help command, giving information on all other commands within the bot.",
                    icon_url: "https://image.ibb.co/bQM7xb/Dotty_Satanic_PP.png",
                fields: [{
                    name: "Play",
                    value: "Syntax: >play [URL] (Adds a song to the queue.)",
            },
            {
                    name: "Stop",
                    value: "Stops the current song in queue.",
            },
            {
                    name: "Skip",
                    value: "Skips the current song in queue and plays next song.",
            },
            {
                    name: "8ball",
                    value: "Gives all around great advice for all of your incredibly difficult life choices.",
            },
            {
                    name: "Senpai",
                    value: "You've been noticed.",
            },
            {
                    name: "Avatar",
                    value: "Gives your avatar link in response."
            },
            {
                    name: "Info",
                    value: "Quick description of what the bot is made for.",
            },
            {
                    name: "Ping",
                    value: "Pong."
            }
    ],
        
    }
  
});
           {
setTimeout(function()
{
   message.author.lastMessage.delete(message)
}, 0);
}
        break;

        default:
            message.channel.send("That is not a command!");
    }
});

bot.login(config.token);