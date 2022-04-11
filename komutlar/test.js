const Discord = require('discord.js');
const fs = require('fs');
const config = require('../config');
const moment = require('moment');
moment.locale('tr');
const { JsonDatabase } = require("wio.db");
const db = new JsonDatabase({ databasePath: "./database/data.json" });

module.exports = {
    name: 'test',
    aliases: ['test123'],
    execute(client, message, args) {
        message.channel.send('test');
    }
}