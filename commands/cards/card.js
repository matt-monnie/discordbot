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
            examples: ['!card Meltdown', '!card meltdown'],
            prefix: "-"
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
    var image_url, name, slotType, rarity, affinity, cost, i,
    maxedEffectType = " ", 
    maxedEffectType2 = "",
    maxedEffectValue = " ",
    maxedEffectValue2 = "",
    ActiveEffect = "",
    cooldown = "Passive Effect",
    effectName = [],
    effectValue = [],
    percent = "",
    percent2 = "",
    color,
    unique ="",
    unique2 = "",
    cardfound = 0;
    for(var cardnum = 0; cardnum < info.length; cardnum++)
    {
        //console.log(info[cardnum].name);
        if(info[cardnum].name.toLowerCase() === args.toLowerCase())
        {
            cardfound = 1;
            image_url = "https:" + info[cardnum].images.medium_stats;
            slotType = info[cardnum].slotType;
            rarity = info[cardnum].rarity;
            affinity = info[cardnum].affinities[0];
            cost = info[cardnum].cost;
            if(info[cardnum].maxedEffects.length > 0){
                if(info[cardnum].maxedEffects[0]["unique"] !== undefined)
                    unique = "(Unique)";
                if(info[cardnum].maxedEffects[0]["description"] === undefined){
                maxedEffectType = info[cardnum].maxedEffects[0].stat;
                maxedEffectValue = info[cardnum].maxedEffects[0].value;
                if(info[cardnum].maxedEffects.length > 1){
                if(info[cardnum].maxedEffects[1]["unique"] !== undefined)
                    unique2 = "(Unique)";
                maxedEffectType2 = info[cardnum].maxedEffects[1].stat;
                maxedEffectValue2 = info[cardnum].maxedEffects[1].value;
                switch(maxedEffectType2){
                    case "AttackRating":
                        maxedEffectType2 = " Power";
                        break;
                    case "CriticalDamageBonus":
                        maxedEffectType2 = " Crit Bonus";
                        maxedEffectValue2 = "100%"
                        break;
                    case "CriticalDamageChance":
                        maxedEffectType2 = " Crit Chance";
                        maxedEffectValue2 = 100 * maxedEffectValue;
                        percent2 = "%";
                        break;
                    case "EnergyRegenRate":
                        maxedEffectType2 = " Mana Regen";
                        break;
                    case "AttackSpeedRating":
                        maxedEffectType2 = " Attack Speed";
                        break;
                    case "LifeStealRating":
                        maxedEffectType2 = " LifeSteal";
                        break;
                    case "HealthRegenRate":
                        maxedEffectType2 = " Health Regen";
                        break;
                    case "AbilityPenetrationRating":
                        maxedEffectType2 = " Ability Pen";
                        break;
                    case "MaxEnergy":
                        maxedEffectType2 = " Max Mana";
                        break;
                    case "BasicPenetrationRating":
                        maxedEffectType2 = " Basic Pen";
                        break;
                    case "CooldownReductionPercentage":
                        maxedEffectType2 = " Cooldown Reduction";
                        maxedEffectValue2 *= 100;
                        percent2 = "%"
                        break;
                    case "AbilityResistanceRating":
                        maxedEffectType2 = " Ability Armor";
                        break;
                    case "BasicResistanceRating":
                        maxedEffectType2 = " Basic Armor";
                        break;
                    default:
                        maxedEffectType2 = "";
                        break;

                }
                }
                switch(maxedEffectType){
                    case "AttackRating":
                        maxedEffectType = "Power";
                        break;
                    case "CriticalDamageBonus":
                        maxedEffectType = "Crit Bonus";
                        maxedEffectValue = "100%"
                        break;
                    case "CriticalDamageChance":
                        maxedEffectType = "Crit Chance";
                        maxedEffectValue = 100 * maxedEffectValue;
                        percent = "%";
                        break;
                    case "EnergyRegenRate":
                        maxedEffectType = "Mana Regen";
                        break;
                    case "AttackSpeedRating":
                        maxedEffectType = "Attack Speed";
                        break;
                    case "LifeStealRating":
                        maxedEffectType = "LifeSteal";
                        break;
                    case "HealthRegenRate":
                        maxedEffectType = "Health Regen";
                        break;
                    case "AbilityPenetrationRating":
                        maxedEffectType = "Ability Pen";
                        break;
                    case "MaxEnergy":
                        maxedEffectType = "Max Mana";
                        break;
                    case "BasicPenetrationRating":
                        maxedEffectType = "Basic Pen";
                        break;
                    case "CooldownReductionPercentage":
                        maxedEffectType = "Cooldown Reduction";
                        maxedEffectValue *= 100;
                        percent = "%"
                        break;
                    case "AbilityResistanceRating":
                        maxedEffectType = "Ability Armor";
                        break;
                    case "BasicResistanceRating":
                        maxedEffectType = "Basic Armor";
                        break;
                }
                
                }
                else
                {
                    maxedEffectType = info[cardnum].maxedEffects[0].description;
                }
            }
            for(i = 0; i < info[cardnum].effects.length; i++)
            {
                if(info[cardnum].effects[i]["description"] === undefined){
                    effectName[i] = info[cardnum].effects[i].stat;
                    effectValue[i] = info[cardnum].effects[i].value;
                    
                }
                else{
                    ActiveEffect += info[cardnum].effects[i]["description"];
                    if(slotType === "Active")
                        if(info[cardnum].effects[i]["cooldown"] !== undefined)
                        cooldown = info[cardnum].effects[i]["cooldown"] + " sec";
                }
            }
            switch(affinity){
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
            info[cardnum].name,
            slotType + "\r\n" +
            "Affinity: " + affinity + "\r\n" +
            "Rarity: " + rarity + "\r\n" +
            "Cost: " + cost + "\r\n" +
            "Maxed Effect: " + maxedEffectValue + percent + " " + maxedEffectType + unique + 
                             " " +  maxedEffectValue2 + percent2 + " " + maxedEffectType2 + unique2 + "\r\n" +
            "Effect: " + ActiveEffect + "\r\n" +
            "Cooldown: " + cooldown,
            null,
            null,
            image_url
            ));
            cardnum = info.length;
             maxedEffectType = ""; 
            maxedEffectType2 = "";
            maxedEffectValue = "";
            maxedEffectValue2 = "";
            ActiveEffect = "";
        }
    } 
    if(cardfound === 0)
        message.channel.sendMessage(args + " not found");





   
}
}

    request(options, callback);


    }
}

module.exports = Card;