const { readdirSync } = require('fs');
const ascii = require('ascii-table');
const table = new ascii().setHeading('Painel Commands', 'Loading Status');

module.exports = (DK) => {
    readdirSync("./commands/").forEach(dir => {
        const commands = readdirSync(`./commands/${dir}/`).filter(f => f.endsWith(".js"));

        for (let file of commands) {
            let pull = require(`../commands/${dir}/${file}`);

            if (pull.name) {
                DK.commands.set(pull.name, pull);
                table.addRow(file, '✔️ Success');
            } else {
                table.addRow(file, '❌ Error');
                continue;
            }
            if (pull.aliases && Array.isArray(pull))
                pull.aliases.forEach(alias => DK.aliases.set(alias, pull.name));
        }
    });

    console.log(table.toString());
}