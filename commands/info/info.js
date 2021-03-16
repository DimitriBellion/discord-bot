module.exports = {
    name: "info",
    run: (client, message, args) => {
        message.channel.send({
            embed: {
                color: 1,
                author: {
                    name: client.user.username,
                    icon_url: client.user.avatarURL
                },
                // description: "Online em:\n" + client.guilds.size + "servidores.\nCuidando de:" + client.users.size + "usuários\nEm:" + client.channel.size + "salas",
                description: (`**Nome:** ${message.guild.name}
        **ID**: ${message.guild.id} 
        **Canais:** ${message.guild.channels.size}
        **Membros:** ${message.guild.memberCount}
        **Dono:**
        ${message.guild.owner}`),
                timestamp: new Date(),
                footer: {
                    icon_url: client.user.avatarURL,
                    text: client.user.name
                },
                image: {
                    url: message.guild.avatarURL,
                    image: message.guild.displayAvatarURL
                }
            },
        });
        // message.channel.sendMessage(`BOT ONLINE A TODO VAPOR!!!! <:3_:402534050172239905> `);
    }
}