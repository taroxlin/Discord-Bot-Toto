module.exports = {
    name: 'skip',
    description: 'Skipping actual playing song',
    guildOnly:true,
    exclusiveChannel:true,
    aliases :['next'],
    run(msg){
        const {client, guild} = msg
        const {settings} = client
        const serverQueue = settings.get(guild.id).musicQueue
        const connection = guild.voice.connection.dispatcher
        if(!msg.member.voice.channel) return msg.channel.send("You have to be in a voice channel to skip the song!")
        if(!connection) return msg.channel.send('bot is not connected')
        if (!serverQueue) return msg.channel.send("There is no song that I could skip!");
        if (settings.get(guild.id).repeatSong) 
        {
            settings.get(guild.id).musicQueue.shift()
            client.saveConfig(guild.id)
        }
        connection.end()
    }
}