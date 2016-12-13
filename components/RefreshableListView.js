import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableHighlight, Platform } from 'react-native';
import GiftedListView from './GiftedListView';


const styles = StyleSheet.create({

    container: {
        flex: 1
    },
    paginationView: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 20,
        paddingBottom: 20
    },
    loadMoreText: {
        fontSize: 13,
        color: 'gray',
    },
    refreshableView: {
        height: 50,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    actionsLabel: {
        fontSize: 20,
        color: '#007aff',
    },
    defaultView: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    defaultViewTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 15,
    }
});

class RefreshableListView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            renderRow: this.props.renderRow,
            onRefresh: this.props.onRefresh,
            backgroundColor: this.props.backgroundColor ? this.props.backgroundColor : '#FFFFFF',
            loadMoreText: this.props.loadMoreText ? this.props.loadMoreText : 'Load More...',
            renderHeader: this.props.renderHeader ? this.props.renderHeader : (null),
        }

        //this._renderPaginationFetchingView = this._renderPaginationFetchingView.bind(this);
        this._renderPaginationAllLoadedView = this._renderPaginationAllLoadedView.bind(this);
        this._renderPaginationWaitingView = this._renderPaginationWaitingView.bind(this);

        //this._renderRefreshableFetchingView = this._renderRefreshableFetchingView.bind(this);
        this._renderRefreshableWillRefreshView = this._renderRefreshableWillRefreshView.bind(this);
        this._renderRefreshableWaitingView = this._renderRefreshableWaitingView.bind(this);
    }

    render() {
        return (
            <View style={[styles.container, {backgroundColor: this.state.backgroundColor}, this.props.style]}>

                <GiftedListView
                    rowView={this.state.renderRow}
                    onFetch={this.state.onRefresh}
                    firstLoader={true} // display a loader for the first fetching
                    pagination={true} // enable infinite scrolling using touch to load more
                    //paginationFetchingView={this._renderPaginationFetchingView}
                    paginationAllLoadedView={this._renderPaginationAllLoadedView}
                    paginationWaitingView={this._renderPaginationWaitingView}


                    refreshable={true} // enable pull-to-refresh for iOS and touch-to-refresh for Android
                    refreshableViewHeight={50} // correct height is mandatory
                    refreshableDistance={40} // the distance to trigger the pull-to-refresh - better to have it lower than refreshableViewHeight
                    //refreshableFetchingView={this._renderRefreshableFetchingView}
                    refreshableWillRefreshView={this._renderRefreshableWillRefreshView}
                    refreshableWaitingView={this._renderRefreshableWaitingView}

                    emptyView={this._renderEmptyView}

                    enableEmptySections={true}
                    withSections={false}
                    headerView={this.props.renderHeader}

                    PullToRefreshViewAndroidProps={{
                        colors: ['#F6F6EF'],
                        progressBackgroundColor: '#FF6600',
                    }}

                    customStyles={{
                        refreshableView: {
                            backgroundColor: this.state.backgroundColor,
                            justifyContent: 'flex-end',
                            paddingBottom: 12,
                        },
                        paginationView: {
                            backgroundColor: this.state.backgroundColor,
                            height: 60
                        }
                    }}/>
            </View>
        );
    }

    _renderRefreshableWaitingView(refreshCallback) {
        if (Platform.OS !== 'android') {
            return (
                <View style={styles.refreshableView}>
                    <Text style={styles.actionsLabel}>
                        ↓
                    </Text>
                </View>
            );
        } else {
            return (
                <TouchableHighlight
                    underlayColor='#c8c7cc'
                    onPress={refreshCallback}
                    style={styles.refreshableView}
                >
                    <Text style={styles.actionsLabel}>
                        ↻
                    </Text>
                </TouchableHighlight>
            );
        }
    }

    _renderRefreshableWillRefreshView() {
        return (
            <View style={styles.refreshableView}>
                <Text style={styles.actionsLabel}>
                    ↻
                </Text>
            </View>
        );
    }

    _renderPaginationWaitingView(paginateCallback) {
        return (
            <TouchableHighlight
                underlayColor='#c8c7cc'
                onPress={paginateCallback}
                style={styles.paginationView}
            >
                <Text style={[styles.loadMoreText]}>
                    {this.state.loadMoreText}
                </Text>
            </TouchableHighlight>
        );
    }


    _renderPaginationAllLoadedView() {
        return (
            <View style={styles.paginationView}>
                <Text style={styles.actionsLabel}>
                    ~
                </Text>
            </View>
        );
    }

    _renderEmptyView(refreshCallback) {
        return (
            <View style={styles.defaultView}>
                <Text style={styles.defaultViewTitle}>
                    Sorry, there is no content to display
                </Text>

                <TouchableHighlight
                    underlayColor='#c8c7cc'
                    onPress={refreshCallback}
                >
                    <Text>
                        ↻
                    </Text>
                </TouchableHighlight>
            </View>
        );
    }
}

export  default  RefreshableListView;