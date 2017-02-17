const commando = require('discord.js-commando');
const client = new commando.Client();
const settings = require('./settings.json');

var http = require('http');

client._commandPrefix = "--";
client.registry.registerGroup('cards', 'Cards');
client.registry.registerGroup('playerstats', 'Playerstats');
client.registry.registerDefaults();
client.registry.registerCommandsIn(__dirname + "/commands");

client.on('ready', () => {
    console.log('Bot online');

});



client.login(settings.token);