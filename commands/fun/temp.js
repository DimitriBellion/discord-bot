const { RichEmbed } = require('discord.js');
const weather = require('weather-js');

module.exports = {
    name: "temp",
    run: (client, message, args) => {
        // console.log('Entrou aqui')
        weather.find({ search: args.join(" "), degreeType: 'C' }, function (err, result) {
            if (err) message.channel.send(err);
            if (result === undefined || result.length === 0) {
                message.channel.send('**Por favor insira um local!**')
                return;
            }
            var current = result[0].current;
            var location = result[0].location;
            const embed = new RichEmbed()
                .setDescription(`**${current.skytext}**`)
                .setAuthor(`Tempo para ${current.observationpoint}`)
                .setThumbnail(current.imageUrl)
                .setColor(0x00AE86)
                .addField('Fuso horário', `UTC${location.timezone}`, true)
                .addField('Tipo de Grau', location.degreetype, true)
                .addField('Temperatura', `${current.temperature} Graus`, true)
                .addField('Parece', `${current.feelslike} Graus`, true)
                .addField('Ventos', current.winddisplay, true)
                .addField('Umidade', `${current.humidity}%`, true)
            message.channel.send({ embed });
        })
    }
}