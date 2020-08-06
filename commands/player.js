const fetch = require('node-fetch')
module.exports = {
    name: 'player',
    description: '',
    template:'',
    args:true,
    guildOnly:true,
    aliases :[],
    async run(msg,args){
        const player = args.join(" ")
        const link = `https://api.tibiadata.com/v2/characters/${player}.json`
        fetch(link)
        .then(response => response.json())
        .then(data => {console.log(data)
            data.characters.other_characters.map(i=>console.log(i))
        })
        
    }
}