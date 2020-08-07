module.exports = {
    name: "addchannel",
    description: "Adding a channel",
    template: '<type>[voice/text] <name>',
    args: true,
    adminOnly: true,
    guildOnly: true,
    run( msg, args ) {
        const { guild } = msg;
        const type = args.shift();
        const channelName = args.join(" ");


        if ( checkArguments( type, channelName ) ) {
            try {
                guild.channels.create( channelName, { type: type });
            }
            catch ( error ) {
                console.log( error );
            }
        }
    }
}


const checkArguments = ( type, channelName ) => {

    if ( type !== 'text' && type !== 'voice' ) {
        msg.channel.send(
            'Type argument need to be (voice/text)!'
            );
        return false;
    }

    if ( !channelName ) {
        msg.channel.send(
            'Name of channel not provided!'
            );
        return false;
    }
    return true;
}