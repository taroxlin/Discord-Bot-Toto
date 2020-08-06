module.exports = {
    name: 'check',
    description: 'Private developer ',
    args:false,
    ownerOnly:true,
    guildOnly:false,
    aliases :[],
    run(msg){
        const {client,guild} = msg
        const {settings }= client
        // console.log('msg:',!!msg)
        // console.log('msg.author:',!!msg.author)
        // console.log('tag:',msg.author.tag)
        // console.log('msg.guild.voice.connection ',!!msg.guild.voice.connection)
        console.log('connection: ', typeof settings.get(guild.id).connection)
    }
}