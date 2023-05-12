const express = require("express");
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(80, ()=>{
  console.log("Project is running!");
})

app.get("/", (req, res) => {
  res.send("InstagramBot running");
})

const Discord = require("discord.js");
const { GatewayIntentBits, Partials } = require('discord.js');
const client = new Discord.Client({ intents: [
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.DirectMessageReactions,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildBans,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.MessageContent
  ],
  partials: [
    Partials.Message, 
    Partials.Channel, 
    Partials.MessageReaction, 
    Partials.User,
    Partials.GuildMessages, 
    Discord.PartialGroupDMChannel
  ]});

client.on('messageCreate', async (message) => {
  console.log(message);
  if(message && message.content) {
    if(message.content.toLowerCase() === "hi") {
      message.channel.send("Greetings, human! *beep* (I'm a robot)");
    } else if(message.content.toLowerCase() === "/name") {
      message.channel.send("My name is InstagramBot *beep* *boop* nice to meet you!");
    }
  }
})

client.on('ready', () => {
  console.log("InstagramBot is running...");
});

client.login(process.env['token']);

app.get("/instagram-post/", (req, res) => {

  console.log("Got request", req);
  
  const url = req.query.url;
  const caption = req.query.caption;
  const sourceUrl = req.query.sourceUrl;
  
  console.log("It's working", url, caption, sourceUrl);

  client.channels.cache.get('<channel ID>').send(sourceUrl);
  client.channels.cache.get('<channel ID>').send(caption);
})