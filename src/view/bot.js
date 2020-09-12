import React, {Component, Fragment} from 'react';
import LogoSvg from '@react-svg/logo.svg'
import io from 'socket.io-client';
import {connect} from "react-redux";
import {getMessagesSelector} from "../selectors/messages.selector";
import get from 'lodash/get'
import sortBy from 'lodash/sortBy'
import moment from 'moment';
import {newMessage, setMessages} from "@redux/messages.reducer";
import {getProfileSelector} from "@selectors/profile.selector";
import createMessage from '@helpers/create-message'
import {CSSTransition, TransitionGroup} from "react-transition-group";
import database from "@database/database";

export class BotPage extends Component {
    constructor(props) {
        super(props);
        this.socket = io('http://localhost:3000');
        this.state = {
            textarea: ''
        }

    }

    componentDidMount() {

        const {bot, newMessage, getMessage} = this.props;

        getMessage(get(bot, 'name'));

        this.textarea.addEventListener("keyup", this.keyUpEnter, false);

        this.socket.on(get(bot, 'name'), (msg) => {
            newMessage(get(bot, 'name'), msg)
        });


    }

    keyUpEnter = (event) => {
        if (event.keyCode === 13) {
            event.preventDefault();
            const {textarea} = this.state;
            this.setState({
                textarea: ''
            }, () => this.onSendMessage(textarea))
        }
    };
    onChangeTextarea = ({target}) => {
        this.setState({
            textarea: target.value
        })
    };

    componentWillUnmount() {
        this.socket.close();
        this.textarea.removeEventListener("keyup", this.keyUpEnter, false)
    }

    onSendMessage = (message) => {
        const {bot, newMessage, profile = {}} = this.props;

        const new_message = createMessage(get(profile, 'id'), message);

        newMessage(get(bot, 'name'), new_message);

        this.socket.emit(get(bot, 'name'), new_message);
    };

    render() {
        const {messages = [], profile = {}} = this.props;
        const {textarea} = this.state;
        return (
            <div className="chat-block ">
                <div className="blocked-wrap">
                    <div style={{position: 'relative'}}>
                        <TransitionGroup className="chat">
                            {sortBy(messages, 'date').map((message, key) => (
                                <CSSTransition
                                    timeout={500}
                                    className={"chat-message " + (get(message, 'sender') === get(profile, 'id') ? "user-message" : '')}
                                    key={key}>
                                    <div>
                                        <div className="chat-message-foto">
                                            <a href=""><img src="" alt=""/></a>
                                        </div>
                                        <div className="chat-message-text">
                                            {get(message, 'message')}
                                        </div>
                                        <div
                                            className="chat-message-time">{moment(get(message, 'date')).calendar()}</div>
                                    </div>
                                </CSSTransition>
                            ))}
                        </TransitionGroup>
                    </div>
                    <div className="chat-form">
                        <form action="">
                            <div className="textarea-wrap">
                                <textarea placeholder="Text" ref={(e) => {
                                    if (e) this.textarea = e
                                }} value={textarea} onChange={this.onChangeTextarea}/>
                            </div>
                            <div className="textarea-count-wrap">
                                <div className="checkbox-wrap">
                                    <label>
                                        {/*<span></span>*/}
                                        Press Enter to send
                                    </label>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}


function mapStateToProps(state, props) {
    return {
        profile: getProfileSelector(state),
        messages: get(getMessagesSelector(state), get(props, 'bot.name', ''), [])
    }
}

function mapDispatchToProps(dispatch, props) {
    return {
        newMessage: (bot_name, data) => dispatch(newMessage(bot_name, data)),
        getMessage: async (bot_name) => {
            const collection = await database.collection(bot_name).orderBy("date", "asc").get();
            const data = await collection.docs.map(doc => doc.data());
            dispatch(setMessages(bot_name, data));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BotPage)