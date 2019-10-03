const Discord=require('discord.js');
const {prefix,token}=require('./config.json');

const client=new Discord.Client();

client.once('ready',()=>{
    console.log("Ready!!!");
});

client.on('message',message=>{
    console.log(message.content);
    if(message.content==`${prefix}ping`){
        message.channel.send('PING..');
    }
    //console.log(message.client);
    if(message.content== `${prefix}avatar`){
        message.reply(message.author.avatarURL);
    }
    if(message.content== `${prefix}name`){
        message.channel.send("Name==> ");
        message.reply(message.author.name);

    }
    if(message.content== `${prefix}hi`){
        message.channel.send("Hi welcome, ");
        message.reply(message.author.name);

        message.channel.send("How can I help you ?");        

    }
    if(message.content.startsWith(`${prefix}kick`)){
    if(message.member.hasPermission(['KICK_MEMBERS','BAN_MEMBERS'])){
            let member=message.mentions.members.first());
            member.kick().then(member=>{
                message.channel.send(":wave: "+member.displayName+" has been kicked.")
            })
        }
    }
    
});
client.on('guildMemberAdd',member=>{
    const channel = member.guild.channels.find(ch=>ch.name=='event-notify');
    if(!channel) return;
    channel.send(`Welcome to the server, ${member}`);

});
client.login(token);
