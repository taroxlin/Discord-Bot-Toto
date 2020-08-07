module.exports = {
    name: 'clear',
    description: 'Deleting amount of messages in channel.',
    template: '<amount>[1-100]',
    args: true,
    adminOnly: true,
    guildOnly: true,
    aliases: ['purge', 'clean'],
    run( msg, args ) {
        const { channel } = msg;
        const amount = parseInt( args[0] );
        // Execute cleaning channel
        if ( checkArgument( channel ,amount ) ) {
            console.log('1pass')
            try {
                console.log('2pass')
                channel.bulkDelete( amount );
            }
            catch ( error ) {
                console.log( error );
            }
        }
    }
}

//Checking that amount parameter pass the requirments
const checkArgument = ( channel, amount ) => {
    if ( !Number.isInteger( amount )) {
        channel.send(
            "You must specify the amount of messages to delete!"
            );
        return false;
        }
    if ( amount < 2 || amount > 100 ) {
        channel.send(
            "Amount of messages need to be 1< x < 100"
            );
        return false;
    }
    return true;
}



