const Discord = require('discord.js');
const fs = require("fs");

const { prefix, token } = require('./config.json');

const client = new Discord.Client();

client.once('ready', () => {
    console.log("Ready!!!");
});

client.on('message', message => {
    console.log(message.content);
    if (message.content == `${prefix}ping`) {
        message.channel.send('PING..');
    }
    //console.log(message.client);
    if (message.content == `${prefix}avatar`) {
        message.reply(message.author.avatarURL);
    }
    if (message.content == `${prefix}name`) {
        message.channel.send("Name==> ");
        message.reply(message.author.name);

    }
    if (message.content == `${prefix}creator`) {
        message.channel.send("Pratap Mridha Created Me :wave:");
        message.reply("You can follow him on facebook ,Instagram, Github");
        message.channel.send("Facebook :" + " https://www.facebook.com/pratap.mridha.3");
        message.channel.send("Instagram :" + " https://www.instagram.com/indiapratap2");
        message.channel.send("Github :" + " https://github.com/Pratap2018");
        message.channel.send("Thanks in advance :wave:");
    }

    if (message.content == `${prefix}hi`) {
        message.channel.send("Hi welcome, ");
        message.reply(message.author.name);
        message.channel.send("How can I help you ?");
    }
    if (message.content == `${prefix}kick`) {
        message.reply("Please mention the member ");
    } else if (message.content.startsWith(`${prefix}kick`)) {
        if (message.member.hasPermission(['KICK_MEMBERS', 'BAN_MEMBERS'])) {
            let member = message.mentions.members.first();
            member.kick().then(member => {
                message.channel.send(":wave: " + member.displayName + " has been kicked.")
            })
        }
    }

});

/***UPDATE TEXT */
client.on('messageUpdate', async (oldMessage, newMessage) => {
    if (oldMessage.content == newMessage.content) {
        return;
    }
    let logEmbed = new Discord.RichEmbed()
        .setAuthor(oldMessage.author.tag, oldMessage.author.avatarURL)
        .setThumbnail(oldMessage.author.avatarURL)
        .setColor("RANDOM")
        .setDescription("Message Edited")
        .addField("Before", oldMessage.content, true)
        .addField("After", newMessage.content, true)
        .setTimestamp()
        .setFooter("Message Update log");
    let loggingChannel = newMessage.guild.channels.find(ch => ch.name == "logs")
    if (!loggingChannel) {
        loggingChannel = newMessage.guild.channels.find(ch => ch.name == "general")
    }
    loggingChannel.send(logEmbed);
})
/*** */
/******DELETE ***** */
client.on('messageDelete', async (message) => {

    let logEmbed = new Discord.RichEmbed()
        .setAuthor(message.author.tag, message.author.avatarURL)
        .setThumbnail(message.author.avatarURL)
        .setColor("RANDOM")
        .setDescription("Message Deleted")
        .addField("Message", message.content, true)
        .setTimestamp()
        .setFooter("Message Delete log");
    let loggingChannel = message.guild.channels.find(ch => ch.name == "logs")
    if (!loggingChannel) {
        loggingChannel = message.guild.channels.find(ch => ch.name == "general")
    }
    loggingChannel.send(logEmbed);
})

/************* */

/**** */
client.on('voiceStateUpdate', async (oldMember, newMember) => {
    let newUserChannel = newMember.voiceChannel;
    let oldUserChannel = oldMember.voiceChannel;


    if (oldUserChannel === undefined && newUserChannel !== undefined) {
       // console.log(`${newMember.displayName} Joined a voice channel ${newUserChannel.name}`);
        // User Joins a voice channel
        let logEmbed = new Discord.RichEmbed()            
        .setColor("RANDOM")
        .addField(` :arrow_upper_right: ${newMember.displayName} Joined  voice channel  ${newUserChannel.name}\n`,newMember.user, true)
        .setAuthor(newMember.user.tag,newMember.user.avatarURL)
        .setTimestamp()
        .setFooter("Voice Join")
        
        let loggingChannel = newMember.guild.channels.find(ch => ch.name == "logs")
        if (!loggingChannel) {
            loggingChannel = newMember.guild.channels.find(ch => ch.name == "general")
            loggingChannel.send("PLEASE CREATE A  TEXT CHANNEL EXACTLY NAMMED AS 'logs' ")
        }
        loggingChannel.send(logEmbed);

    } else if (newUserChannel === undefined) {
       // console.log(`${newMember.displayName} Leaved a voice channel ${oldUserChannel.name}`);
        // User leaves a voice channel
        let logEmbed = new Discord.RichEmbed()            
        .setColor("RANDOM")
        .addField(` :arrow_lower_left:  ${newMember.displayName} Left  voice channel ${oldUserChannel.name}\n`,newMember.user, true)
        .setAuthor(newMember.user.tag,newMember.user.avatarURL)
        .setTimestamp()
        .setFooter("Voice Leave")
        
        let loggingChannel = newMember.guild.channels.find(ch => ch.name == "logs")
        if (!loggingChannel) {
            loggingChannel = newMember.guild.channels.find(ch => ch.name == "general")
            loggingChannel.send("PLEASE CREATE A  TEXT CHANNEL EXACTLY NAMMED AS 'logs' ")
        }
        loggingChannel.send(logEmbed);

    } else {
        //console.log(`${newMember.displayName} Moved from ${oldUserChannel.name} to ${newUserChannel.name}`);
        let logEmbed = new Discord.RichEmbed()            
        .setColor("RANDOM")
        .addField(`:recycle:  ${newMember.displayName} Moved from ${oldUserChannel.name} to ${newUserChannel.name}`,newMember.user, true)
        .setAuthor(newMember.user.tag,newMember.user.avatarURL)
        .setTimestamp()
        .setFooter("Voice Move")
        
        let loggingChannel = newMember.guild.channels.find(ch => ch.name == "logs")
        if (!loggingChannel) {
            loggingChannel = newMember.guild.channels.find(ch => ch.name == "general")
            loggingChannel.send("PLEASE CREATE A TEXT  CHANNEL EXACTLY NAMMED AS 'logs' ")
        }
        loggingChannel.send(logEmbed);
    }
})
/**** */

client.on('guildMemberAdd', member => {
    let channel = member.guild.channels.find(ch => ch.name == 'logs');
    if (!channel) {
        channel = member.guild.channels.find(ch => ch.name == 'general');
    };
    channel.send(`Welcome to the server, ${member}`);

});
client.login(token);
