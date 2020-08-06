const { Collection } = require('discord.js')
const {readdirSync, readFileSync, writeFileSync} = require("fs")
const yaml = require("js-yaml")


const serverConfigPath = "/config/servers"

module.exports = ( client ) =>{
client.settings = new Collection()
const settingsFiles = readdirSync(__dirname + `/..${serverConfigPath}`).filter(file => file.endsWith(".yaml"))

try {
    for (const file of settingsFiles){
        const settingsFile = readFileSync(__dirname + `/..${serverConfigPath}/${file}`, "utf8")
        const data = yaml.safeLoad(settingsFile)
        const guildId = file.split('.')[0]

        //set server settings
        client.settings.set(guildId, data)

    }
}catch(e){
    console.log(e)
}

client.saveConfig = guildId =>{
    if(client.settings.has(guildId)){
        const config = client.settings.get(guildId)   
        try {
            const yamlStr = yaml.safeDump(config)
            
            writeFileSync(__dirname + `/..${serverConfigPath}/${guildId}.yaml`, yamlStr ,"utf8")
        } catch(err){
            console.log(err)
        }
    }

}

}