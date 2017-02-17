const commando = require('discord.js-commando');
var request = require('request');
var http = require('http');
const createEmbed = require("embed-creator");


class StatsHero extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'statshero',
            group: 'playerstats',
            memberName: 'statshero',
            description: 'Returns stats specific to entered player name'
        });
    }

    async run(message, args) {
        let user = args.split(",")[0];
        let hero = args.slice(user.length + 1);
        var userid, heroid;
        var options = {
            url: 'https://developer-paragon.epicgames.com/v1/accounts/find/' + user,
            setEncoding: 'utf8',
             //This is the only line that is new. `headers` is an object with the headers to request
            headers: {'X-Epic-ApiKey': '6c9ac24573e1423ab4fd2ef09ce3c167',
                     'Accept': "application/json" }
    };

function herostats(error,response,body){
    var heroinfo = JSON.parse(body);
    var kills, assists, games, wins, winpercent;
    if(heroinfo.pvp.kills_hero !== undefined)
        kills = heroinfo.pvp.kills_hero;
    if(heroinfo.pvp.assists_hero !== undefined)
        assists = heroinfo.pvp.assists_hero;
    if(heroinfo.pvp.games_played !== undefined){
        games = heroinfo.pvp.games_played;
        if(heroinfo.pvp.games_won !== undefined)
        wins = heroinfo.pvp.games_won;
        winpercent = parseFloat(Math.round(((wins)/games) * 100)).toFixed(2);
    message.channel.sendEmbed(createEmbed(
      "#ffffff", null,
      "Player stats for " + user + " on " + hero,
      "Kills: " + kills +  "\r\n" +
      "Assists: " + assists + "\r\n" +
      "Games Played: " + games + "\r\n" +
      "Games Won: " + wins + "\r\n" + 
      "Win Percent: " + winpercent + "%"
      ));
    }
        
}



function callbackhero(error,response,body){
    var info2 = JSON.parse(body);
    var herofound = 0;
    for(var heronum = 0; heronum < info2.length; heronum++)
    {
        //console.log(info[cardnum].name);
        if(info2[heronum].name.toLowerCase() === hero.toLowerCase())
        {
            herofound = 1;
            heroid = info2[heronum].id;
            heronum = info2.length + 1
            options.url = 'https://developer-paragon.epicgames.com/v1/account/' + userid + "/stats/hero/" + heroid;
            request(options,herostats);
        }
    }
    if(herofound === 0)
        message.channel.sendMessage(hero + " not found");
    
}


function callbackid(error, response, body) {
        var info = JSON.parse(body);
        if(info.accountId !== undefined){
            userid = info.accountId;
            options.url = 'https://developer-paragon.epicgames.com/v1/heroes/complete';
            request(options,callbackhero);
        }
        else
            message.channel.sendMessage("Account name not found");
        }
     
    request(options, callbackid);


    }
}

module.exports = StatsHero;