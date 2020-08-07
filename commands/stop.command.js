module.exports = {
    name: 'stop',
    description: 'Delete whole playlist and leave the channel',
    args:false,
    guildOnly:true,
    exclusiveChannel:true,
    aliases :['leave'],
    run(msg){
        const {client, guild} = msg
        const {settings} = client
        const connection = guild.voice.connection.dispatcher
        if(!guild.voice.connection) return msg.channel.send('Bot is not connected!')

        settings.get(guild.id).musicQueue.length = 0;
        client.saveConfig(guild.id)
        connection.end()
        
        
    }
}