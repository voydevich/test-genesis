const moment = require('moment');

const createMessage = (sender, message, date) => {
    return {
        sender,
        message,
        date: date ? moment(date).valueOf() : moment().valueOf()
    }
};

module.exports = createMessage;