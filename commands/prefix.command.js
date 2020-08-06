const {defaultPrefix} = require('../config/config')

module.exports = {
    name: 'prefix',
    description: 'Sets prefix for a server ',
    template:'<prefix>',
    args:true,
    guildOnly:true,
    aliases :[],
    async run(msg,args){
        const {guild, client} = msg
        
        const {settings} = client
        
        if(!settings.get(guild.id)){
            settings.set(guild.id,{})
        }
        if(args[0] === defaultPrefix){
            delete settings.get(guild.id).prefix
            client.prefix = defaultPrefix
        }else{
         settings.get(guild.id).prefix = args[0]
         client.prefix = args[0]
        }
        client.saveConfig(guild.id)
        msg.channel.send(`Prefix changed. New prefix: ${client.prefix}`)
    }
}