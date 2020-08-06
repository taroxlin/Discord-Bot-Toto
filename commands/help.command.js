module.exports = {
    name: 'help',
    description: 'Lists all commands [no argument] / Description Specified command',
    template:'<command>[command/none]',
    args:false,
    aliases :[],
    run(msg, args){
        const {client,guild} = msg
        if(!args[0]){
            const replay = `Commands:\n   ${client.commands.map(element => element.name).join('\n   ')}`
            msg.channel.send(`\`\`\`Server Prefix: ${client.prefix}\n${replay}\n\nFor more info try use ${client.prefix}help <command>\`\`\``)
        }else{
            const command = client.commands.get(args[0])
            const basicInfo = `${client.prefix}${command.name} - ${command.description}`
            const replay = `${basicInfo}${command.template?`\n\nTemplate:   ${command.name} ${command.template}`:''}`
            msg.channel.send(`\`\`\`${replay}\`\`\``)
        }
        
    }
}