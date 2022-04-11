const Discord = require('discord.js');
const client = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILD_MESSAGES, Discord.Intents.FLAGS.GUILDS] });
const fs = require('fs');
const config = require('./config');
const { JsonDatabase } = require("wio.db");
const db = new JsonDatabase({ databasePath: "./database/data.json" });
const moment = require('moment');
moment.locale('tr');

client.on('ready', () => {
    console.log(`[LOG] Bot ${moment().format('LTS')} saatinde başlatıldı.`.cyan);
});

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
const komutDosya = fs.readdirSync('./komutlar').filter(file => file.endsWith('.js'));
for (const dosya of komutDosya) {
    const komut = require(`./komutlar/${dosya}`);
    client.commands.set(komut.name, komut);
    komut.aliases.forEach(alias => {
        client.aliases.set(alias, komut.name);
    });
}

client.on('messageCreate', async message => {
    if (message.author.bot) return;
    if (message.channel.type === 'dm') return;
    if (message.content.startsWith(config.prefix)) {
        const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
        const commandName = args.shift().toLowerCase();
        const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
        if (!command) return;
        command.execute(client, message, args);
    }
})

client.login(config.token);