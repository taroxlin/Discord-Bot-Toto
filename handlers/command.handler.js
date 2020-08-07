const { Collection } = require('discord.js');
const { readdirSync } = require('fs');
const ascii = require("ascii-table");
const table = new ascii().setHeading("Command", "Load status", "Aliases");
const { defaultPrefix } = require('../config/config');
const log = require('../dev-functions/console.chalk.logger');
const { guildOnly } = require('../commands/clear.command');
const { owner } = require('../config/config');
const { settings } = require('cluster');
const cacheFinder = require('../dev-functions/cache.finder')

module.exports = (client) => {
    const { settings, guild } = client

    /*Commands Loader and viewer in console */
    client.commands = new Collection()
    const commandFiles = readdirSync(__dirname + "/../commands").filter(file => file.endsWith('.command.js'))
    for (const file of commandFiles) {
        const command = require(__dirname + `/../commands/${file}`)

        if (command.name) {
            client.commands.set(command.name, command)
            table.addRow(file, "✅", command.aliases)
        } else {
            table.addRow(file, "❌ - missing name'!'")
        }
    }
    log(table.toString(), 'magenta')


    // On Message Event
    client.on('message', async message => {
        const { guild, client } = message
        const { settings } = client

        let prefix = defaultPrefix
        //Loading Defined prefix, Use default if not found
        if (!!guild && settings.get(guild.id)) {
            if (settings.get(guild.id).prefix) prefix = settings.get(guild.id).prefix
        }
        client.prefix = prefix

        //Check if command starts with prefix
        if (!message.content.startsWith(client.prefix)) return;

        // Slice input for command + args
        const args = message.content.slice(client.prefix.length).trim().split(/ +/g);
        const commandName = args.shift().toLowerCase();

        //Look up for raw command or its aliases
        const command =
            client.commands.get(commandName) ||
            client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName))

        //Check commands of any errors   
        // execute the function
        if (checkCommand(message, command, commandName, args) ){
            try {
                command.run(message, args)
                
            } catch (error) {
                log(error, 'red')
                log(error.name,'red')
                log(error.message,'red')
                log(error.stack,'red')
            }
        }
        return
    })
}

const checkCommand = (message, command, commandName, args) => {
        const {guild,client} = message
        const {settings} = client
    //Check Sender is a Real Person
    if (message.author.bot) {
        return false;
    }

    //Check That command exist
    if (!command) {
        message.channel.send(`${commandName} not recognised `);
        return false;
    }

    //Checking Guild Only Command
    if (command.guildOnly && !guild) {
        message.channel.send(`Command need to be used at Guild`);
        return false;
    }

    // Checking is exclusive channel commands used
    if(command.exclusiveChannel && settings.get(guild.id).djChannels)
    {
        const channels = settings.get(guild.id).djChannels
        if( !channels.find(elem => elem.id === message.channel.id) ) return
    }

    //Checking Owner Only Command
    if (command.ownerOnly && message.author.tag !== owner) {
        message.channel.send(`Command can be used only by Developer!`);
        return false;
    }

    //Respond if command get wrong arguments
    if (command.args && !args.length) {
        let replay = `You didnt put expected arguments ${message.author}`;
        if (command.template) {
            replay = `\nTemplate:  \`${client.prefix}${commandName} ${command.template}\``
        }
        message.channel.send(replay)
        return false
    }
    return true
}
