  
const ytdlDiscord = require("ytdl-core-discord");

function isValidUrl(string) {
    try {
      new URL(string);
    } catch (_) {
      return false;  
    }
    return true;
  }



module.exports= {
    name:'play',
    description:'Adding music to queue',
    template:'<url>',
    guildOnly:true,
    args:true,
    aliases: ['start','run'],
    async run(msg, args){
        const {channel, client, guild} = msg
        const {settings} = client
        const server = settings.get(guild.id)


        //Validate of URL
        if(!isValidUrl(args[0])) return channel.send(`${args[0]} is invalid URL`)
        // Checking that sender is on voice channel.
        if(!msg.member.voice.channel) return channel.send(`You must to be in voice channel!`)
        // play function
        const play = async (connection)=>{
            const musicUrl = settings.get(guild.id).musicQueue[0].link
            channel.send(`Start Playing ${musicUrl}`)
            const stream = await ytdlDiscord(musicUrl,{ highWaterMark: 1 << 25 })
            const dispatcher = connection.play(stream ,{type: 'opus'})
            
            
            dispatcher.on('finish', ()=>{
              if(settings.get(guild.id).musicQueue.length){
                settings.get(guild.id).musicQueue.shift()
                client.saveConfig(guild.id)
                         play(connection)
                        }else{
                          delete settings.get(guild.id).musicQueue
                          client.saveConfig(guild.id)
                          channel.send('No songs in queue "DISCONNECTING"')
                          connection.disconnect()
                          delete connection
                        } 
                })
            dispatcher.on('error',console.error)
                
        }
        //
        if(!server){
            settings.set(guild.id,{})
        }
        if(!settings.get(guild.id).musicQueue){
            settings.get(guild.id).musicQueue = []
        }

        if(!!settings.get(guild.id).musicQueue.length){
            channel.send('Song Added To queue')
        }
        const video = await ytdlDiscord.getBasicInfo(args[0])
        const musicQueueObject  = {link:args[0],author:msg.author.tag,title:video.title}
        settings.get(guild.id).musicQueue.push(musicQueueObject)
         client.saveConfig(guild.id)   
        
         
          if(!guild.voice || !guild.voice.connection) msg.member.voice.channel.join().then((connection)=>{
            play(connection)
        })  
         
         
    }
}