const Discord = require("discord.js");
const YTDL = require("ytdl-core");
const guild = servers
const ud = require('urban-dictionary')
const config = require("./config.json");

var bot = new Discord.Client();

var servers = {};

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

var insults = [
    "You're funny. Funny looking! rekt'd em good.",
    "You suck!",
    "You need to have an IQ of over 200 to understand this insult.",
    "You're pretty. Pretty ugly. Haha!",
    "I know I'm supposed to come up with a randomly generated insult to give to you on behalf of the user above but honestly I don't have the processing power to insult *you* and it takes almost no processing power for me to insult you but even such a small amount seems like a giant waste for you.",
    "You're an ultra."
]; 

var gender = [
    "a boy",
    "a girl",
    "an apache helicopter",
];

var jokes = [
    "What time did the man go to the dentist? Tooth hurt-y.",
    "I'm reading a book about anti-gravity. It's impossible to put down!",
    "You're American when you go into the bathroom, and you're American when you come out, but do you know what you are while you're in there? European.",
    "Did you know the first French fries weren't actually cooked in France? They were cooked in Greece.",
    "Want to hear a joke about a piece of paper? Never mind... it's tearable.",
    "I just watched a documentary about beavers. It was the best dam show I ever saw!",
    "If you see a robbery at an Apple Store does that make you an iWitness?",
    "Spring is here! I got so excited I wet my plants!",
    "A ham sandwich walks into a bar and orders a beer. The bartender says, 'Sorry we don’t serve food here.'",
    "What’s Forrest Gump’s password? 1forrest1",
    "Why did the Clydesdale give the pony a glass of water? Because he was a little horse!",
    "CASHIER: 'Would you like the milk in a bag, sir?' DAD: 'No, just leave it in the carton!'",
    "Did you hear about the guy who invented Lifesavers? They say he made a mint.",
    "I bought some shoes from a drug dealer. I don't know what he laced them with, but I was tripping all day!",
    "Why do chicken coops only have two doors? Because if they had four, they would be chicken sedans!",
    "What do you call a factory that sells passable products? A satisfactory.",
    "KID: 'Hey, I was thinking…' DAD: 'I thought I smelled something burning.'",
    "How do you make a Kleenex dance? Put a little boogie in it!",
    "A termite walks into a bar and asks, 'Is the bar tender here?'",
    "When a dad drives past a graveyard: Did you know that's a popular cemetery? Yep, people are just dying to get in there!",
    "Two peanuts were walking down the street. One was a salted.",
    "FAST FOOD WORKER: 'Any condiments?' DAD: 'Compliments? You look very nice today!'",
    "Why did the invisible man turn down the job offer? He couldn't see himself doing it.",
    "I used to have a job at a calendar factory but I got the sack because I took a couple of days off.",
    "A woman is on trial for beating her husband to death with his guitar collection. Judge says, 'First offender?' She says, 'No, first a Gibson! Then a Fender!'",
];

bot.on("ready", function() {
    bot.user.setPresence({status: "dnd", type: 0})
    bot.user.setPresence({ game: { name: 'Use "-help"!', type: 0 } });
    console.log("Active."); return;
});

