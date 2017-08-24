const commando = require('discord.js-commando');
var sql = require('mysql');
const createEmbed = require("embed-creator");

var pool = sql.createPool({
        host: "174.138.64.157",
        user: "root",
        password: "pens1187",
        database: "builds"
});


class Counter extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'build',
            group: 'counters',
            memberName: 'build',
            description: 'Returns list of builds for a specified hero.',
            examples: ['--build create,hero,player', '--build get,hero,player', '--build update,hero,player,(start/early/final/link),items/link'] 
        }
        );
    }
    async run(message, args) {
        pool.getConnection(function(err,connection){
            if(err){
                console.log('Error connecting to Db');
                return;
            }
            console.log('Connection established');
        
        let mode = args.split(",")[0];
        args = args.slice(mode.length + 1);
        let thero = args.split(",")[0];

        var playerstr = "" , startstr = "", earlystr = "", finalstr = "", linkstr = "";
        thero = thero.toLowerCase();
        if(mode.toLowerCase() === "create"){
            let tplayer = args.slice(thero.length + 1);
            //con.query('SELECT & FROM paragon WHERE hero = ?', hero);
            if(message.author.username != ('mmonney31' || 'Anothernotch' || 'LadyFootTickler')){
                return;
            }
            var info = {title:thero, player:tplayer};
            connection.query("INSERT INTO build SET ?", info , function(err,result) {
                if(err) throw err;
                console.log("Record Updated");
            });
        }
        else if(mode.toLowerCase() === "update"){
            if(message.author.username != ('mmonney31' || 'Anothernotch' || 'LadyFootTickler')){
                return;
            }
            args = args.slice(thero.length + 1);
            let tplayer = args.split(",")[0];
            args = args.slice(tplayer.length + 1);
            let col = args.split(",")[0];
            let items = args.slice(col.length + 1);

            var info = {};
            switch(col){
                case 'aff':
                    info = {affinities:items};
                    break;
                case 'cards':
                    info = {cards:items}
                    break;
                case 'agi':
                    info = {agi_gems:items};
                    break;
                case 'vit':
                    info = {vit_gems:items};
                    break;
                case 'int':
                    info = {int_gems:items};
                    break;
            }
            var tbuild = {hero:thero, player:tplayer};
            connection.query('UPDATE build SET ? WHERE title = ? && player = ?', [info,thero,tplayer], function(err,result) {
                if(err) throw err;
                console.log("Record Updated");
            });
        }
        else if(mode.toLowerCase() === "getall"){
            var curdecks = "";
            connection.query('SELECT title, player FROM build',function(err,rows){
                if(err) {console.log(err); return;}
                for(var i in rows){
                    curdecks += rows[i].player + ": " + rows[i].title;
                    curdecks += " , ";
                }
                curdecks = curdecks.substr(0,curdecks.length - 2);
                message.channel.sendEmbed(createEmbed(
                    "#cc0000",null,"Current Decks Available",
                    curdecks));
            });
        }
        else if (mode.toLowerCase() === "get"){
            let tplayer = args.slice(thero.length + 1);
            connection.query('SELECT * FROM build WHERE title = ? && player = ?', [thero, tplayer], function(err,rows)
            {
                if(err){
                    console.log(err);
                    return;
                }
                    message.channel.sendEmbed(createEmbed(
                    "#cc0000", null,
                    "Build by " + tplayer + " for " + thero,
                    "Title: " + rows[0].title + "\r\n" +
                    "Affinities: " + rows[0].affinities +"\r\n" +
                    "Cards: " + rows[0].cards + "\r\n" + 
                    "AGI Gems: " + rows[0].agi_gems + "\r\n" +
                    "VIT Gems: " + rows[0].vit_gems + "\r\n" +
                    "INT Gems: " + rows[0].int_gems
                    ));
            });
        }
        connection.release();});
    }

}

module.exports = Counter;