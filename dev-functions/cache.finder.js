const log  = require('./console.chalk.logger');

module.exports = (msg, search,value) =>{
    let searchArg = null
    let item = null
    let cache = null 

    // Look collection for channel
    if(search ==='channel' || search === 'ch')
    {
        searchArg = 'channels' ;
        cache = msg.guild[searchArg].cache;
        item = cache.find( channel => channel.name.toLowerCase() === value.toLowerCase() )
        if(item){
            const obj = {name : item.name, id:item.id}
            log( JSON.stringify(obj), 'yellow' )
            return obj
        }
    }
    // Look collection for member
    if(search ==='members' || search === 'mem'|| search === 'member')
    {
        searchArg = 'members'; 
        cache = msg.guild[searchArg].cache;
        item = cache.find( member => member.user.username.toLowerCase() === value.toLowerCase() )
        if(item){
            const obj = {name : item.user.username, id:item.user.id}
            log( JSON.stringify(obj), 'yellow' )
            return obj
        }
    }
       log('Not Found','red')  
    return false
}