import React, { Component } from 'react';
import { AppRegistry, StyleSheet, StatusBar, View, Platform } from 'react-native';
import { Router, Scene } from 'react-native-router-flux';
import { Button } from 'antd-mobile';

import Dashboard from './components/Dashboard'

const styles = StyleSheet.create({
    content: {
        ...Platform.select({
            ios: {
                marginTop: 64,
            },
            android: {
                marginTop: 54,
            },
        }),
        flex: 1,
    },
    scrollView: {
        flex: 1,
        backgroundColor: 'white',
    },
    navigationBarStyle: {
        backgroundColor: '#2e2e2e',
    },
    titleStyle: {
        color: 'white',
    },
});

const WrapperDashboard = React.createClass({
    render() {
        return (
            <View style={styles.content}>
                <Dashboard />
            </View>
        )
    }
})

/*
 <NavigatorIOS
 style={styles.container}
 tintColor='#FF6600'
 initialRoute={{
 title: 'Hacker News',
 component: WrapperDashboard
 }}/>
 *
 * */

/*

 */

class HackerNewsReactNative extends Component {
    render() {
        return (

            <View style={{ flex: 1 }}>
                <StatusBar barStyle="light-content"/>
                <Router>
                    <Scene key="root" navigationBarStyle={styles.navigationBarStyle} titleStyle={styles.titleStyle}>
                        <Scene key="Dashboard" component={WrapperDashboard} title="Hacker News" initial={true}/>
                    </Scene>
                </Router>
            </View>


        )
    }
}

AppRegistry.registerComponent('HackerNewsReactNative', () => HackerNewsReactNative);
