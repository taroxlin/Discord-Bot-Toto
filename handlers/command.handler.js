const { Collection } = require('discord.js')
const { readdirSync} = require('fs')
const ascii = require("ascii-table")
const table = new ascii().setHeading("Command", "Load status","Aliases")
const {defaultPrefix} = require('../config/config')
const log = require('../dev-functions/console.chalk.logger')
const { guildOnly } = require('../commands/clear.command')
const {owner} = require('../config/config')


module.exports = (client)=>{
    const {settings,guild} = client

    /*Commands Loader and viewer in console */
        client.commands = new Collection()
        const commandFiles = readdirSync(__dirname + "/../commands").filter( file => file.endsWith('.command.js'))
        for (const file of commandFiles){
            const command = require(__dirname + `/../commands/${file}`)
            
            if(command.name) {
                client.commands.set(command.name, command)
                table.addRow(file,"✅",command.aliases)
            }else{
                table.addRow(file, "❌ - missing name'!'")
            }
        }
        log(table.toString(),'magenta')


        // On Message Event
        client.on('message', async message => {
            //Check the prefix and real user and its not private
                const {guild, client} = message
                const {settings} = client
                let prefix = defaultPrefix
                if(!!guild && !!settings.get(guild.id).prefix){
                    prefix = settings.get(guild.id).prefix

                }
                client.prefix = prefix

            if (message.author.bot || !message.content.startsWith(client.prefix)) return;
            
            // Slice input for command + args
            const args = message.content.slice(client.prefix.length).trim().split(/ +/g);
            const commandName = args.shift().toLowerCase();
            
            //Look up for raw command or its aliases
            const command = 
            client.commands.get(commandName) ||
            client.commands.find( cmd => cmd.aliases && cmd.aliases.includes(commandName))
            
            //Respond if command is not founded
            if(!command) return message.channel.send(`${commandName} not recognised `)
            //Respond if command guild only is sended in DM
            if(command.guildOnly && !message.guild) return message.channel.send(`Command need to be used at Guild`) 
            //Respond if not have access to command
            if(command.ownerOnly && message.author.tag !== owner) return message.channel.send(`Command can be used only by Developer!`)
            //Respond if command get wrong arguments
            if(command.args && !args.length){
                let replay = `You didnt put expected arguments ${message.author}`
                if (command.template) {
                    replay = `\nTemplate:  \`${client.prefix}${commandName} ${command.template}\`` 
                }
                return message.channel.send(replay)
            }

            // execute the function
            try {
                command.run(message, args)
            } catch (error){
               log(error,'red')
            }
        })
    }