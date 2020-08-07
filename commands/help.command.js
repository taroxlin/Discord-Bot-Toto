const embeded = `\`\`\``;

module.exports = {
    name: 'help',
    description: 'Lists all commands [no argument]',
    template: '<command>[command/none]',
    args: false,
    aliases: [],
    run(msg, args) {
        const { client } = msg;

          if (args[0]) {
              commandTemplate(client);
            } else {
                commandsEmbeded(msg);
            }
    }
}


const commandsEmbeded = (message) => {
    const { client } = message;
    const { prefix, commands } = client;
    const replay = `Commands:\n  ${commands.map(
        element => ' '.repeat(15 - element.name.length) + element.name + '   -   ' + element.description
    ).join('\n  ')}`;
    return message.channel.send(`${embeded}Server Prefix: ${prefix}\n${replay}\n\nFor more info try use ${prefix}help <command>${embeded}`)
}

const commandsTemplate = (client) => {
    const command = client.commands.get(args[0])
    const basicInfo = `${client.prefix}${command.name} - ${command.description}`
    const replay = `${basicInfo}${command.template ? `\n\nTemplate:   ${command.name} ${command.template}` : ''}`
    msg.channel.send(`${embeded}${replay}${embeded}`)
}