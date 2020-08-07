
const ytdlDiscord = require("ytdl-core-discord");
const { repeat } = require("ffmpeg-static");

module.exports = {
  name: 'play',
  description: 'Adding music to queue',
  template: '<url>',
  guildOnly: true,
  exclusiveChannel:true,
  args: true,
  aliases: ['start', 'run'],
  async run(msg, args) {
    const { channel, client, guild } = msg;
    const { settings } = client;
    const serverId = settings.get(guild.id);
    

    //Validate of URL
    if (!isValidUrl(args[0])) return channel.send(`${args[0]} is invalid URL`)
    // Checking that sender is on voice channel.
    if (!msg.member.voice.channel) return channel.send(`You must to be in voice channel!`)
    // play function
    const play = async (connection) => {
      const musicUrl = serverId.musicQueue[0].link
      if(!serverId.repeatSong) channel.send(`Start Playing ${musicUrl}`)
      const stream = await ytdlDiscord(musicUrl, { highWaterMark: 1 << 25 })
      const dispatcher = connection.play(stream, { type: 'opus' })

      dispatcher.on('finish', () => {
        if (serverId.musicQueue.length) {
          repeatSong(serverId, client, guild.id)
          play(connection)
        } else {
          delete serverId.musicQueue
          client.saveConfig(guild.id)
          channel.send('No songs in queue "DISCONNECTING"')
          connection.disconnect()
          delete connection
        }
      })
      dispatcher.on('error', console.error)

    }

    //Use queue Builder
    queueBuilder(settings, guild, channel)

    const video = await ytdlDiscord.getBasicInfo(args[0])
    const musicQueueObject = { link: args[0], author: msg.author.tag, title: video.title }
    serverId.musicQueue.push(musicQueueObject)
    client.saveConfig(guild.id)

    if (!guild.voice || !guild.voice.connection) msg.member.voice.channel.join().then((connection) => {
      play(connection)
    })


  }
}


// queue Builder
const queueBuilder = (settings, guild, channel) => {
  const serverId = settings.get(guild.id)
  if (!serverId) {
    settings.set(guild.id, {})
  }

  if (!serverId.musicQueue) {
    serverId.musicQueue = []
  }
  if (!!serverId.musicQueue.length) {
    channel.send('Song Added To queue')
  }
}


// URL CHECKER
const isValidUrl = (string) => {
  try {
    new URL(string);
  } catch (error) {
    return false;
  }
  return true;
}

//Song Deleting/ Reapeting
const repeatSong = (serverId, client, id) => {
  if(!serverId.repeatSong){
    serverId.musicQueue.shift()
    client.saveConfig(id)
  }
} 