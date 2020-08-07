const { MessageEmbed } = require('discord.js');
const { owner, version } = require('../config/config')


module.exports = {
    name: 'info',
    args: false,
    description: 'Info about bot and author',
    aliases: ['version', 'v', 'ver'],
    run(message) {
        try {
            message.channel.send(exampleEmbed)
        }
        catch (error) {
            console.log(error)
        }
    }
}


//Embeded message template
const exampleEmbed = new MessageEmbed()
.setColor('#0099ff')
.setTitle('Toto Bot')
.setURL('')
.setAuthor('Bulus', 'https://imgur.com/lrjrGde.png', '')
.setDescription('')
.setThumbnail('https://imgur.com/lrjrGde.png')
.addFields(
    { name: 'In building', value: `Version: ${version}` },
    { name: '\u200B', value: `\u200B` },
    { name: 'Bot Author', value: `${owner}` }
)
.setTimestamp()