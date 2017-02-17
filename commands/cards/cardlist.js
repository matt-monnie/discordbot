const commando = require('discord.js-commando');
var request = require('request');
var http = require('http');
const createEmbed = require("embed-creator");


class CardList extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'cardlist',
            group: 'cards',
            memberName: 'cardlist',
            description: 'Returns name for all available cards'
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
        var info = JSON.parse(body);
        var cardnamesgrowth = "";
        var cardnamesfury = "";
        var cardnamescorruption = "";
        var cardnamesintellect = "";
        var cardnamesorder = "";
        var cardnamesuniversal = "";
        for(var i = 0; i < info.length; i++){
            switch(info[i].affinities[0]){
                case "Fury":
                    cardnamesfury += info[i].name + "\r\n";
                    break;
                case "Growth":
                    cardnamesgrowth += info[i].name + "\r\n";
                    break;
                case "Corruption":
                    cardnamescorruption += info[i].name + "\r\n";
                    break;
                case "Order":
                    cardnamesorder += info[i].name + "\r\n";
                    break;
                case "Intellect":
                    cardnamesintellect += info[i].name + "\r\n";
                    break;  
                case "Universal":
                    cardnamesuniversal += info[i].name + "\r\n";
                    break;
            }
        }
        //console.log(cardnames);
        switch(args.toLowerCase()){
            case "fury":
                message.channel.sendEmbed(createEmbed(
                    "#cc0000", null,
                    "Fury Card Names",
                    cardnamesfury
                 ));
                 break;
            case "corruption":
                message.channel.sendEmbed(createEmbed(
                    "#7e2f8c", null,
                    "Corruption Card Names",
                    cardnamescorruption
                ));
                break;
            case "intellect":
                message.channel.sendEmbed(createEmbed(
                    "#0099ff", null,
                    "Intellect Card Names",
                    cardnamesintellect
                ));
                break;
            case "order":
                message.channel.sendEmbed(createEmbed(
                    "#ffffcc", null,
                    "Order Card Names",
                    cardnamesorder
                ));
                break;
            case "growth":
                message.channel.sendEmbed(createEmbed(
                    "#33cc33", null,
                    "Growth Card Names",
                    cardnamesgrowth
                ));
                break;
            case "universal":
                message.channel.sendEmbed(createEmbed(
                    "#ffffff", null,
                    "Universal Card Names",
                    cardnamesuniversal
                ));
                break;
            default:
                message.channel.sendMessage("Affinity unknown");
        }
        }
     
    request(options, callback);


    }
}

module.exports = CardList;