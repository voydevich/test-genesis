import '@static/css/main.scss'
import path from 'path';
import React, {Component, Fragment} from 'react';
import {BrowserRouter as Router, Route, Switch, useHistory, withRouter} from 'react-router-dom';
import {render} from 'react-dom';
import {createStore, applyMiddleware, compose} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import axiosMiddleware from 'redux-axios-middleware';
import axios from 'axios';
import reducer from "@redux/reducer";
import IndexPage from "@view";
import BotPage from "@view/bot";
import config from "@config";
import Copyright from "@components/copyright/copyright";
import Wrapper from "@components/wrapper/wrapper";
import botPath from "./helpers/bot-path";


const client = axios.create({
    baseURL: '/api',
    responseType: 'json'
});


const middleware = [thunk, axiosMiddleware(client)];


const composeEnhancers =
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

const enhancer = composeEnhancers(
    applyMiddleware(...middleware),
);

let store = createStore(reducer, enhancer);

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <Wrapper>
                        <Switch>
                            <Route exact path={'/'} component={IndexPage}/>
                            {config.bot_list.map((bot, key) => (
                                <Route exact path={`/${botPath(bot)}`} key={key}
                                       render={(props) => (
                                           <BotPage {...props} bot={bot}/>
                                       )}/>
                            ))}
                        </Switch>
                    </Wrapper>
                </Router>
            </Provider>
        )
    }
}

render(<App/>, document.querySelector('#app'));