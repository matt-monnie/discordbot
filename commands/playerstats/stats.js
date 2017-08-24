const commando = require('discord.js-commando');
var request = require('request');
var http = require('http');
const createEmbed = require("embed-creator");


class Stats extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'stats',
            group: 'playerstats',
            memberName: 'stats',
            description: 'Returns stats specific to entered player name',
            examples: ['--stats username']
        });
    }

    async run(message, args) {
        var options = {
            url: 'https://developer-paragon.epicgames.com/v1/accounts/find/' + args,
            setEncoding: 'utf8',
             //This is the only line that is new. `headers` is an object with the headers to request
            headers: {'X-Epic-ApiKey': '6c9ac24573e1423ab4fd2ef09ce3c167',
                     'Accept': "application/json" }
    };
function callbackstats(error,response,body){
    var info2 = JSON.parse(body);
    var kills, deaths, assists, ratio, wins, games, leaves, winpercent, time, days, hours, mins, herodmg,
    corekills,
    towerkills,
    wards;
    kills = info2.pvp.kills_hero;
    deaths = info2.pvp.deaths_hero;
    assists = info2.pvp.assists_hero;
    corekills = info2.pvp.kills_core + info2.pvp.assists_core;
    towerkills = info2.pvp.kills_towers + info2.pvp.assists_towers;
    wards = info2.pvp.placed_rigs;
    wins = info2.pvp.games_won;
    games = info2.pvp.games_played;
    leaves = info2.pvp.games_left - info2.pvp.games_reconnected;
    time = info2.pvp.time_played;
    days = Math.floor(time / 86400).toFixed(0);
    time -= (days * 86400);
    hours = Math.floor(time / 3600).toFixed(0);
    time -= (hours  * 3600);
    mins = Math.floor(time / 60).toFixed(0);
    if(leaves < 0) leaves = 0;
    herodmg = Math.round(info2.pvp.damage_done_hero / games).toFixed(0);
    ratio = parseFloat(Math.round(((kills + assists)/deaths) * 100) /100).toFixed(2);
    winpercent = parseFloat(Math.round((wins/games)*100)).toFixed(2);
    message.channel.sendEmbed(createEmbed(
      "#ffffff", null,
      "Player stats for " + args,
      "KDA: " + kills + "/" + deaths + "/" + assists + " ("+ ratio + ")" + "\r\n" +
      "Win Rate: " + winpercent + "%" + "\r\n" +
      "Time Played: " + days + " Days, " + hours + " Hours, " + mins + " Minutes" + "\r\n" + 
      "Core Kills: " + corekills + "\r\n" +
      "Tower Kills: " + towerkills + "\r\n" +
      "Hero Damage Per Game: " + herodmg, 
      "Wards Placed: " + wards
      ));
}


function callbackid(error, response, body) {
        var info = JSON.parse(body);
        if(info.accountId !== undefined){
            var idnum = info.accountId;
            options.url = 'https://developer-paragon.epicgames.com/v1/account/' + idnum + "/stats";
            request(options, callbackstats);
        }
        else
            message.channel.sendMessage("Account name not found");
        }
     
    request(options, callbackid);


    }
}

module.exports = Stats;