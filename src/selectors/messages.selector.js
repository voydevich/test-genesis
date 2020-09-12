import {createSelector} from 'reselect'


const messages = state => state.messages;

export const getMessagesSelector = createSelector(messages, (messages) => {
    return messages
});