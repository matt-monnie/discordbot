const commando = require('discord.js-commando');
var request = require('request');
var http = require('http');

class Login extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'login',
            group: 'cards',
            memberName: 'login',
            description: 'Login to epic account'
        });
    }

    async run(message, args) {
        message.author.sendMessage("https://accounts.epicgames.com/login/index?client_id=MjY4NTkxMjcxNzU1MzgyNzg1OnlmRXlUdU5KWnVxTEdpT2JIcnFYRzRJQ2FOSEdqNlpJ&response_type=code");
        var options = {
            url: 'https://accounts.epicgames.com/login/index?client_id=36afd031eee1443f9af0e5c08cc9b152&response_type=code',
            setEncoding: 'utf8',
             //This is the only line that is new. `headers` is an object with the headers to request
    };
    function result(err, response, body){
        console.log(response);
    }
    request(options,result);
    }
}

module.exports = Login;