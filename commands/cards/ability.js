const commando = require('discord.js-commando');
var request = require('request');
var http = require('http');
const createEmbed = require("embed-creator");

class Ability extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'ability',
            group: 'cards',
            memberName: 'ability',
            description: 'Returns information for entered hero ability',
            examples: ['--ability riktor,q', '--ability murdock,square']
        });
    }

    async run(message, args) {
        let hero = args.split(",")[0];
        if(hero[0] === " ") hero = hero.slice(1);
        let skill = args.slice(hero.length + 1);
        if(skill[0] === " ") skill = skill.slice(1);
        switch(skill.toLowerCase()){
            case "square":
                skill = "q";
                break;
            case "circle":
                skill = "e";
                break;
            case "triangle":
                skill = "r";
                break;
            case "r1":
                skill = "rmb";
                break;
            case "r2":
                skill = "lmb";
                break;
            default:
                skill = skill.toLowerCase();
                break;
        }
        var heroid;
        var options = {
            url: 'https://developer-paragon.epicgames.com/v1/heroes/complete',
            setEncoding: 'utf8',
             //This is the only line that is new. `headers` is an object with the headers to request
            headers: {'X-Epic-ApiKey': settings.apikey,
                     'Accept': "application/json" }
    };
    function callback(error, response, body){
        var info2 = JSON.parse(body);
        var heroname;
        var use_mana = 0;
        var passive = 1;
        var abilinf = [];
        var herofound = 0;
        var scaling = [];
        var cooldown = [];
        var manacost = [];
        var basedmg = [];
        var descrip = "", shortdescrip = "";
        var scalestr = "", cdstr = "", manastr = "", basedmgstr = "", silencedurstr = "", movespdstr = "", dmgdurstr = "", durstr = "", splitdmgstr = "",
        radiusstr = "", stunstr = "", numatkstr = "", maxhealthpctstr = "", stackstr = "", maxhealthstr = "", rootdr = "", slowlongstr = "", healthregstr = "", cdrstr = "", atkspstr = "",
        manargstr = "", stundrstr = "", bonusdmgstr = "", ultdurstr = "", lifetimestr = "", cooldownstr = "", slowdurationstr = "", airwalkspd = "", airwalkdur = "", markchancestr = "", 
        shieldstr = "", pingintstr = "", warddurstr = "", stackdurstr = "", stackmaxstr = "", stacknumstr = "", healthpsvstr = "", dmgpsvstr = "", rootshrstr = "", slowsecstr = "", countstr = "",
        raddurstr = "", physarstr = "", rangestr = "";
        var atts = {};
        for (var heronum = 0; heronum < info2.length; heronum++)
        {
            heroname = info2[heronum].name.toLowerCase()
            if(heroname.includes(hero.toLowerCase()))
            {
                herofound = 1;
                for(var abilnum = 0; abilnum < info2[heronum].abilities.length; abilnum++)
                {
                    if(info2[heronum].abilities[abilnum].binding.toLowerCase() === skill)
                    {
                        descrip = info2[heronum].abilities[abilnum].description;
                        shortdescrip = info2[heronum].abilities[abilnum].shortDescription;
                        for(var i = 0; i < info2[heronum].abilities[abilnum].modifiersByLevel.length;i++)
                        {
                            
                            abilinf[i] = JSON.stringify(info2[heronum].abilities[abilnum].modifiersByLevel[i],null,"\t");
                            if(info2[heronum].abilities[abilnum].modifiersByLevel[0].attackratingcoefficient == info2[heronum].abilities[abilnum].modifiersByLevel[1].attackratingcoefficient)
                                scalestr = info2[heronum].abilities[abilnum].modifiersByLevel[i].attackratingcoefficient;
                            else
                                scalestr += info2[heronum].abilities[abilnum].modifiersByLevel[i].attackratingcoefficient;
                            if(info2[heronum].abilities[abilnum].modifiersByLevel[i].cooldown !== undefined){
                            cdstr += info2[heronum].abilities[abilnum].modifiersByLevel[i].cooldown.toFixed(1);
                            passive = 0;}
                            if(info2[heronum].abilities[abilnum].modifiersByLevel[i].energycost !== undefined){
                            manastr += -(info2[heronum].abilities[abilnum].modifiersByLevel[i].energycost);
                            use_mana = 1;}
                            basedmgstr += info2[heronum].abilities[abilnum].modifiersByLevel[i].damage;
                            silencedurstr += info2[heronum].abilities[abilnum].modifiersByLevel[i].silencedur;
                            movespdstr += info2[heronum].abilities[abilnum].modifiersByLevel[i].movespeed;
                            dmgdurstr += info2[heronum].abilities[abilnum].modifiersByLevel[i].damageduration;
                            splitdmgstr += info2[heronum].abilities[abilnum].modifiersByLevel[i].splitdamage;
                            durstr += info2[heronum].abilities[abilnum].modifiersByLevel[i].duration;
                            maxhealthstr += info2[heronum].abilities[abilnum].modifiersByLevel[i].maxhealth;
                            radiusstr += info2[heronum].abilities[abilnum].modifiersByLevel[i].radius;
                            stunstr += info2[heronum].abilities[abilnum].modifiersByLevel[i].stun;
                            numatkstr += info2[heronum].abilities[abilnum].modifiersByLevel[i].numattacks;
                            stackstr += info2[heronum].abilities[abilnum].modifiersByLevel[i].stacks;
                            maxhealthpctstr += info2[heronum].abilities[abilnum].modifiersByLevel[i].maxhealthpercent;
                            rootdr += info2[heronum].abilities[abilnum].modifiersByLevel[i].rootduration;
                            slowlongstr += info2[heronum].abilities[abilnum].modifiersByLevel[i].slowlong;
                            healthregstr += info2[heronum].abilities[abilnum].modifiersByLevel[i].healthregen;
                            cdrstr += info2[heronum].abilities[abilnum].modifiersByLevel[i].cdr;
                            atkspstr += info2[heronum].abilities[abilnum].modifiersByLevel[i].attackspeed;
                            manargstr += info2[heronum].abilities[abilnum].modifiersByLevel[i].manaregen;
                            stundrstr += info2[heronum].abilities[abilnum].modifiersByLevel[i].stunduration;
                            bonusdmgstr += info2[heronum].abilities[abilnum].modifiersByLevel[i].bonusdamage;
                            ultdurstr += info2[heronum].abilities[abilnum].modifiersByLevel[i].ultduration;
                            lifetimestr += info2[heronum].abilities[abilnum].modifiersByLevel[i].lifetime;
                            cooldownstr += info2[heronum].abilities[abilnum].modifiersByLevel[i].cooldown;
                            slowdurationstr += info2[heronum].abilities[abilnum].modifiersByLevel[i].slowduration;
                            airwalkspd += info2[heronum].abilities[abilnum].modifiersByLevel[i].airwalkspeedboost;
                            airwalkdur += info2[heronum].abilities[abilnum].modifiersByLevel[i].airwalkduration;
                            markchancestr += info2[heronum].abilities[abilnum].modifiersByLevel[i].markchance;
                            shieldstr += info2[heronum].abilities[abilnum].modifiersByLevel[i].shield;
                            pingintstr += info2[heronum].abilities[abilnum].modifiersByLevel[i].pinginterval;
                            warddurstr += info2[heronum].abilities[abilnum].modifiersByLevel[i].wardduration;
                            stackmaxstr += info2[heronum].abilities[abilnum].modifiersByLevel[i].stacksmax;
                            stackdurstr += info2[heronum].abilities[abilnum].modifiersByLevel[i].stackduration;
                            stacknumstr += info2[heronum].abilities[abilnum].modifiersByLevel[i].stacknumber;
                            healthpsvstr += info2[heronum].abilities[abilnum].modifiersByLevel[i].healthpassive;
                            dmgpsvstr += info2[heronum].abilities[abilnum].modifiersByLevel[i].damagepassive;
                            rootshrstr += info2[heronum].abilities[abilnum].modifiersByLevel[i].rootshort;
                            slowsecstr += info2[heronum].abilities[abilnum].modifiersByLevel[i].slowsecondary;
                            countstr += info2[heronum].abilities[abilnum].modifiersByLevel[i].count;
                            raddurstr += info2[heronum].abilities[abilnum].modifiersByLevel[i].radduration;
                            physarstr += info2[heronum].abilities[abilnum].modifiersByLevel[i].physarmor;
                            rangestr += info2[heronum].abilities[abilnum].modifiersByLevel[i].range;
                            if(i<info2[heronum].abilities[abilnum].modifiersByLevel.length-1)
                            {
                                if(info2[heronum].abilities[abilnum].modifiersByLevel[0].attackratingcoefficient != info2[heronum].abilities[abilnum].modifiersByLevel[1].attackratingcoefficient)
                                    scalestr += "/";
                                pingintstr += "/";
                                warddurstr += "/";
                                stackmaxstr += "/";
                                stackdurstr += "/";
                                stacknumstr += "/";
                                cdstr += "/";
                                manastr += "/";
                                basedmgstr += "/";
                                silencedurstr += "/";
                                movespdstr += "/";
                                dmgdurstr += "/";
                                splitdmgstr += "/";
                                durstr += "/";
                                maxhealthstr += "/";
                                radiusstr += "/";
                                stunstr += "/";
                                numatkstr += "/";
                                maxhealthpctstr += "/";
                                stackstr += "/";
                                rootdr += "/";
                                slowlongstr += "/";
                                healthregstr += "/";
                                cdrstr += "/";
                                atkspstr += "/";
                                manargstr += "/";
                                stundrstr += "/";
                                bonusdmgstr += "/";
                                lifetimestr += "/";
                                ultdurstr += "/";
                                cooldownstr += "/";
                                slowdurationstr += "/";
                                airwalkspd += "/";
                                airwalkdur += "/";
                                markchancestr += "/";
                                shieldstr += "/";
                                healthpsvstr += "/";
                                dmgpsvstr += "/";
                                rootshrstr += "/";
                                slowsecstr += "/";
                                countstr += "/";
                                raddurstr += "/";
                                physarstr += "/";
                                rangestr += "/";
                            }
                        }
                        if(skill === "lmb") 
                        {
                            manastr = 0;
                            abilinf = [];
                        }
                        if(scalestr === undefined)
                            scalestr = "0";
                        if(passive) cdstr = "Passive";
                        if(!use_mana) manastr = 0;

                        descrip = descrip.replace(/{damage}/g, basedmgstr);
                        descrip = descrip.replace(/{movespeed}/g, movespdstr);
                        descrip = descrip.replace(/{silencedur}/g, silencedurstr);
                        descrip = descrip.replace(/{splitdamage}/g, splitdmgstr);
                        descrip = descrip.replace(/{damageduration}/g, dmgdurstr);
                        descrip = descrip.replace(/{duration}/g, durstr);
                        descrip = descrip.replace(/{maxhealth}/g, maxhealthstr);
                        descrip = descrip.replace(/{radius}/g, radiusstr);
                        descrip = descrip.replace(/{stun}/g, stunstr);
                        descrip = descrip.replace(/{numattacks}/g, numatkstr);
                        descrip = descrip.replace(/{maxhealthpercent}/g, maxhealthpctstr);
                        descrip = descrip.replace(/{stacks}/g, stackstr);
                        descrip = descrip.replace(/{rootduration}/g, rootdr);
                        descrip = descrip.replace(/{slowlong}/g, slowlongstr);
                        descrip = descrip.replace(/{healthregen}/g, healthregstr);
                        descrip = descrip.replace(/{attackspeed}/g, atkspstr);
                        descrip = descrip.replace(/{cdr}/g, cdrstr);
                        descrip = descrip.replace(/{manaregen}/g, manargstr);
                        descrip = descrip.replace(/{stunduration}/g, stundrstr);
                        descrip = descrip.replace(/{bonusdamage}/g, bonusdmgstr);
                        descrip = descrip.replace(/{ultduration}/g, ultdurstr);
                        descrip = descrip.replace(/{lifetime}/g, lifetimestr);
                        descrip = descrip.replace(/{cooldown}/g, cooldownstr);
                        descrip = descrip.replace(/{slowduration}/g, slowdurationstr);
                        descrip = descrip.replace(/{airwalkspeedboost}/g, airwalkspd);
                        descrip = descrip.replace(/{airwalkduration}/g, airwalkdur);
                        descrip = descrip.replace(/{markchance}/g, markchancestr);
                        descrip = descrip.replace(/{shield}/g, shieldstr);
                        descrip = descrip.replace(/{stackduration}/g, stackdurstr);
                        descrip = descrip.replace(/{stacknumber}/g, stacknumstr);
                        descrip = descrip.replace(/{stacksmax}/g, stackmaxstr);
                        descrip = descrip.replace(/{wardduration}/g, warddurstr);
                        descrip = descrip.replace(/{pinginterval}/g, pingintstr);
                        descrip = descrip.replace(/{healthpassive}/g, healthpsvstr);
                        descrip = descrip.replace(/{damagepassive}/g, dmgpsvstr);
                        descrip = descrip.replace(/{rootshort}/g, rootshrstr);
                        descrip = descrip.replace(/{slowsecondary}/g, slowsecstr);
                        descrip = descrip.replace(/{count}/g, countstr);
                        descrip = descrip.replace(/{radduration}/g, raddurstr);
                        descrip = descrip.replace(/{physarmor}/g, physarstr);
                        descrip = descrip.replace(/{range}/g, rangestr);
                        descrip = descrip.replace(/{attr:endmg}/g, "Ability Damage");
                        descrip = descrip.replace(/{attr:atkspd}/g, "Attack Speed");
                        descrip = descrip.replace(/{attr:mp}/g, "Mana");
                        descrip = descrip.replace(/{attr:hp}/g, "Health");
                        descrip = descrip.replace(/{attr:enar}/g, "Ability Armor");
                        descrip = descrip.replace(/{attr:physdmg}/g, "Basic Damage");
                        descrip = descrip.replace(/{attr:physar}/g, "Basic Armor");
                        descrip = descrip.replace(/{attr:spd}/g, "Movement Speed");
                        descrip = descrip.replace(/{attr:hpreg}/g, "Health Regen");
                        descrip = descrip.replace(/{attr:mpreg}/g, "Mana Regen");
                        descrip = descrip.replace(/{status:slow}/g, "Slow");
                        descrip = descrip.replace(/{status:slnc}/g, "Silence");
                        descrip = descrip.replace(/{status:stun}/g, "Stun");
                        descrip = descrip.replace(/{status:root}/g, "Root");
                        descrip = descrip.replace(/{status:bleed}/g, "Bleed");

                        shortdescrip = shortdescrip.replace(/{damage}/g, basedmgstr);
                        shortdescrip = shortdescrip.replace(/{movespeed}/g, movespdstr);
                        shortdescrip = shortdescrip.replace(/{silencedur}/g, silencedurstr);
                        shortdescrip = shortdescrip.replace(/{splitdamage}/g, splitdmgstr);
                        shortdescrip = shortdescrip.replace(/{damageduration}/g, dmgdurstr);
                        shortdescrip = shortdescrip.replace(/{duration}/g, durstr);
                        shortdescrip = shortdescrip.replace(/{maxhealth}/g, maxhealthstr);
                        shortdescrip = shortdescrip.replace(/{radius}/g, radiusstr);
                        shortdescrip = shortdescrip.replace(/{stun}/g, stunstr);
                        shortdescrip = shortdescrip.replace(/{numattacks}/g, numatkstr);
                        shortdescrip = shortdescrip.replace(/{maxhealthpercent}/g, maxhealthpctstr);
                        shortdescrip = shortdescrip.replace(/{stacks}/g, stackstr);
                        shortdescrip = shortdescrip.replace(/{rootduration}/g, rootdr);
                        shortdescrip = shortdescrip.replace(/{slowlong}/g, slowlongstr);
                        shortdescrip = shortdescrip.replace(/{healthregen}/g, healthregstr);
                        shortdescrip = shortdescrip.replace(/{attackspeed}/g, atkspstr);
                        shortdescrip = shortdescrip.replace(/{cdr}/g, cdrstr);
                        shortdescrip = shortdescrip.replace(/{manaregen}/g, manargstr);
                        shortdescrip = shortdescrip.replace(/{stunduration}/g, stundrstr);
                        shortdescrip = shortdescrip.replace(/{bonusdamage}/g, bonusdmgstr);
                        shortdescrip = shortdescrip.replace(/{ultduration}/g, ultdurstr);
                        shortdescrip = shortdescrip.replace(/{lifetime}/g, lifetimestr);
                        shortdescrip = shortdescrip.replace(/{cooldown}/g, cooldownstr);
                        shortdescrip = shortdescrip.replace(/{slowduration}/g, slowdurationstr);
                        shortdescrip = shortdescrip.replace(/{airwalkspeedboost}/g, airwalkspd);
                        shortdescrip = shortdescrip.replace(/{airwalkduration}/g, airwalkdur);
                        shortdescrip = shortdescrip.replace(/{markchance}/g, markchancestr);
                        shortdescrip = shortdescrip.replace(/{shield}/g, shieldstr);
                        shortdescrip = shortdescrip.replace(/{stackduration}/g, stackdurstr);
                        shortdescrip = shortdescrip.replace(/{stacknumber}/g, stacknumstr);
                        shortdescrip = shortdescrip.replace(/{stacksmax}/g, stackmaxstr);
                        shortdescrip = shortdescrip.replace(/{wardduration}/g, warddurstr);
                        shortdescrip = shortdescrip.replace(/{pinginterval}/g, pingintstr);
                        shortdescrip = shortdescrip.replace(/{healthpassive}/g, healthpsvstr);
                        shortdescrip = shortdescrip.replace(/{damagepassive}/g, dmgpsvstr);
                        shortdescrip = shortdescrip.replace(/{rootshort}/g, rootshrstr);
                        shortdescrip = shortdescrip.replace(/{slowsecondary}/g, slowsecstr);
                        shortdescrip = shortdescrip.replace(/{count}/g, countstr);
                        shortdescrip = shortdescrip.replace(/{radduration}/g, raddurstr);
                        shortdescrip = shortdescrip.replace(/{physarmor}/g, physarstr);
                        shortdescrip = shortdescrip.replace(/{range}/g, rangestr);
                        shortdescrip = shortdescrip.replace(/{attr:endmg}/g, "Ability Damage");
                        shortdescrip = shortdescrip.replace(/{attr:atkspd}/g, "Attack Speed");
                        shortdescrip = shortdescrip.replace(/{attr:mp}/g, "Mana");
                        shortdescrip = shortdescrip.replace(/{attr:hp}/g, "Health");
                        shortdescrip = shortdescrip.replace(/{attr:enar}/g, "Ability Armor");
                        shortdescrip = shortdescrip.replace(/{attr:physdmg}/g, "Basic Damage");
                        shortdescrip = shortdescrip.replace(/{attr:physar}/g, "Basic Armor");
                        shortdescrip = shortdescrip.replace(/{attr:spd}/g, "Movement Speed");
                        shortdescrip = shortdescrip.replace(/{attr:hpreg}/g, "Health Regen");
                        shortdescrip = shortdescrip.replace(/{attr:mpreg}/g, "Mana Regen");
                        shortdescrip = shortdescrip.replace(/{status:slow}/g, "Slow");
                        shortdescrip = shortdescrip.replace(/{status:slnc}/g, "Silence");
                        shortdescrip = shortdescrip.replace(/{status:stun}/g, "Stun");
                        shortdescrip = shortdescrip.replace(/{status:root}/g, "Root");
                        shortdescrip = shortdescrip.replace(/{status:bleed}/g, "Bleed");
                        
                        var image_url = "https:" + info2[heronum].abilities[abilnum].images.icon;
                        message.channel.sendEmbed(createEmbed(
                            "#ffffff", {name: "mmonney31",icon_url:"http://www.pngall.com/wp-content/uploads/2016/05/PayPal-Donate-Button-Download-PNG-180x180.png",url:"https://www.paypal.me/MattMonnie"},
                            info2[heronum].abilities[abilnum].name,
                            "Description: " + descrip + "\r\n" + 
                            "Short Description:" + "\r\n" + shortdescrip + "\r\n" + 
                            "Scaling: " + scalestr + "\r\n" +
                            "Cooldown(seconds): " + cdstr + "\r\n" +
                            "Mana Cost: " + manastr + "\r\n" ,null,{text: "Bot built by mmonney31 Want to help the bot? Donations help with server and development costs. Simply click on mmonney31 at top to donate."},
                            image_url
                            ));
                    }
                }
            }
        }
        if(!herofound) message.channel.sendMessage("Hero not found");
    }

    request(options,callback);
    }
}

module.exports = Ability;