module.exports = {
    name: 'queueclear',
    description: 'Clear music queue',
    guildOnly:true,
    exclusiveChannel:true,
    aliases :[],
    run(msg){
        const {client,guild} = msg
        const {settings} = client
        delete settings.get(guild.id).musicQueue
        client.saveConfig(guild.id)
        msg.channel.send('Queue was cleaned !')
        
    }
}