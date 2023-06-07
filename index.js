require('dotenv').config();
const express = require('express');
const token = 'YOUR_DISCORD_TOKEN_GOES_HERE';
const { joinVoiceChannel } = require('@discordjs/voice');
const Discord = require('discord.js-selfbot-v13');

const app = express();
const client = new Discord.Client({ checkUpdate: false });

app.get('/', (req, res) => {
  res.send('Self Bot Rich Presence working');
});

app.listen(process.env.PORT, () => {
  console.log('Self Bot Rich Presence working on port ' + process.env.PORT);
});

client.on('ready', async () => {
  const rpc = new Discord.RichPresence()
    .setApplicationId('534203414247112723')
    .setType('STREAMING')
    .setURL('https://youtube.com/@mahdoch_md')
    .setDetails('GTA V')
    .setName('GTA V')
    .setState('PLAYING GTA V') // Replace with your desired state
    .setParty({
      max: 999,
      current: 666,
      id: Discord.getUUID(),
    })
    .setAssetsLargeImage('attachments/1101183253546807396/1115999831505248346/41e42edc6848c1a9534eee9176d27141.jpg')
    .setAssetsLargeText('PLAYING GTA V')
    .setAssetsSmallImage('mp:attachments/1101183253546807396/1115999831748513882/537b05936b8a2791050881fe7e26ffbb.jpg')
    .setAssetsSmallText('MAHDOCH')
    .addButton('LINK YOUTUBE', 'https://youtube.com/@mahdoch_md')
    .addButton('LINK GTA V', 'https://www.rockstargames.com/gta-v');

  client.user.setActivity(rpc.toJSON());
  console.log(`${client.user.tag} is ready!`);

  setInterval(async () => {
    client.channels
      .fetch('1107714099179171880') // Replace with the ID of your target room
      .then((channel) => {
        const voiceConnection = joinVoiceChannel({
          channelId: channel.id,
          guildId: channel.guild.id,
          adapterCreator: channel.guild.voiceAdapterCreator,
        });
      })
      .catch((error) => {
        return;
      });

    const roomId = '1111784312875012177'; // Replace with the ID of your target room
    const room = client.channels.cache.get(roomId);

    if (!room) {
      console.log('Invalid room ID');
      return;
    }

    const messages = [
      'سبحان الله',
      'استغفر الله',
      'الحمد لله',
      'الله اكبر',
      'لا اله الى الله',
    ];

    const randomIndex = Math.floor(Math.random() * messages.length);
    const randomMessage = messages[randomIndex];
    room.send(randomMessage)
      .then(() => console.log(`Sent: ${randomMessage}`))
      .catch((error) => console.error(`Error: ${error}`));
  }, 2000); // Change the interval (in milliseconds) between each random message
});

// Account Token
client.login(token);
