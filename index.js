const commando = require('discord.js-commando');
const client = new commando.Client();
global.settings = require('./settings.json');
const sql = require('mysql');

var http = require('http');

client._commandPrefix = "--";
client.registry.registerGroup('cards', 'Cards');
client.registry.registerGroup('playerstats', 'Playerstats');
client.registry.registerGroup('counters','Counters');
client.registry.registerGroup('build', 'Build');
client.registry.registerDefaults();
client.registry.registerCommandsIn(__dirname + "/commands");

client.on('ready', () => {
    console.log('Bot online');

});

global.con = sql.createPool({
    settings.sqlCon
});

module.exports = con;




client.login(settings.token);
