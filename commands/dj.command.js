const cacheFinder = require('../dev-functions/cache.finder');
const config = require('../config/config');

module.exports = {
    name: 'dj',   // name of command [execute string] (Needed)
    description: 'Setting dj channel/channels', // description of command 
    template:'<action> [add/del/clean] <channelName>[Only For Add]',  // template of command if any
    args:true,   // commands need any arguments to work.
    guildOnly:true, // commands can be exequted only at server channel
    aliases :[],  // other alliases of the command
    run(msg,args){
        const {client, guild} = msg;
        const {settings} = client;
        const action = args.shift()
        if(!settings.get(guild.id).djChannels) settings.get(guild.id).djChannels = []
        let channelArr = '';
        switch(action){
            case 'add':            
                if(!args[0]) return msg.channel.send('No Channel')
                channelArr =  settings.get(guild.id).djChannels
                const channel = cacheFinder(msg, 'channel', args[0])
                if(!channel) return msg.channel.send('Channel not Found!')
                if(!channelArr.find( elem => elem.name === args[0] || elem.id === args[0]))
                {
                    channelArr.push(channel)
                    client.saveConfig(guild.id);
                    return msg.channel.send(`Channel #${args[0]} Added`)

                }
            return
            case 'delete':
            case 'del':
                channelArr =  settings.get(guild.id).djChannels
                if(!args[0]) return msg.channel.send('No Channel')
                if(!channelArr.length) return msg.channel.send('Nothing to Clean')
                
                const channelidx = channelArr.filter( (obj, idx) => {
                    if(obj.name === args[0] || obj.id === args[0])
                    return idx
                })
                channelArr = channelArr.slice(idx,1)
                if(channelArr.length === 0){
                    delete settings.get(guild.id).djChannels
                }
                client.saveConfig(guild.id);
                return
            case 'clean':
            delete settings.get(guild.id).djChannels
            client.saveConfig(guild.id);
            return
            }
    }
}



