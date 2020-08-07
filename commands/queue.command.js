const embeded = `\`\`\``

module.exports = {
    name: 'queue',
    description: 'Review actual music queue',
    args:false,
    guildOnly:true,
    exclusiveChannel:true,
    aliases :[],
    run(msg){
        const {client, guild} = msg;
        const {settings} = client;
        const queue = settings.get(guild.id).musicQueue;
        if(!queue) return msg.channel.send('Queue is Empty!');

        const queueText = `${embeded}${queue.map((elem,index)=>`(${elem.author}) ${index === 0?'(Playing)':index}: ${elem.title} `).join('\n')}${embeded}`
        msg.channel.send(queueText)
        
    }
}