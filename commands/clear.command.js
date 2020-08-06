module.exports ={
    name:'clear',
    description:'Deleting amount of messages in channel.',
    template:'<amount>[1-100]',
    args:true,
    guildOnly:true,
    aliases: ['purge','clean'],
    run(msg, args){
        const {channel} = msg
        const amount = parseInt(args[0])
        if (!Number.isInteger(amount)){
            return channel.send("You must specify the amount of messages to delete!")
        }
        if(amount < 2 || amount > 100){
            return channel.send(
                "Amount of messages need to be 1< x < 100"
            )
        }
        channel.bulkDelete(amount)
    }
}