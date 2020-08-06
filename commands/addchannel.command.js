

module.exports = {
    name: "addchannel",
    description: "Adding a channel",
    template:'<type>[voice/text] <name>',
    args:true,
    guildOnly:true,
    run(msg,args){
        const {guild} = msg
        const type = args.shift();
        const channelName = args.join(" ")
        if (type !== 'text' && type !== 'voice')
            return msg.channel.send('Type argument need to be (voice/text)!')
        if (!channelName){
            return msg.channel.send('Name of channel not provided!')
        }
        guild.channels.create(channelName,{type: type})
    
}
}