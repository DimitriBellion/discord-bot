const Discord = require("discord.js")
const moment = require('moment');

module.exports = {
    name: "status",
    run: (client, message, args, level) => {
        var duration = moment.duration(client.uptime).format(" D [d], H [h], m [m], s [s]");
        let statusembed = new Discord.RichEmbed()
            .setAuthor(message.author.tag, message.author.avatarURL)
            .setThumbnail(client.user.avatarURL)
            .setColor([54, 57, 63])
            .setTitle(`| Estatísticas!`)
            .setDescription(`Minhas Informações De Funcionamento.

**| Utilização de RAM  :** ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB
──────────────────────────────────────
**| Usuários      : ${client.users.size.toLocaleString()}**
──────────────────────────────────────
**| Servidores    : ${client.guilds.size.toLocaleString()}**
──────────────────────────────────────
**| Canais   : ${client.channels.size.toLocaleString()}**
──────────────────────────────────────
**| Node      :  ${process.version}**
──────────────────────────────────────`, { code: "asciidoc" })

        message.channel.send(statusembed).then(msg => msg.delete(30000));

    }

}