import React, {Component} from 'react'
import LogoSvg from "@react-svg/logo.svg";

export default class Copyright extends Component {

    render() {
        return (
            <div className="col-3" style={{
                color: 'white'
            }}>
                <LogoSvg/>
                Тестовое задание на позицию: <br/>
                <b style={{float: 'right'}}>Frontend Developer</b>
            </div>
        );
    }
}