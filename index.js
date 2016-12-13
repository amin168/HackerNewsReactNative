import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    StatusBar,
    Text,
    View,
    Platform,
    BackAndroid,
    DeviceEventEmitter,
    WebView
} from 'react-native';
import { Router, Scene, Reducer, Actions, ActionConst } from 'react-native-router-flux';
import { Button } from 'antd-mobile';

import Post from './components/Post'
import TabView from './components/TabView'
import * as api from './utils/api';

const WrapperPost = (props) => (
    <View style={styles.content}>
        <Post {...props} />
    </View>
)

const WrapperWeb = (props) => (
    <View style={styles.content}>
        <WebView source={{uri: props.url}}/>
    </View>
)

class TabIcon extends React.Component {
    render() {
        return (
            <Text style={{color: this.props.selected ? 'red' :'black'}}>{this.props.title}</Text>
        );
    }
}

const WrapperTabView = (props) => (
    <View style={styles.content}>
        <TabView {...props} />
    </View>
)


let isMainScreen = false;
const reducerCreate = params => {
    const defaultReducer = new Reducer(params);
    return (state, action) => {
        if (action.type === ActionConst.FOCUS && action.scene && action.scene.initial) {
            isMainScreen = true;
        } else {
            isMainScreen = false;
        }
        if (action.type === ActionConst.BACK_ACTION || action.type === ActionConst.BACK) {
            DeviceEventEmitter.emit('navigatorBack');
        }
        return defaultReducer(state, action);
    };
};

class HackerNewsReactNative extends Component {
    componentWillMount() {
        BackAndroid.addEventListener('hardwareBackPress', () => {
            if (!isMainScreen) {
                Actions.pop();
                return true;
            }
            return false;
        });
    }

    componentWillUnmount() {
        BackAndroid.removeEventListener('hardwareBackPress');
    }

    render() {
        return (

            <View style={{ flex: 1,backgroundColor: '#F6F6EF' }}>
                <StatusBar barStyle="light-content"/>
                <Router createReducer={reducerCreate}>
                    <Scene key="root" navigationBarStyle={styles.navigationBarStyle} titleStyle={styles.titleStyle}>
                        <Scene key="tabbar" tabs={true} initial={true}>
                            <Scene key="askHnTab"
                                   navigationBarStyle={styles.navigationBarStyle}
                                   titleStyle={styles.titleStyle}
                                   component={WrapperTabView}
                                   title="Ask HN"
                                   api={api.HN_ASK_STORIES_ENDPOINT}
                                   icon={TabIcon}/>

                            <Scene key="showHnTab"
                                   navigationBarStyle={styles.navigationBarStyle}
                                   titleStyle={styles.titleStyle}
                                   component={WrapperTabView}
                                   title="Show Story"
                                   api={api.HN_SHOW_STORIES_ENDPOINT}
                                   icon={TabIcon}/>

                            <Scene key="frontPageTab"
                                   navigationBarStyle={styles.navigationBarStyle}
                                   titleStyle={styles.titleStyle}
                                   component={WrapperTabView}
                                   title="Top Story"
                                   api={api.HN_TOP_STORIES_ENDPOINT}
                                   icon={TabIcon}/>

                            <Scene key="newTab"
                                   navigationBarStyle={styles.navigationBarStyle}
                                   titleStyle={styles.titleStyle}
                                   component={WrapperTabView}
                                   title="New Story"
                                   api={api.HN_NEW_STORIES_ENDPOINT}
                                   icon={TabIcon}/>

                            <Scene key="jobTab"
                                   navigationBarStyle={styles.navigationBarStyle}
                                   titleStyle={styles.titleStyle}
                                   component={WrapperTabView}
                                   title="Job Post"
                                   api={api.HN_JOB_STORIES_ENDPOINT}
                                   icon={TabIcon}/>
                        </Scene>

                        <Scene key="Post" component={WrapperPost} />

                        <Scene key="Web" component={WrapperWeb}/>

                    </Scene>
                </Router>
            </View>


        )
    }
}

AppRegistry.registerComponent('HackerNewsReactNative', () => HackerNewsReactNative);


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
        backgroundColor: '#F6F6EF',
        flex: 1,
    },
    navigationBarStyle: {
        backgroundColor: '#2e2e2e',
    },
    titleStyle: {
        color: 'white',
    },
});
