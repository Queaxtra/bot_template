module.exports = {
    name: 'test',
    aliases: ['test123'],
    execute(client, message, args) {
        message.channel.send('test');
    }
}