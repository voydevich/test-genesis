import React, {Component, Fragment} from 'react';

export default class IndexPage extends Component {
    render() {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                width: '100%',
                alignItems: 'center',
                background: 'linear-gradient(0.08deg, #607D8B 0.09%, #90A4AE 99.95%)'
            }}>
                <div style={{
                    color: '#fff'
                }}>
                    <h1>Hello!</h1>
                    <p>Choose a bot to communicate with him.</p>
                </div>
            </div>
        );
    }
}