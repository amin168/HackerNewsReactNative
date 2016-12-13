import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableHighlight, Platform } from 'react-native';
import axios from 'axios';
import RefreshableListView from './RefreshableListView'
import { Actions } from 'react-native-router-flux';
import * as api from '../utils/api';

class TabView extends Component {
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
            this.renderContent(this.props.title, '', this.props.api)
        )
    }

    renderContent(title, tab, api) {

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


export default TabView;


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
        height: 64,
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

