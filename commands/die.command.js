module.exports = {
    name: 'die',
    description: 'Roll random number of {number}',
    args: true,
    template: '<number>',
    aliases:['d','dice'],
    run(message, number) {
        if (number > 0) {
            const dieResult = Math.floor(Math.random() * number) + 1
            message.channel.send(`D${number} Rolls: ${dieResult}`)
        }
    }

}

