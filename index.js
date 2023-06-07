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
    .setDetails('Free Fire')
    .setName('Free fire')
    .setState('PLAYING FREE FIRE') // Replace with your desired state
    .setParty({
      max: 999,
      current: 666,
      id: Discord.getUUID(),
    })
    .setAssetsLargeImage('mp:attachments/1101183253546807396/1111776682190327838/IMG-20230526-WA0019.jpg')
    .setAssetsLargeText('PLAYING FF')
    .setAssetsSmallImage('mp:attachments/1101183253546807396/1111776682190327838/IMG-20230526-WA0019.jpg')
    .setAssetsSmallText('MAHDOCH')
    .addButton('LINK YOUTUBE', 'https://youtube.com/@mahdoch_md')
    .addButton('LINK FREE FIRE', 'https://ff.garena.com/en/');

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
