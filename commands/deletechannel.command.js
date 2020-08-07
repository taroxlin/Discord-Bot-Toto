module.exports = {
    name: 'delchannel',
    description: 'Deleting a channel with name',
    template: '<name>',
    args: true,
    adminOnly: true,
    guildOnly: true,
    aliases: [],
    run(msg, args) {
        const name = args.join(" ");
        //Check name
        if (name) {
            try {
                const fetchChannel = msg.guild.channels.cache.find(channel => channel.name === name);
                fetchChannel.delete();
            }
            catch (error) {
                console.log(error);
            }
        }
        return msg.channel.send(
            'Name of channel is invalid!'
        )
    }
}