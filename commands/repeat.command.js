module.exports = {
    name: 'repeat',
    description: 'Looping song',
    template:'<boolean>[true/false]',
    args:true,
    exclusiveChannel:true,
    guildOnly:true,
    aliases :['repeatsong','loop','looper'],
    run(msg,args){
            const {client, guild} = msg;
            const {settings} = client;   
            const serverID = settings.get(guild.id)
            const bool = args[0] === 'true' || args[0] ==='false' ? ( args[0] === 'true' ? true : false) : null
            if(typeof bool !== 'boolean')
            {
                                return msg.channel.send(`Argument is wrong type!! [true/false]`)
            }
            
            serverID.repeatSong = args[0];
            client.saveConfig(guild.id);
            return msg.channel.send(`Repeating song set on ${bool}!`)
    }
}