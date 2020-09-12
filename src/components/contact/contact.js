import React, {Component} from 'react'
import Copyright from "@components/copyright/copyright";
import config from '@config'
import {NavLink} from "react-router-dom";
import botPath from "@helpers/bot-path";

export default class Contact extends Component {
    render() {
        const {children} = this.props;

        return (
            <div className="contact">
                {config.bot_list.map((bot, key) => (
                    <NavLink activeClassName={'active'} to={botPath(bot)} className="contact-user" key={key}>
                        <div className="contact-user-foto">
                            <span><img src="" alt=""/></span>
                        </div>
                        <div className="contact-user-info">
                            <div className="contact-user-top">
                                <span to={botPath(bot)} ref={e => this.link = e} className="contact-user-name">
                                    {bot.name}
                                </span>
                            </div>
                        </div>
                    </NavLink>
                ))}
            </div>
        );
    }
}