bot.on("message", function(message) {
    if (message.author.equals(bot.user)) return;

    if (!message.content.startsWith(config.prefix)) return;

    var args = message.content.substring(config.prefix.length).split(" ");

    switch (args[0].toLowerCase()) {
        
// General Use Commands:        
        case "ping":
            message.channel.send(`Pong! \`${Date.now() - message.createdTimestamp} ms\``)
            break;

        case "info":
            message.channel.send(`Hello, ${message.author.toString()}! I am <@340016114136252437>, I have plenty of commands, but to simplify things I'll list a few categories you could use to organize them; We have the **Music* category, the **Meme** category, the **Actions** category, and finally the **General** category. All of these categories are just a generalization of what I can actually do which is a lot! For more information use -help (**Note: can be spammy and long.*) or PM <@173827159784161280>!`);
            break;

        case "avatar":
            message.channel.send(`${message.reply(message.author.avatarURL)} This is your avatar!`);
            break;

        case "test":
            message.channel.send(`Good job using that test command, ${message.author.toString()}!`);
            {
                setTimeout(function()
                {
                   message.author.lastMessage.delete(message)
                }, 0);
                }
            break; 

        case "8ball":
            if (args[1]) message.channel.send(fortunes[Math.floor(Math.random() * fortunes.length)]);
             else message.channel.send("Can't read that");
            break;

        case "senpai":
            message.channel.send(`${message.author.toString()} has been noticed.`);
            setTimeout(function()
            {
            message.channel.send("JK.")
            }, 1000);
            {
                setTimeout(function()
                {
                   message.author.lastMessage.delete(message)
                }, 0);
                }
            break; 

        case "urbandict":
            message.channel.send(`https://www.urbandictionary.com/define.php?${message.content.toString().replace("-urbandict ", "term=")}`)
            break;

// Action commands:    

        case "punch":
            message.channel.send(`${message.author.toString()} punches ${message.mentions.members.first()}!!`);
            {
                setTimeout(function()
                {
                   message.author.lastMessage.delete(message)
                }, 0);
                }
            break; 

        case "poke":
            message.channel.send(`${message.author.toString()} pokes ${message.mentions.members.first()}.. hm. Wonder what for?`);
            {
                setTimeout(function()
                {
                   message.author.lastMessage.delete(message)
                }, 0);
                }
            break; 

        case "impregnate":
            message.channel.send(`${message.author.toString()} impregnates ${message.mentions.members.first()}. Congratulations, it's ${(gender[Math.floor(Math.random() * gender.length)]).toString()}!`);
            {
                setTimeout(function()
                {
                   message.author.lastMessage.delete(message)
                }, 0);
                }
            break; 

        case "hug":
            message.channel.send(`${message.author.toString()} gives ${message.mentions.members.first()} a hug! How sweet.`);
            {
                setTimeout(function()
                {
                   message.author.lastMessage.delete(message)
                }, 0);
                }
            break; 

        case "kiss":
            message.channel.send(`${message.author.toString()} kisses ${message.mentions.members.first()}! Lovely.`);
            {
                setTimeout(function()
                {
                   message.author.lastMessage.delete(message)
                }, 0);
                }
            break; 

        case "stab":
            message.channel.send(`${message.author.toString()} shanks ${message.mentions.members.first()}!! Someone call the cops!`);
            {
                setTimeout(function()
                {
                   message.author.lastMessage.delete(message)
                }, 0);
                }
            break; 

        case "shoot":
            message.channel.send(`${message.author.toString()} shot ${message.mentions.members.first()}, they've got a gun!`);
            {
                setTimeout(function()
                {
                   message.author.lastMessage.delete(message)
                }, 0);
                }
            break; 

        case "pressf":
            message.channel.send(`${message.author.toString()} paid their respects to ${message.mentions.members.first()}. Rest in peace.`);
            {
                setTimeout(function()
                {
                   message.author.lastMessage.delete(message)
                }, 0);
                }
            break; 

        case "kissback":
            message.channel.send(`${message.author.toString()} kisses ${message.mentions.members.first()} back!`);
            {
                setTimeout(function()
                {
                   message.author.lastMessage.delete(message)
                }, 0);
                }
            break; 

        case "slap":
            message.channel.send(`${message.author.toString()} slaps ${message.mentions.members.first()}! Fight Fight Fight!`);
            {
                setTimeout(function()
                {
                   message.author.lastMessage.delete(message)
                }, 0);
                }
            break; 

        case "lick":
            message.channel.send(`${message.author.toString()} licks ${message.mentions.members.first()}! Eww.`);
            {
                setTimeout(function()
                {
                   message.author.lastMessage.delete(message)
                }, 0);
                }
            break; 

        case "pathead":
            message.channel.send(`${message.author.toString()} pats ${message.mentions.members.first()}'s head.`);
            {
                setTimeout(function()
                {
                   message.author.lastMessage.delete(message)
                }, 0);
                }
            break; 

        case "tickle":
            message.channel.send(`${message.author.toString()} tickles ${message.mentions.members.first()}`);
            {
                setTimeout(function()
                {
                   message.author.lastMessage.delete(message)
                }, 0);
                }
            break; 

        case "cookie":
            message.channel.send(`${message.author.toString()} gives ${message.mentions.members.first()} a cookie. How nice.`);
            {
                setTimeout(function()
                {
                   message.author.lastMessage.delete(message)
                }, 0);
                }
            break; 

        case "kick":
            message.channel.send(`${message.author.toString()} kicks ${message.mentions.members.first()}! Rude :(`);
            {
                setTimeout(function()
                {
                   message.author.lastMessage.delete(message)
                }, 0);
                }
            break; 

        case "dodge":
            message.channel.send(`${message.author.toString()} dodged ${message.mentions.members.first()} flawlessly!`);
            {
                setTimeout(function()
                {
                   message.author.lastMessage.delete(message)
                }, 0);
                }
            break; 

        case "runaway":
            message.channel.send(`${message.author.toString()} ran away from ${message.mentions.members.first()} wonder why..`);
            {
                setTimeout(function()
                {
                   message.author.lastMessage.delete(message)
                }, 0);
                }
            break; 

        case "hide":
            message.channel.send(`${message.author.toString()} is hiding from ${message.mentions.members.first()}. I wonder where they could be..`);
            {
                setTimeout(function()
                {
                   message.author.lastMessage.delete(message)
                }, 0);
                }
            break; 

        case "ship":
            message.channel.send(`${message.author.toString()} shipped ${message.mentions.members.first()} with ${message.mentions.members.last()}! Is it sailing?`);
            {
                setTimeout(function()
                {
                   message.author.lastMessage.delete(message)
                }, 0);
                }
            break; 

        case "bribe":
            message.channel.send(`${message.author.toString()} is bribing ${message.mentions.members.first()} for an advantage, stop them!`);
            {
                setTimeout(function()
                {
                   message.author.lastMessage.delete(message)
                }, 0);
                }
            break; 

        case "tape":
            message.channel.send(`${message.author.toString()} tied ${message.mentions.members.first()} up with duct-tape. Strange...`);
            {
                setTimeout(function()
                {
                   message.author.lastMessage.delete(message)
                }, 0);
                }
            break; 

        case "shh":
            message.channel.send(`${message.author.toString()} puts their finger over ${message.mentions.members.first()}'s mouth in a seductive fashion telling them to 'Shh'`);
            {
                setTimeout(function()
                {
                   message.author.lastMessage.delete(message)
                }, 0);
                }
            break; 
            
        case "trip":
            message.channel.send(`${message.author.toString()} trips ${message.mentions.members.first()} making them fall to the ground. What a jerk.`);
            {
                setTimeout(function()
                {
                   message.author.lastMessage.delete(message)
                }, 0);
                }
            break;
            
        case "fbi":
            message.channel.send(`hewwo ${message.mentions.members.first()} dis ish teh FBI, Furry Bulge Inspection agency, coming to awwest u for poswession of an iwwegally big bulgie uwu. Now i will inspwect u. *sniffs and notices ur bulge* owo wats dis? *squeezie ur bulgie* uwu ish sho juicy and big owo`);
            {
                setTimeout(function()
                {
                   message.author.lastMessage.delete(message)
                }, 0);
                }
            break;

        case "kys":
            message.channel.send(`${message.author.toString()} told ${message.mentions.members.first()} to kill themselves. React with fire to have them banned. ;)`)
            {
                setTimeout(function()
                {
                   message.author.lastMessage.delete(message)
                }, 0);
                }
            break;

        case "kms":
            message.channel.send(`${message.author.toString()} is going to kill themselves. Do a flip!`)
            {
                setTimeout(function()
                {
                   message.author.lastMessage.delete(message)
                }, 0);
                }
            break;
        
        case ".-":
            message.channel.send(`Your face will freeze if you keep doing that.`)
            break;

        case "_-":
            message.channel.send(`Stop that! Making faces is rude.`)
            break;

        case "ranya":
            message.channel.send(`**(Noun)** *a girl who pretends to be modest but still flaunts her rediculously hot body*`)
            {
                setTimeout(function()
                {
                   message.author.lastMessage.delete(message)
                }, 0);
                }
            break;

        case "rape":
            message.channel.send(`I foresee jail in your future, ${message.author.toString()}, you should be ashamed of yourself!`)
            {
                setTimeout(function()
                {
                   message.author.lastMessage.delete(message)
                }, 0);
                }
            break;

        case "pickpocket":
            message.channel.send(`${message.author.toString()} pickpocketed ${message.mentions.members.first()} for $${Math.floor(Math.random()*3000) + 5}`)
            {
                setTimeout(function()
                {
                   message.author.lastMessage.delete(message)
                }, 0);
                }
            break;
            
        case "insult":
            message.channel.send(`${message.author.toString()} insulted ${message.mentions.members.first()} with the following:`)
            if (args[1]) message.channel.send(insults[Math.floor(Math.random() * insults.length)]);
            else return;
            {
                setTimeout(function()
                {
                   message.author.lastMessage.delete(message)
                }, 0);
                }
            break;

        case "dab":
            message.channel.send(`${message.author.toString()} dabbed on ${message.mentions.members.first()}!`)
            {
                setTimeout(function()
                {
                   message.author.lastMessage.delete(message)
                }, 0);
                }
            break;

        case "dabback":
            message.channel.send(`${message.author.toString()} dabbed right back at ${message.mentions.members.first()}! Dab fight??`)
            {
                setTimeout(function()
                {
                   message.author.lastMessage.delete(message)
                }, 0);
                }
            break;

        case "adopt":
            message.channel.send(`${message.author.toString()} has adopted ${message.mentions.members.first()}! Congratulations, ${message.mentions.members.first()}, you're no longer an orphan!`);
            {
                setTimeout(function()
                {
                   message.author.lastMessage.delete(message)
                }, 0);
                }
            break;

        case "nsfw":
            message.channel.send(`${message.author.toString()} has confirmed ${message.mentions.members.first()} is in-fact Not Safe For Work.`);
            {
                setTimeout(function()
                {
                   message.author.lastMessage.delete(message)
                }, 0);
                }
            break;

        case "oof":
            message.channel.send(`${message.author.toString()}, with great oof comes great responsibilitoof.`);
            {
                setTimeout(function()
                {
                   message.author.lastMessage.delete(message)
                }, 0);
                }
            break;

        case "flip":
            message.channel.send(`${message.author.toString()} performs a flip. Impressive. The question is; where from?`);
            {
                setTimeout(function()
                {
                   message.author.lastMessage.delete(message)
                }, 0);
                }
            break;

// Meme Commands:

        case "rickroll":
            message.author.send(`Never gonna give you up
            Never gonna let you down
            Never gonna run around and desert you
            Never gonna make you cry
            Never gonna say goodbye
            Never gonna tell a lie and hurt you`);
            {
                setTimeout(function()
                {
                   message.author.lastMessage.delete(message)
                }, 0);
                }
            break;


        case "skrra":
            message.channel.send(`the ting go skrra`);
            {
                setTimeout(function()
                {
                   message.author.lastMessage.delete(message)
                }, 0);
                }
            break;

        case "screech":
            message.channel.send(`https://image.ibb.co/ki9B5R/Screenshot_1.png`);
            {
                setTimeout(function()
                {
                   message.author.lastMessage.delete(message)
                }, 0);
                }
            break;

        case "ily":
            message.mentions.members.first().send(`${message.author.toString()} says "I love you". Cute.`);
            {
                setTimeout(function()
                {
                   message.author.lastMessage.delete(message)
                }, 0);
                }
            break;

        case "ily2":
            message.mentions.members.first().send(`${message.author.toString()} says "I love you too". Cute(r).`);
            {
                setTimeout(function()
                {
                   message.author.lastMessage.delete(message)
                }, 0);
                }
            break;

        case "joke":
            message.channel.send(`${message.author.toString()} requested a joke. Here you go, hope you don't regret it.`);
            args[1]; message.channel.send(jokes[Math.floor(Math.random() * jokes.length)]);
            {
                setTimeout(function()
                {
                message.author.lastMessage.delete(message)
                }, 0);
                }
            break;

        case "marry":
            message.channel.send(`${message.author.toString()} attempts to marry ${message.mentions.members.first()}. Are their feelings reciprocated?`);
            {
                setTimeout(function()
                {
                message.author.lastMessage.delete(message)
                }, 0);
                }
            break;
        
        case "howmuchforanhour":
            message.author.send(`It'll be $50 for the good stuff, ${message.author.toString()}.`);
            {
                setTimeout(function()
                {
                message.author.lastMessage.delete(message)
                }, 0);
                }
            break;

// Misc. Commands:

        case "purge":
            let modRole = message.guild.roles.find("name", "Staff");
            if(message.member.roles.has(modRole.id)) {
                message.channel.bulkDelete(15 + 1)
            } else {
            return message.channel.send("You don't have permission to use this command.")
            }
            {
                setTimeout(function()
                {
                   message.author.lastMessage.delete(message)
                }, 0);
                }
            break;

        case "temp":
            break;

        case "joined":
            if (message.channel.content === `${message.mentions.members}`) {
                message.channel.send(`${message.mentions.members.first()} joined the guild on ${message.mentions.members.first.createdAt.toString()}.`)
            } else {
            message.channel.send(`${message.author.toString()} joined the guild on ${message.author.createdAt.toString()}.`) }
            {
                setTimeout(function()
                {
                   message.author.lastMessage.delete(message)
                }, 0);
                }
            break;

// Custom Commands:

        case "damnocles":
            message.channel.send(`It's a surprise I thought of a command for the bot. -<@282305765619007489>`);
        {
            setTimeout(function()
            {
               message.author.lastMessage.delete(message)
            }, 0);
            }
            break;

        case "vc":
            message.channel.send(`**"I'd hack your pc and break your voice changer"** - <@282305765619007489> 2017`);
        {
            setTimeout(function()
            {
               message.author.lastMessage.delete(message)
            }, 0);
            }
            break;

        case "fuck":
            message.channel.send(`${message.author.toString()} stares into ${message.mentions.members.first()} passionately and kisses ${message.mentions.members.first()}'s hand. ${message.mentions.members.first()} says: "Oh, ${message.author.toString()}  senpai" *${message.author.toString()} stares at ${message.mentions.members.first()}* "${message.mentions.members.first()} senpai I need to tell you one thing before we continue..." *${message.mentions.members.first()} looks at ${message.author.toString()} smiling, "you can tell me anything ${message.author.toString()} senpai" *${message.author.toString()} smiles and says:* "FUCK YOU BITCH" and runs away.`);
        {
            setTimeout(function()
            {
               message.author.lastMessage.delete(message)
            }, 0);
            }
            break;

        case "dott":
            message.author.send(`How do you do, ${message.author.toString()}? I'm D-LO, and the command -Dott is meant to give you some information on my creator. iDotty begun creating me in early 2017 late 2016 and only recently (Early December of 2017) began adding Action commands. At this time iDotty is in a relationship and has been for around the same time as he's been making me! He's currently taking a break from gaming but you can find him on Discord @ iDotty#7322. If you want to see a command added to the bot suggest it to him in detail and maybe you'll see your command featured here! Thanks for using -Dott! ^-^`)
            {
                setTimeout(function()
                {
                   message.author.lastMessage.delete(message)
                }, 0);
                }
            break;

// Help Command: (Needs improving)

        case "help":
            var embed = new Discord.RichEmbed()
            message.author.send({embed: {
                    name: "This is the Help command, giving information on all other commands within the bot.",
                    icon_url: "https://image.ibb.co/bQM7xb/Dotty_Satanic_PP.png",
                fields: [{
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
            },
            {
                    name: "Punch",
                    value: "Syntax: -punch @user",
            },
            {
                    name: "Poke",
                    value: "Syntax: -poke @user",
            },
            {
                    name: "Hug",
                    value: "Syntax: -hug @user",
            },
            {
                    name: "Kiss",
                    value: "Syntax: -kiss @user",
            },
            {
                    name: "Stab",
                    value: "Syntax: -stab @user",
            },
            {
                    name: "Shoot",
                    value: "Syntax: -shoot @user",
            },
            {
                    name: "Pressf",
                    value: "Syntax: -pressf @user",
            },
            {
                    name: "Kissback",
                    value: "Syntax: -kissback @user",
            },
            {
                    name: "Slap",
                    value: "Syntax: -slap @user",
            },
            {
                    name: "Tickle",
                    value: "Syntax: -tickle @user",
            },
            {
                    name: "Lick",
                    value: "Syntax: -lick @user",
            },
            {
                    name: "Runaway",
                    value: "Syntax: -runaway @user",
            },
            {
                    name: "Hide",
                    value: "Syntax: -hide @user",
            },
            {
                    name: "PatHead",
                    value: "Syntax: -pathead @user",
            },
            {
                    name: "Cookie",
                    value: "Syntax: -cookie @user",
            },
            {
                    name: "Dodge",
                    value: "Syntax: -dodge @user",
            },
            {
                    name: "Kick",
                    value: "Syntax: -kick @user",
            }
    ],
        
    }
            });

            message.author.send({embed: {
                    name: "This is the Help command, giving information on all other commands within the bot.",
                    icon_url: "https://image.ibb.co/bQM7xb/Dotty_Satanic_PP.png",
                fields: [{
                    name: "bribe",
                    value: "Syntax: -bribe @user",
            },
            {
                    name: "tape",
                    value: "Syntax: -tape @user",
            },
            {
                    name: "shh",
                    value: "Syntax: -shh @user",
            },
            {
                    name: "trip",
                    value: "Syntax: -trip @user",
            },
            {
                    name: "FBI",
                    value: "Syntax: '-fbi @user' Careful! This one could be considered NSFW."
            },
            {
                    name: "kms",
                    value: "Syntax: -kms",
            },
            {
                    name: "kys",
                    value: "Syntax: -kys @user",
            },
            {
                    name: "insult",
                    value: "Syntax: -insult @user",
            },
            {
                    name: "PickPocket",
                    value: "Syntax: -pickpocket @user",
            },
            {
                    name: "Ranya",
                    value: "Syntax: -ranya",
            },
            {
                    name: "Rape",
                    value: "Syntax: -rape",
            },
            {
                    name: "Dab",
                    value: "Syntax: -dab @user",
            },
            {
                    name: "DabBack",
                    value: "Syntax: -dabback @user",
            },
            {
                    name: "UrbandDictionary",
                    value: "Syntax: -urbandict WORD",
            },
            {
                    name: "Rickroll",
                    value: "Syntax: -rickroll",
            },
            {
                    name: "Impregnate",
                    value: "Syntax: -impregnate @user",
            },
            {
                    name: "Dott",
                    value: "Syntax: -dott",
            },
            {
                    name: "Ship",
                    value: "Syntax: -ship @user @user",
            },
            {
                    name: "Screech",
                    value: "Syntax: -screech",
            },
            {
                    name: "Adopt",
                    value: "Syntax: -adopt @user",
            },
            {
                    name: "NSFW",
                    value: "Syntax: -nsfw @user",
            },
            {
                    name: "OOF",
                    value: "Syntax: -oof",
            },
            {
                    name: "Marry",
                    value: "Syntax: -marry @user  (Note: Doesn't actually marry people, just a quip.)",
            },
            {
                    name: "Joke",
                    value: "Syntax: -joke",
            },
            {
                    name: "ILY",
                    value: "Syntax: -ily @user",
            }
],

}
});

    message.author.send({embed: {
        name: "This is the Help command, giving information on all other commands within the bot.",
        icon_url: "https://image.ibb.co/bQM7xb/Dotty_Satanic_PP.png",
    fields: [{

            name: "ILY2",
            value: "Syntax: -ily2 @user",
    },
    {
            name: "Flip",
            value: "Syntax: -flip",
    },
    {
            name: "Adopt",
            value: "Syntax: -adopt @user",
    },
    {
            name: "HowMuchForAnHour?",
            value: "NSFW Syntax: -howmuchforanhour",
    }
    ]
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
        message.channel.send("Sorry, pal. Dunno what you're asking me to do.");
}
});

bot.login(config.token);
