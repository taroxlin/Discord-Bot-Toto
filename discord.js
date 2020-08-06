const Discord = require('discord.js');
const {token} = require('./config/config')
const log = require('./dev-functions/console.chalk.logger')
const commandHandler = require('./handlers/command.handler')
const settingHandler = require('./handlers/settings.handler')
/* Global vars */

const client = new Discord.Client()


/* Init Command Handler with All commands */ 
 commandHandler(client)
/* Init settings Handler */ 
settingHandler(client)

/* Global funcs*/

/* errors*/
// client.on('debug',(error)=>{
//     log(error,'purple')
// })
// client.on('error',(error)=>{ 
//     log(error,'purple')
// })
// client.on('warn',(error)=>{
//     log(error,'purple')
// })

/* */

client.on("ready", ()=>{
    log(`Zalogowano jako ${client.user.tag}`,'green')
    client.user.setActivity('Destroying human being...')
})



client.login(token)