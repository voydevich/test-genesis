const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const config = require('../src/config');
const createMessage = require('../src/helpers/create-message');
const database = require('../src/database/database');
const get = require('lodash/get');
const has = require('lodash/has');

app.use('/static', express.static('dist/static'));

app.use(function (req, res) {
    res.sendfile('dist/index.html')
});

const commom = require(`./librery/common`);

const library = {
    dallas: require(`./librery/dallas`),
    john_snow: require(`./librery/john_snow`),
    martin: require(`./librery/martin`),
    monica: require(`./librery/monica`),
    sherlock: require(`./librery/sherlock`),
};


io.on('connection', (socket) => {

    console.log('a user connected');

    config.bot_list.forEach(bot => {

        let timeout = {};

        socket.on(bot.name, (msg) => {

            const self_message = createMessage(msg.sender, msg.message, msg.date);

            io.emit(bot.name, self_message);

            database.collection(bot.name)
                .add(self_message)
                .then(function (docRef) {
                    console.log("Document written with ID: ", docRef.id);
                })
                .catch(function (error) {
                    console.error("Error adding document: ", error);
                });

            if (timeout[bot.name]) clearTimeout(timeout[bot.name]);

            timeout[bot.name] = setTimeout(() => {

                const random = has(library, bot.name) ? () => {
                    const BotLibrary = [...commom, ...get(library, bot.name, [])];
                    return BotLibrary[Math.floor(Math.random() * Math.floor(BotLibrary.length))]
                } : () => 'I dont exist';

                const new_message = createMessage(bot.name, random());

                database.collection(bot.name)
                    .add(new_message)
                    .then(function (docRef) {
                        console.log("Document written with ID: ", docRef.id);
                        io.emit(bot.name, new_message)
                    })
                    .catch(function (error) {
                        console.error("Error adding document: ", error);
                    });

            }, Math.random() * 5000 + 1000)

        });
    });
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

http.listen(config.socket.port, () => {
    console.log('listening on *:3000');

});