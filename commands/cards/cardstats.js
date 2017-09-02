const commando = require('discord.js-commando');
var request = require('request');
var http = require('http');
const createEmbed = require("embed-creator");
var cardstat;


class CStat extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'cstat',
            group: 'cards',
            memberName: 'cstat',
            description: 'Returns cards with specified stat, either as attribute or part of an ability.',
            examples: ['--cstat Health', '--cstat Ability Armor']
        });
    }

    async run(message, args) {
        cardstat = args;
        var options = {
            url: 'https://developer-paragon.epicgames.com/v1/cards/complete',
            setEncoding: 'utf8',
             //This is the only line that is new. `headers` is an object with the headers to request
            headers: {'X-Epic-ApiKey': settings.apikey,
                     'Accept': "application/json" }
    };
function callback(error, response, body) {
   
if (!error && response.statusCode == 200) {
    var info = JSON.parse(body);
    var cardname;
    var dcardnames = "", kcardnames = "", ocardnames = "", ccardnames = "", gcardnames = "";
    var cardsfound = 0;
    
    for(var cardnum = 0; cardnum < info.length; cardnum++)
    {
        var info2 = JSON.stringify(info[cardnum].levels[0].BasicAttributes);
        
        if(info2 === undefined){
            info2 = "";
        }
        else{
        info2 = info2.replace(/"/g, "");
        info2 = info2.slice(1);
        info2 = info2.substr(0, info2.length - 1);
        info2 = info2.toLowerCase();
        if(info2.includes(cardstat.toLowerCase())){
            switch(info[cardnum].affinity){
                case 'Death':
                    dcardnames += info[cardnum].name +"\r\n";
                    break;
                case 'Order':
                    ocardnames += info[cardnum].name +"\r\n";
                    break;
                case 'Growth':
                    gcardnames += info[cardnum].name +"\r\n";
                    break;
                case 'Chaos':
                    ccardnames += info[cardnum].name +"\r\n";
                    break;
                case 'Knowledge':
                    kcardnames += info[cardnum].name +"\r\n";
                    break;
            }
            cardsfound ++;
        }
        else{
            var info3 = JSON.stringify(info[cardnum].levels[9].Abilities);
            info3 = info3.replace(/"/g, "");
            info3 = info3.slice(1);
            info3 = info3.substr(0, info3.length - 2);
            info3 = info3.toLowerCase();
            if(info3.includes(cardstat.toLowerCase()))
                switch(info[cardnum].affinity){
                    case 'Death':
                        dcardnames += info[cardnum].name +"\r\n";
                        break;
                    case 'Order':
                        ocardnames += info[cardnum].name +"\r\n";
                        break;
                    case 'Growth':
                        gcardnames += info[cardnum].name +"\r\n";
                        break;
                    case 'Chaos':
                        ccardnames += info[cardnum].name +"\r\n";
                        break;
                    case 'Knowledge':
                        kcardnames += info[cardnum].name +"\r\n";
                        break;
                }
                cardsfound++;
        }
            
        }
        }
        

    }
    if(cardsfound > 0){
        message.channel.sendEmbed(createEmbed(
            "#cccccc", {name: "mmonney31",icon_url:"http://www.pngall.com/wp-content/uploads/2016/05/PayPal-Donate-Button-Download-PNG-180x180.png",url:"https://www.paypal.me/MattMonnie"}
	    , "Cards found containing " + cardstat + " stat", 
            "Death Cards:" + "\r\n" + dcardnames  + "\r\n"+
            "Order Cards:" + "\r\n" + ocardnames + "\r\n"+
            "Growth Cards:" + "\r\n" + gcardnames + "\r\n"+
            "Chaos Cards:" + "\r\n" + ccardnames + "\r\n"+
            "Knowledge Cards:" + "\r\n" + kcardnames,null,
            {text: "Bot built by mmonney31. Want to help the bot? Donations help with server and development costs. Simply click on mmonney31 at top to donate."}
    ));}
        cardnum = info.length;

}

    request(options, callback);


    }
}


module.exports = CStat;