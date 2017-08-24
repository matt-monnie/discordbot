const commando = require('discord.js-commando');
var request = require('request');
var http = require('http');
const createEmbed = require("embed-creator");


class Card extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'card',
            group: 'cards',
            memberName: 'card',
            description: 'Returns image for card',
            examples: ['--card Meltdown', '--card meltdown']
        });
    }

    async run(message, args) {
        var options = {
            url: 'https://developer-paragon.epicgames.com/v1/cards/complete',
            setEncoding: 'utf8',
             //This is the only line that is new. `headers` is an object with the headers to request
            headers: {'X-Epic-ApiKey': '6c9ac24573e1423ab4fd2ef09ce3c167',
                     'Accept': "application/json" }
    };
function callback(error, response, body) {
   
if (!error && response.statusCode == 200) {
    var info = JSON.parse(body);
    var info2 = "";
    var info3 = "";
    var cardname;
    var image_url, name, trait, rarity, affinity, goldcost, icost, vcost, dcost, i,
    multi_cards = [], cardidx = 0, ability1 = "", ability2 = "", abildes, abil1name = "", abil2name = "",
    manacost = "",
    cooldown = "",
    color,
    cardfound = 0;
    for(var cardnum = 0; cardnum < info.length; cardnum++)
    {
        cardname = info[cardnum].name.toLowerCase();
        if(cardname.includes(args.toLowerCase()))
        {
            multi_cards[cardidx] = info[cardnum].name;
            cardfound = cardnum;
            cardidx++;
        }

    }
    if(cardidx == 1)
    {
        cardnum = cardfound;
        image_url = "https:" + info[cardnum].levels[9].images.large;
        rarity = info[cardnum].rarity;
        affinity = info[cardnum].affinity;
        goldcost = info[cardnum].goldCost;
        icost = info[cardnum].intellectGemCost;
        vcost = info[cardnum].vitalityGemCost;
        dcost = info[cardnum].dexterityGemCost;
        trait = info[cardnum].trait;
        if(trait === "DiscardOnDeath")
            trait = "Discard On Death";
        if(trait === "CanNotDiscard")
            trait = "Cannot Discard";
        if(info[cardnum].levels[0].basicAttributes === undefined){
            info2 = "";
        }
        else{
            for(var i = 0; i<info[cardnum].levels[0].basicAttributes.length;i++){
                info2 += info[cardnum].levels[0].basicAttributes[i].value + " " + info[cardnum].levels[0].basicAttributes[i].name + " ";
            }
        }
        if(info[cardnum].levels[9].abilities === undefined){
            info3 = "";
        }
        else{
            for(var i = 0; i < info[cardnum].levels[9].abilities.length; i++){
                var cd = info[cardnum].levels[9].abilities[i].cooldown
                cd = cd.slice(17);
                var mc = info[cardnum].levels[9].abilities[i].manacost
                mc = mc.slice(16)
                info3 += info[cardnum].levels[9].abilities[i].name + ":\r\n" + info[cardnum].levels[9].abilities[i].description + "\r\nCooldown: " 
                + cd + "\r\nMana Cost: " + mc
            }
        }
        switch(affinity){
            case "Chaos":
                color = "#cc0000";
                break;
            case "Death":
                color = "#7e2f8c";
                break;
            case "Knowledge":
                color = "#0099ff";
                break;
            case "Order":
                color = "#ffffcc";
                break;
            case "Growth":
                color = "#33cc33";
                break;
            default:
                color = "#444444";
                break;
        }
	
        var desrip = "Affinity: " + affinity + "\r\n" +
            "Rarity: " + rarity + "\r\n" +
            "Gold Cost: " + goldcost + "\r\n" +
            "Trait: " + trait + "\r\n" +
            "Intellect Gem Cost: " + icost + "\r\n" +
            "Vitality Gem Cost: " + vcost + "\r\n" +
            "Agility Gem Cost: " + dcost + "\r\n" +
            "Basic Attributes: " + info2 +"\r\n" +
            "Abilities: " + "\r\n" + info3 + "\r\n";
        var displayname = info[cardnum].name;
        displayname.fontcolor(color);
        message.channel.sendEmbed(createEmbed(
            color, {name: "mmonney31",icon_url:"http://www.pngall.com/wp-content/uploads/2016/05/PayPal-Donate-Button-Download-PNG-180x180.png",url:"https://www.paypal.me/MattMonnie"}
	    , displayname, 
            desrip,null,
            {text: "Bot built by mmonney31 Want to help the bot? Donations help with server and development costs. Simply click on mmonney31 at top to donate."}, image_url, false
        ));
        cardnum = info.length;
    }
    else if(cardidx > 1)
    {
        var card_text = "";
        for(var idx = 0; idx < multi_cards.length; idx++)
        {
            card_text += multi_cards[idx] + " , ";
        }
        color = '#47525A';
        message.channel.sendEmbed(createEmbed(
        color, null,
        "Multiple cards found containing: " + args,
        card_text,
        null,
        null,
        null
        ));
    }
    else
        message.channel.sendMessage(args + " not found");





   
}
}

    request(options, callback);


    }
}


module.exports = Card;