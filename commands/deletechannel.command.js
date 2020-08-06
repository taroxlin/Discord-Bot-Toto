module.exports = {
    name: 'deletechannel',
    description: 'Deleting a channel with name',
    template:'<name>',
    args:true,
    guildOnly:true,
    aliases :[],
    run(msg, args){
        const name = args.join(" ")
        if(!name) return msg.channel.send('Name of channel is invalid!')
        const fetchChannel = msg.guild.channels.cache.find(channel => channel.name === name)
        fetchChannel.delete();
    }
}