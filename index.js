const { Client, Collection } = require('discord.js');
const { prefix, token } = require('./config/key.json');
const ora = require('ora');
const gradient = require('gradient-string');

const client = new Client();

client.commands = new Collection()
client.aliases = new Collection()

console.log(gradient('cyan', 'pink')('STARTING BOT'));

// const spinning = ora({
//     color: 'green',
//     interval: 180,
//     text: 'Loading',
//     spinner: 'aesthetic'
// });

// const spinner = {
//     async SpinnerSucess(args) {
//         await setTimeout(async () => {
//             spinning.start(args);
//             await setTimeout(() => {
//                 spinning.succeed(args);
//             }, 3000);
//         }, 500);
//         spinning.stop();
//     },
// }

// const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
// const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

// for (const file of commandFiles) {
//     const command = require(`./commands/${file}`);
//     if (!command.execute) return;

//     try {
//         spinner.SpinnerSucess(command.name);
//         client.commands.set(command.name, command)

//     } catch (error) {
//         console.error(error);
//     }

// };

// fs.readdir('./events/', (err, files) => {
//     if (err) return console.error;
//     files.forEach(file => {
//       if (!file.endsWith('.js')) return;
//       const event = require(`./events/${file}`);
//       let eventName = file.split('.')[0];
//       try {
//         client.on(eventName, event.bind(null, client));
//         console.log(`[✓] ${eventName}`);
//       } catch (err) {
//         console.log(`[✗] ${eventName}`);
//       }
//     })
//   })

// async function events() {
//     for (const event of eventFiles) {

//         if (!event.endsWith('.js')) return;
//         let eventName = event.split('.')[0];
//         const events = require(`./events/${event}`);
//         try {
//             client.on(eventName, event.bind(null, client));
//             spinning.start(eventName);
//             // await new Promise(resolve => {
//                 // setTimeout(resolve, 5000);
//                 // spinning.succeed();
//             // });
//         } catch (error) {
//             console.log(error)
//             spinning.fail(eventName);
//         }
//     }
// }


// events();

// client.on('message', async message => {
//     // Return if message author is a bot
//     if (!message.content.startsWith(prefix) || message.author.bot) return

//     //* Separate commands and args
//     const args = message.content.slice(prefix.length).trim().split(/ +/)
//     const commandName = args.shift().toLowerCase();

//     if (!client.commands.has(commandName)) return;

//     const command = client.commands.get(commandName)
//         || client.commands.find(c => c.aliases && c.aliases.includes(commandName))

//     if (!command) return

//     try {
//         await command.execute(message, args, client)
//     } catch (error) {
//         console.error(error)
//     }
// });


// Feature Dimitri Bellion

client.commands = new Collection();
client.aliases = new Collection();

["command"].forEach(handler => {
    require(`./handler/${handler}`)(client);
})

client.on('message', async message => {
    if (message.author.bot) return;
    if (!message.guild) return;
    if (!message.content.startsWith(prefix)) return;
    if (!message.member) message.member = await message.guild.fetchMember(message);

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();

    if (cmd.length === 0) return;

    let command = client.commands.get(cmd);
    if (!command) command = client.commands.get(client.aliases.get(cmd));

    try {
        await command.execute(message, args, client)
    } catch (error) {
        // console.error(error)
    }
})

client.login(token)