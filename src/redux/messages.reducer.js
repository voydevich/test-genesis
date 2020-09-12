import {handleActions} from "redux-actions";
import config from '@config';
import createAction from "redux-actions/es/createAction";
import get from 'lodash/get'
import unionWith from 'lodash/unionWith'
import isEqual from 'lodash/isEqual'

const actions = {
    newMessage: "NEW_MESSAGE",
    setMessages: "SET_MESSAGES",
};

export const newMessage = createAction(actions.newMessage, (bot_name, data) => {
    return {data, bot_name}
});

export const setMessages = createAction(actions.setMessages, (bot_name, data) => {
    return {data, bot_name}
});


const reducer = handleActions({
        [newMessage]: (s, {payload}) => {
            return {
                ...s,
                [payload.bot_name]: unionWith([payload.data], get(s, payload.bot_name, []), isEqual),
            }
        },
        [setMessages]: (s, {payload}) => {
            return {
                ...s,
                [payload.bot_name]: unionWith(payload.data, get(s, payload.bot_name, []), isEqual),
            }
        }
    },
    {
        ...config.bot_list.reduce((s, n) => {
            s[n.name] = [];
            return s
        }, {})
    }
    )
;

export default reducer;