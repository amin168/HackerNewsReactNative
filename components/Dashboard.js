import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableHighlight, Platform } from 'react-native';
import { TabBar, RefreshControl, ListView } from 'antd-mobile';
import axios from 'axios';
import * as api from '../utils/api';
import RefreshableListView from './RefreshableListView'
import { Actions } from 'react-native-router-flux';

let currentTab = 'askHnTab'

class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            topStoryIDs: null,
            lastIndex: 0,
            selectedTab: 'askHnTab',
            hidden: false
        }

        this.renderRow = this.renderRow.bind(this);
        this.onRefresh = this.onRefresh.bind(this);
        this.selectedRow = this.selectedRow.bind(this);
        this.renderContent = this.renderContent.bind(this);
    }

    render() {
        return (
            <View style={{ flex: 1}}>
                <Text>ssss</Text>

                <TabBar
                    tintColor="#ff8533"
                >
                    <TabBar.Item
                        title='Ask HN'
                        icon={require('./img/message@2x.png')}
                        selectedIcon={require('./img/message_selected@2x.png')}
                        selected={this.state.selectedTab === 'askHnTab'}
                        onPress={() => {
                        currentTab = 'askHnTab'
                        this.setState({
                            selectedTab:'askHnTab'
                        })
                    }}>

                        {this.renderContent('Ask Story', 'askHnTab', api.HN_ASK_STORIES_ENDPOINT)}

                    </TabBar.Item>
                    <TabBar.Item
                        title='Show HN'
                        icon={require('./img/show@2x.png')}
                        selectedIcon={require('./img/show_selected@2x.png')}
                        selected={this.state.selectedTab === 'showHnTab'}
                        onPress={() => {
                        currentTab = 'showHnTab'
                        this.setState({
                            selectedTab:'showHnTab'
                        })
                    }}>

                        {this.renderContent('Show Story', 'showHnTab', api.HN_SHOW_STORIES_ENDPOINT)}

                    </TabBar.Item>
                    <TabBar.Item
                        title='Front Page'
                        icon={require('./img/star@2x.png')}
                        selectedIcon={require('./img/star_select@2x.png')}
                        selected={this.state.selectedTab === 'frontPageTab'}
                        onPress={() => {
                        currentTab = 'frontPageTab'
                        this.setState({
                            selectedTab:'frontPageTab'
                        })
                    }}>

                        {this.renderContent('Top Story', 'frontPageTab', api.HN_TOP_STORIES_ENDPOINT)}

                    </TabBar.Item>
                    <TabBar.Item
                        title='New'
                        icon={require('./img/level-up@2x.png')}
                        selectedIcon={require('./img/level-up_selected@2x.png')}
                        selected={this.state.selectedTab === 'newTab'}
                        onPress={() => {
                        currentTab = 'newTab'
                        this.setState({
                            selectedTab:'newTab'
                        })
                    }}>

                        {this.renderContent('New Story', 'newTab', api.HN_NEW_STORIES_ENDPOINT)}

                    </TabBar.Item>
                    <TabBar.Item
                        title='Jobs'
                        icon={require('./img/job@2x.png')}
                        selectedIcon={require('./img/job_selected@2x.png')}
                        selected={this.state.selectedTab === 'jobTab'}
                        onPress={() => {
                        currentTab = 'jobTab'
                        this.setState({
                            selectedTab:'jobTab'
                        })
                    }}>

                        {this.renderContent('Job Post', 'jobTab', api.HN_JOB_STORIES_ENDPOINT)}

                    </TabBar.Item>
                </TabBar>
            </View>
        )
    }

    renderContent(title, tab, api) {

        return (null)

        return (
            <View style={{ flex: 1}}>
                <RefreshableListView
                    renderRow={(row)=>this.renderRow(row, title)}
                    onRefresh={(page, callback)=>this.onRefresh(page, callback, api)}
                    backgroundColor={'#F6F6EF'}/>

                <View style={styles.navBarSpace}/>
            </View>
        )


    }

    selectedRow(row, pushNavBarTitle) {

        Actions.Post({
            post: row,
            title: pushNavBarTitle
        })
    }

    renderRow(row, pushNavBarTitle) {
        return (
            <TouchableHighlight underlayColor={'#f3f3f2'} onPress={() => this.selectedRow(row,pushNavBarTitle)}>
                <View style={styles.rowContainer}>
                    <Text style={styles.rowCount}>
                        {row.count}
                    </Text>
                    <View style={styles.rowDetailsContainer}>
                        <Text style={styles.rowTitle}>
                            {row.title}
                        </Text>
                        <Text style={styles.rowDetailsLine}>
                            Posted by {row.by} | {row.score} Points | {row.descendants} Comments
                        </Text>
                        <View style={styles.separator}/>
                    </View>
                </View>
            </TouchableHighlight>
        )
    }

    onRefresh(page = 1, callback, api_endpoint) {
        if (page != 1 && this.state.topStoryIDs) {
            this.fetchStoriesUsingTopStoryIDs(this.state.topStoryIDs, this.state.lastIndex, 5, callback);
        }
        else {
            axios.get(api_endpoint)
                .then(response => response.data)
                .then((topStoryIDs) => {

                    this.fetchStoriesUsingTopStoryIDs(topStoryIDs, 0, 12, callback);
                    this.setState({ topStoryIDs: topStoryIDs });
                });
        }
    }

    fetchStoriesUsingTopStoryIDs(topStoryIDs, startIndex, amountToAdd, callback) {
        let rowsData = [];
        const endIndex = (startIndex + amountToAdd) < topStoryIDs.length ? (startIndex + amountToAdd) : topStoryIDs.length;


        function iterateAndFetch() {
            if (startIndex < endIndex) {
                axios.get(api.HN_ITEM_ENDPOINT + topStoryIDs[startIndex] + ".json")
                    .then(response => response.data)
                    .then((topStory) => {
                        topStory.count = startIndex + 1;
                        rowsData.push(topStory);
                        startIndex++;
                        iterateAndFetch();
                    })
            }
            else {
                callback(rowsData);
                return;
            }
        }

        iterateAndFetch();
        this.setState({ lastIndex: endIndex });

    }


}

export default Dashboard;


const styles = StyleSheet.create({
    rowContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    rowCount: {
        fontSize: 20,
        textAlign: 'right',
        color: 'gray',
        margin: 10,
        marginLeft: 15,
    },
    rowDetailsContainer: {
        flex: 1,
    },
    navBarSpace: {
        height: (Platform.OS !== 'android') ? 64 : 0,
    },
    rowTitle: {
        fontSize: 15,
        textAlign: 'left',
        marginTop: 10,
        marginBottom: 4,
        marginRight: 10,
        color: '#FF6600'
    },
    rowDetailsLine: {
        fontSize: 12,
        marginBottom: 10,
        color: 'gray',
    },
    separator: {
        height: 1,
        backgroundColor: '#CCCCCC'
    }
});