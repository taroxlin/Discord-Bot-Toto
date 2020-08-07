const {defaultPrefix} = require('../config/config')

module.exports = {
    name: 'prefix',
    description: 'Sets prefix for a server ',
    template:'<prefix>',
    args:true,
    adminOnly:true,
    guildOnly:true,
    aliases :[],
    async run(msg,args){
        const {guild, client} = msg;
        const {settings} = client;
        const serverId = settings.get(guild.id)
        
        if(!serverId) {
            settings.set(guild.id,{})
        }
        if(args[0] === defaultPrefix) {
            delete serverId.prefix;
            client.prefix = defaultPrefix;
        } else {
         serverId.prefix = args[0];
         client.prefix = args[0];
        }
        client.saveConfig(guild.id);
        msg.channel.send(`Prefix changed. New prefix: ${client.prefix}`);
    }
}