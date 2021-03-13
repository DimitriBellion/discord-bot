module.exports = (client, message, args) => {
    console.info(`Logado como ${client.user.tag}`);

    let status = [
        // { name: `Divulgando seu server⭐`, type: 'WATCHING', url: 'https://twitch.tv/semnome', },
        // { name: `Version 0.0.1 `, type: 'PLAYING', url: 'https://twitch.tv/semnome', },
        // { name: `Desenvolvido pela 403 Software`, type: 'LISTENING', url: 'https://twitch.tv/semnome', },
        { name: '🌀 Criado por Dimitri / Wendy / Cringe', type: 'STREAMING', url: 'https://twitch.tv/semnome', },
        { name: `s*help`, type: 'STREAMING', url: 'https://twitch.tv/semnome', },
    ];
    function setStatus() {
        let randomStatus = status[Math.floor(Math.random() * status.length)];
        client.user.setPresence({ activity: randomStatus });
    };
    setStatus();
    setInterval(() => setStatus(), 9000);
};