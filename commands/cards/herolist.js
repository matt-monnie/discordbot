const commando = require('discord.js-commando');
var request = require('request');
var http = require('http');
const createEmbed = require("embed-creator");


class HeroList extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'herolist',
            group: 'cards',
            memberName: 'herolist',
            description: 'Returns name for all available heroes'
        });
    }

    async run(message, args) {
        var options = {
            url: 'https://developer-paragon.epicgames.com/v1/heroes',
            setEncoding: 'utf8',
             //This is the only line that is new. `headers` is an object with the headers to request
            headers: {'X-Epic-ApiKey': '6c9ac24573e1423ab4fd2ef09ce3c167',
                     'Accept': "application/json" }
    };
function callback(error, response, body) {
        var info = JSON.parse(body);
        var heronames = "";
        for(var i = 0; i < info.length; i++)
            heronames += info[i].name + "\r\n";
        //console.log(cardnames);
        message.channel.sendEmbed(createEmbed(
            "#ffffff", null,
            "Hero Names",
            heronames
            ));
        }
     
    request(options, callback);


    }
}

module.exports = HeroList;