import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableHighlight } from 'react-native';
import axios from 'axios';
import * as api from '../utils/api';
import RefreshableListView from './RefreshableListView'
import Comment from './Comment'
import { Actions } from 'react-native-router-flux';



class Post extends Component {
    constructor(props) {
        super(props);

        this.state = {
            lastIndex: 0
        }

        this.renderRow = this.renderRow.bind(this);
        this.renderHeader = this.renderHeader.bind(this);
        this.onRefresh = this.onRefresh.bind(this);
        this.renderPostText = this.renderPostText.bind(this);
        this.renderSourceButton = this.renderSourceButton.bind(this);
        this.pushSourceWebPage = this.pushSourceWebPage.bind(this);
    }

    render() {
        return (
            <RefreshableListView
                renderRow={(row)=>this.renderRow(row)}
                onRefresh={(page, callback)=>this.onRefresh(page, callback)}
                renderHeader={this.renderHeader}
                backgroundColor={'#F6F6EF'}/>
        )
    }

    renderRow(row) {
        if (row.count == this.props.post.kids.length) {
            return (
                <View style={{paddingBottom: 20}}>
                    <Comment data={row}/>
                </View>
            )
        }
        return (
            <Comment data={row}/>
        )
    }

    onRefresh(page, callback) {
        if (!this.props.post.kids) {
            callback([], { allLoaded: true })
        }
        else if (page != 1) {
            this.fetchCommentsUsingKids(this.props.post.kids, this.state.lastIndex, 3, callback);
        }
        else {
            this.fetchCommentsUsingKids(this.props.post.kids, 0, 3, callback);
        }
    }

    fetchCommentsUsingKids(kids, startIndex, amountToAdd, callback) {
        let rowsData = [];
        const endIndex = (startIndex + amountToAdd) < kids.length ? (startIndex + amountToAdd) : kids.length;

        function iterateAndFetch() {
            if (startIndex < endIndex) {
                axios.get(api.HN_ITEM_ENDPOINT + kids[startIndex] + ".json")
                    .then(response => response.data)
                    .then((item) => {
                        item.count = startIndex + 1;
                        if (!item.deleted) {
                            rowsData.push(item);
                        }
                        startIndex++;
                        iterateAndFetch();
                    })
            }
            else {
                callback(rowsData, { allLoaded: endIndex == kids.length });
                return;
            }
        }

        iterateAndFetch();
        this.setState({ lastIndex: endIndex });
    }

    renderHeader() {
        return (
            <View style={styles.headerContainer}>
                <Text style={styles.headerTitle}>
                    {this.props.post.title}
                </Text>
                {this.renderPostText()}
                {this.renderSourceButton()}
                <Text style={styles.headerPostDetailsLine}>
                    Posted by {this.props.post.by} | {this.props.post.score} Points
                </Text>
                <View style={styles.separator}/>
                <Text style={styles.headerCommentTitle}>
                    {this.props.post.descendants} Comments:
                </Text>
            </View>
        );
    }

    renderPostText() {
        if (!this.props.post.text) {
            return null;
        }
        return (
            <Text style={styles.headerPostText}>
                {this.fixPostText(this.props.post.text)}
            </Text>
        );
    }

    // renderSourceButton() {
    //     if (!this.props.post.url) {
    //         return null;
    //     }
    //     return (
    //         <Text style={styles.headerSourceLabel}>
    //             (Source)
    //         </Text>
    //     );
    // }

    renderSourceButton() {
        if (!this.props.post.url) {
            return null;
        }
        return (
            <TouchableHighlight onPress={() => this.pushSourceWebPage()}
                                underlayColor='#F6F6EF'>
                <Text style={styles.headerSourceLabel}>
                    (Source)
                </Text>
            </TouchableHighlight>
        );
    }


    pushSourceWebPage() {

        Actions.Web({
            url: this.props.post.url,
            title: this.props.post.title
        })
    }

    fixPostText(str) {
        return String(str).replace(/<p>/g, '\n\n')
            .replace(/&#x2F;/g, '/')
            .replace('<i>', '')
            .replace('</i>', '')
            .replace(/&#x27;/g, '\'')
            .replace(/&quot;/g, '\"')
            .replace(/<a\s+(?:[^>]*?\s+)?href="([^"]*)" rel="nofollow">(.*)?<\/a>/g, "$1");
    }
}


export default Post


const styles = StyleSheet.create({
    headerContainer: {
        flex: 1,
        backgroundColor: '#F6F6EF',
        flexDirection: 'column',
        paddingRight: 10,
        paddingLeft: 10,
    },
    headerTitle: {
        fontSize: 20,
        textAlign: 'left',
        marginTop: 10,
        marginBottom: 10,
        color: '#FF6600',
    },
    headerPostText: {
        fontSize: 14,
        marginBottom: 3,
        paddingBottom: 10,
    },
    headerSourceLabel: {
        fontSize: 15,
        textAlign: 'left',
        color: '#0089FF',
        paddingBottom: 10,
    },
    headerPostDetailsLine: {
        fontSize: 12,
        marginBottom: 10,
        color: 'gray',
    },
    separator: {
        height: 1,
        backgroundColor: '#CCCCCC',
    },
    headerCommentTitle: {
        color: 'gray',
        marginTop: 10
    }
});