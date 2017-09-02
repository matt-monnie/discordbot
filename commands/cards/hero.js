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
            description: 'Returns stats on hero',
            examples: ['--hero riktor', '--hero phase']
        });
    }

    async run(message, args) {   
        var options = {
            url: 'https://developer-paragon.epicgames.com/v1/heroes/complete',
            setEncoding: 'utf8',
             //This is the only line that is new. `headers` is an object with the headers to request
            headers: {'X-Epic-ApiKey': settings.apikey,
                     'Accept': "application/json" }
    };
function callback(error, response, body) {
   
if (!error && response.statusCode == 200) {
    var info = JSON.parse(body);
    var heroname;
    var image_url, name, attack, affinity1, affinity2, mobility, basicattack, durability, abilityattack,
    abillmbname = "", abillmbdescrip = "", abillmbicon = "https:", 
    abilrmbname = "", abilrmbdescrip = "", 
    abilqname = "", abilqdescrip = "", 
    abilename = "", abiledescrip = "", 
    abilrname = "", abilrdescrip = "", 
    mana,health,healthreg,manareg,attackspd,basicarm,abilityarm,atktime,
    manas,healths,healthregs,manaregs,attackspds,basicarms,abilityarms,atktimes,
    lmbscale,lmbscl,rmbscale,rmbscl,qscale,qscl,escale,escl,rscale,rscl,lmbdmg,rmbdmg,qdmg,edmg,rdmg,
    difficulty,
    traits = [],
    herofound = 0,
    color;
    for(var heronum = 0; heronum < info.length; heronum++)
    {
        heroname = info[heronum].name.toLowerCase();
        //console.log(info[cardnum].name);
        if(heroname.includes(args.toLowerCase()))
        {
            herofound = 1;
            image_url = "https:" + info[heronum].images.icon;
            attack = info[heronum].attack;
            traits = info[heronum].traits;
            affinity1 = info[heronum].affinities[0];
            affinity2 = info[heronum].affinities[1];
            mana = info[heronum].attributesByLevel[0].MaxEnergy;
            health = info[heronum].attributesByLevel[0].MaxHealth;
            healthreg = info[heronum].attributesByLevel[0].HealthRegenRate;
            manareg = info[heronum].attributesByLevel[0].EnergyRegenRate;
            attackspd = info[heronum].attributesByLevel[0].AttackSpeedRating;
            basicarm = info[heronum].attributesByLevel[0].BasicResistanceRating;
            abilityarm = info[heronum].attributesByLevel[0].AbilityResistanceRating;
            atktime = info[heronum].attributesByLevel[0].BaseAttackTime;
            
            manas = (info[heronum].attributesByLevel[1].MaxEnergy - mana).toFixed(3);
            healths = (info[heronum].attributesByLevel[1].MaxHealth - health).toFixed(3);
            healthregs = (info[heronum].attributesByLevel[1].HealthRegenRate - healthreg).toFixed(3);
            manaregs = (info[heronum].attributesByLevel[1].EnergyRegenRate - manareg).toFixed(3);
            attackspds = (info[heronum].attributesByLevel[1].AttackSpeedRating- attackspd).toFixed(3);
            basicarms = (info[heronum].attributesByLevel[1].BasicResistanceRating- basicarm).toFixed(3);
            abilityarms = (info[heronum].attributesByLevel[1].AbilityResistanceRating - abilityarm).toFixed(3);
            atktimes = (info[heronum].attributesByLevel[1].BaseAttackTime - atktime).toFixed(3);

            abillmbicon += info[heronum].abilities[0].images.icon

            lmbscale = (info[heronum].abilities[0].modifiersByLevel[1].damage - info[heronum].abilities[0].modifiersByLevel[0].damage).toFixed(3);
            lmbscl = info[heronum].abilities[0].modifiersByLevel[0].attackratingcoefficient;
            lmbdmg = info[heronum].abilities[0].modifiersByLevel[0].damage
            rmbscale = info[heronum].abilities[1].modifiersByLevel[1].damage - info[heronum].abilities[1].modifiersByLevel[0].damage;
            rmbscl = info[heronum].abilities[1].modifiersByLevel[0].attackratingcoefficient;
            rmbdmg = info[heronum].abilities[1].modifiersByLevel[0].damage
            qscale = info[heronum].abilities[2].modifiersByLevel[1].damage - info[heronum].abilities[2].modifiersByLevel[0].damage;
            qscl = info[heronum].abilities[2].modifiersByLevel[0].attackratingcoefficient;
            qdmg = info[heronum].abilities[2].modifiersByLevel[0].damage
            escale = info[heronum].abilities[3].modifiersByLevel[1].damage - info[heronum].abilities[3].modifiersByLevel[0].damage;
            escl = info[heronum].abilities[3].modifiersByLevel[0].attackratingcoefficient;
            edmg = info[heronum].abilities[3].modifiersByLevel[0].damage
            rscale = info[heronum].abilities[4].modifiersByLevel[1].damage - info[heronum].abilities[4].modifiersByLevel[0].damage;
            rscl = info[heronum].abilities[4].modifiersByLevel[0].attackratingcoefficient;
            rdmg = info[heronum].abilities[4].modifiersByLevel[0].damage

            if((lmbscale === undefined) || (lmbscale !== lmbscale)) lmbscale = 0;
            if((lmbscl === undefined) || (lmbscl !== lmbscl)) lmbscl = 0;
            if((rmbscale === undefined) || (rmbscale !== rmbscale)) rmbscale = 0;
            if((rmbscl === undefined) || (rmbscl !== rmbscl)) rmbscl = 0;
            if((qscale === undefined) || (qscale !== qscale)) qscale = 0;
            if((qscl === undefined) || (qscl !== qscl)) qscl = 0;
            if((escale === undefined) || (escale !== escale)) escale = 0;
            if((escl === undefined) || (escl !== escl)) escl = 0;
            if((rscale === undefined) || (rscale !== rscale)) rscale = 0;
            if((rscl === undefined) || (rscl !== rscl)) rscl = 0;

            if((lmbdmg === undefined) || (lmbdmg !== lmbdmg)) lmbdmg = lmbscl = 0;
            if((rmbdmg === undefined) || (rmbdmg !== rmbdmg)) rmbdmg = rmbscl = 0;
            if((qdmg === undefined) || (qdmg !== qdmg)) qdmg = qscl = 0;
            if((edmg === undefined) || (edmg !== edmg)) edmg = escl = 0;
            if((rdmg === undefined) || (rdmg !== rdmg)) rdmg = rscl = 0;

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
            color, {name: "mmonney31",icon_url:"http://www.pngall.com/wp-content/uploads/2016/05/PayPal-Donate-Button-Download-PNG-180x180.png",url:"https://www.paypal.me/MattMonnie"},
            info[heronum].name,
            "Affinities: " + affinity1 + ", " + affinity2 + "\r\n" +
            "Attack Type: " + attack + "\r\n" +
            "Traits: " + traits + "\r\n" +
            "Difficulty: " + info[heronum].difficulty +
            " , Mobility: " + info[heronum].stats.Mobility + "\r\n" + 
            "BasicAttack: " + info[heronum].stats.BasicAttack  +
            " , AbilityAttack: " + info[heronum].stats.AbilityAttack + "\r\n" +
            "Durability: " + info[heronum].stats.Durability + "\r\n" +
            "LMB/R2: " + info[heronum].abilities[0].name + " [Dmg: " + lmbdmg + " + " + lmbscale + "/lvl + " + "Power/" +lmbscl + "]\r\n" +
            "RMB/R1: " + info[heronum].abilities[1].name + " [Dmg: " + rmbdmg + " + " + rmbscale + "/lvl + " + "Power/" +rmbscl + "]\r\n" +
            "Q/Square: " + info[heronum].abilities[2].name + " [Dmg: " + qdmg + " + " + qscale + "/lvl + " + "Power/" +qscl + "]\r\n" +
            "E/Circle: " + info[heronum].abilities[3].name + " [Dmg: " + edmg + " + " + escale + "/lvl + " + "Power/" +escl + "]\r\n" +
            "R/Triangle: " + info[heronum].abilities[4].name + " [Dmg: " + rdmg + " + " + rscale + "/lvl + " + "Power/" +rscl + "]\r\n" +
            "Health: " + health + "(+" + healths + " per level)" + "\r\n" +
            "Health Regen: " + healthreg + "(+" + healthregs + " per level)" + "\r\n" +
            "Mana: " + mana + "(+" + manas + " per level)" + "\r\n" +
            "Mana Regen: " + manareg + "(+" + manaregs + " per level)" + "\r\n" +
            "Attack Speed: " + attackspd + "(+" + attackspds + " per level)" + "\r\n" +
            "Basic Attack Time: " + atktime + "(+" + atktimes+ " per level)" + "\r\n" +
            "Basic Armor: " + basicarm + "(+" + basicarms + " per level)" + "\r\n" +
            "Ability Armor: " + abilityarm + "(+" + abilityarms + " per level)" + "\r\n" ,
            null,
            {text: "Bot built by mmonney31. Want to help the bot? Donations help with server and development costs. Simply click on mmonney31 at top to donate"},
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