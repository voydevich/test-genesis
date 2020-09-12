import React, {Component} from 'react'
import Copyright from "@components/copyright/copyright";
import Contact from "@components/contact/contact";

export default class Wrapper extends Component {
    render() {
        const {children} = this.props;
        return (
            <main className="main">
                <div className="container">
                    <div className="row">
                        <div className="col-9">
                            <div className="chat-wrap">
                                <div className="contacts-wrap">
                                    <Contact/>
                                </div>
                                {children}
                            </div>
                        </div>
                        <Copyright/>
                    </div>
                </div>
            </main>
        );
    }
}