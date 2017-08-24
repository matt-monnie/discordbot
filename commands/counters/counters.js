const commando = require('discord.js-commando');
var sql = require('mysql')
const createEmbed = require("embed-creator");

class Counter extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'counter',
            group: 'counters',
            memberName: 'counter',
            description: 'Returns list of counters for a specified hero.'
        });

    }
    async run(message, args) {
        let mode = args.split(",")[0];
        args = args.slice(mode.length + 1);
        let thero = args.split(",")[0];
        let therocounter = args.slice(thero.length + 1);

        con.connect(function(err){
            if(err){
                console.log('Error connecting to Db');
                return;
            }
            console.log('Connection established');
        });

        var countersstr = "";
        thero = thero.toLowerCase();
        if(mode.toLowerCase() === "add"){
            //con.query('SELECT & FROM paragon WHERE hero = ?', hero);
            var info = {hero:thero, counters:therocounter};
            con.query("INSERT INTO counter SET ?", info , function(err,result) {
                if(err) throw err;
                console.log("Record Updated");
            });
        }
        else if (mode.toLowerCase() === "get"){
            con.query('SELECT * FROM counter WHERE hero = ?', [thero], function(err,rows)
            {
                if(err){
                    console.log(err);
                    return;
                }
                for(var i in rows){
                    countersstr += rows[i].counters + " , ";
                }

                message.channel.sendEmbed(createEmbed(
                    "#cc0000", null,
                    "",
                    "Hero: " + thero + "\r\n" +
                    "Counters: " + countersstr
                 ));
            });
        }
    }

}

module.exports = Counter;