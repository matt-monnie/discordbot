const commando = require('discord.js-commando');
var request = require('request');
var http = require('http');
const createEmbed = require("embed-creator");

class Hero extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'hero',
            group: 'cards',
            memberName: 'hero',
            description: 'Returns stats on hero'
        });
    }

    async run(message, args) {   
        var options = {
            url: 'https://developer-paragon.epicgames.com/v1/heroes/complete',
            setEncoding: 'utf8',
             //This is the only line that is new. `headers` is an object with the headers to request
            headers: {'X-Epic-ApiKey': '6c9ac24573e1423ab4fd2ef09ce3c167',
                     'Accept': "application/json" }
    };
function callback(error, response, body) {
   
if (!error && response.statusCode == 200) {
    var info = JSON.parse(body);
    var image_url, name, attack, affinity1, affinity2, mobility, basicattack, durability, abilityattack,
    abillmbname = "", abillmbdescrip = "", abillmbicon = "https:", 
    abilrmbname = "", abilrmbdescrip = "", 
    abilqname = "", abilqdescrip = "", 
    abilename = "", abiledescrip = "", 
    abilrname = "", abilrdescrip = "", 
    difficulty,
    traits = [],
    herofound = 0,
    color;
    for(var heronum = 0; heronum < info.length; heronum++)
    {
        //console.log(info[cardnum].name);
        if(info[heronum].name.toLowerCase() === args.toLowerCase())
        {
            herofound = 1;
            image_url = "https:" + info[heronum].images.icon;
            attack = info[heronum].attack;
            traits = info[heronum].traits;
            affinity1 = info[heronum].affinities[0];
            affinity2 = info[heronum].affinities[1];
            abillmbicon += info[heronum].abilities[0].images.icon

            switch(affinity1){
                case "Fury":
                    color = "#cc0000";
                    break;
                case "Corruption":
                    color = "#7e2f8c";
                    break;
                case "Intellect":
                    color = "#0099ff";
                    break;
                case "Order":
                    color = "#ffffcc";
                    break;
                case "Growth":
                    color = "#33cc33";
                    break;
            }
            message.channel.sendEmbed(createEmbed(
            color, null,
            info[heronum].name,
            "Affinities: " + affinity1 + ", " + affinity2 + "\r\n" +
            "Attack Type: " + attack + "\r\n" +
            "Traits: " + traits + "\r\n" +
            "Difficulty: " + info[heronum].difficulty + "\r\n" +
            "Mobility: " + info[heronum].stats.Mobility + "\r\n" + 
            "BasicAttack: " + info[heronum].stats.BasicAttack + "\r\n" +
            "Durability: " + info[heronum].stats.Durability + "\r\n" +
            "AbilityAttack: " + info[heronum].stats.AbilityAttack + "\r\n" +
            "LMB/R2: " + info[heronum].abilities[0].name + "\r\n" +
            "RMB/R1: " + info[heronum].abilities[1].name + "\r\n" +
            "Q/Square: " + info[heronum].abilities[2].name + "\r\n" +
            "E/Circle: " + info[heronum].abilities[3].name + "\r\n" +
            "R/Triangle: " + info[heronum].abilities[4].name + "\r\n",
            null,
            null,
            image_url
            ));
            heronum = info.length;
        }
    } 
    if(herofound === 0)
        message.channel.sendMessage(args + " not found");

}
}

    request(options, callback);


    }
}

module.exports = Hero;