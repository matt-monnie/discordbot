const commando = require('discord.js-commando');
var sql = require('mysql');
const createEmbed = require("embed-creator");

class Gems extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'gems',
            group: 'counters',
            memberName: 'gems',
            description: 'Returns list of gems.',
            examples: ['--gems all,int', '--gems name'] 
        }
        );
    }
    async run(message, args) {
        con.getConnection(function(err,connection){
            if(err){
                console.log('Error connecting to Db');
                return;
            }
            console.log('Connection established');
        
        let mode = args.split(",")[0];
        args = args.slice(mode.length + 1);
        let thero = args.split(",")[0];
        thero = thero.toLowerCase();
        if(mode.toLowerCase() === "all"){
            let tplayer = args.slice(thero.length + 1);
            //con.query('SELECT & FROM paragon WHERE hero = ?', hero);
            var info = {Stone:thero};
            var gems = "";
            connection.query("SELECT Name FROM gems WHERE ?", info , function(err,rows) {
                if(err) throw err;
                for(var i in rows){
                    gems += rows[i].Name;
                    gems += "\r\n";
                }
		var color;
		switch(thero){
                        case "agi":
                            color = "#F67D20";
                            break;
                        case "vit":
                            color = "#ABf444";
                            break;
                        case "int":
                            color = "#8B4AC0";
                            break;
                    }
                //gems = gems.substr(0,gems.length - 2);
                message.channel.sendEmbed(createEmbed(
                    color,{name: "mmonney31",icon_url:"http://www.pngall.com/wp-content/uploads/2016/05/PayPal-Donate-Button-Download-PNG-180x180.png",url:"https://www.paypal.me/MattMonnie"},"Current " + thero + " gems Available",
                    gems,null,{text: "Bot built by mmonney31 Want to help the bot? Donations help with server and development costs. Simply click on mmonney31 at top to donate."}));
            });
        }
        else {
            connection.query('SELECT * FROM gems WHERE Name = ?', mode, function(err,rows)
            {
                if(err){
                    console.log(err);
                    return;
                }
                if(rows.length > 0){
                    var color;
                    switch(rows[0].Stone){
                        case "AGI":
                            color = "#F67D20";
                            break;
                        case "VIT":
                            color = "#ABf444";
                            break;
                        case "INT":
                            color = "#8B4AC0";
                            break;
                    }
                    message.channel.sendEmbed(createEmbed(
                    color, {name: "mmonney31",icon_url:"http://www.pngall.com/wp-content/uploads/2016/05/PayPal-Donate-Button-Download-PNG-180x180.png",url:"https://www.paypal.me/MattMonnie"},
                    rows[0].Name,
                    rows[0].Descrip + "\r\n" +
                    "Cooldown: " + rows[0].Cooldown +"\r\n" +
                    "Stone: " + rows[0].Stone + "\r\n" + 
                    "Slot: " + rows[0].Slot + "\r\n" +
                    "Shape: " + rows[0].Shape,null,{text: "Bot built by mmonney31 Want to help the bot? Donations help with server and development costs. Simply click on mmonney31 at top to donate."}
                ));}
                else{
                    message.channel.send("Gem not found");
                }
            });
        }
        connection.release();});
    }

}

module.exports = Gems;