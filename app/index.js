import React, { Component } from 'react'
//import messaging from '@react-native-firebase/messaging';
//import analytics from '@react-native-firebase/analytics';
//import inAppMessaging from '@react-native-firebase/in-app-messaging';
//import AsyncStorage from '@react-native-async-storage/async-storage';
//import Exponea from 'react-native-exponea-sdk';
//import {LogLevel} from 'react-native-exponea-sdk/lib/ExponeaType';
//import config from './config/dev.config';

const StartNavigator = require('./routes/routes').default;

export default class index extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {

        try {        

           console.log("hola");

           
        } catch (error) {
            console.log('++++++++'+error);
        }

    }

    

    render() {
        return (
            <StartNavigator />
        )
    }
}
