import React, { Component } from 'react';
import { AppRegistry, View, Text } from 'react-native';
import { TabBar, RefreshControl, ListView } from 'antd-mobile';


class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'askHnTab',
            hidden: false,
        }
    }

    renderContent(pageText) {
        return (
            <View style={{ flex: 1, alignItems: 'center', backgroundColor: 'white' }}>
                <Text>{pageText}</Text>
            </View>
        );
    }

    render() {
        return (
            <TabBar>
                <TabBar.Item
                    title='Ask HN'
                    icon={require('./img/message@2x.png')}
                    selectedIcon={require('./img/message_selected@2x.png')}
                    selected={this.state.selectedTab === 'askHnTab'}
                    onPress={() => {
                        this.setState({
                            selectedTab:'askHnTab'
                        })
                    }}>
                    {this.renderContent('Ask HN')}
                </TabBar.Item>
                <TabBar.Item
                    title='Show HN'
                    icon={require('./img/show@2x.png')}
                    selectedIcon={require('./img/show_selected@2x.png')}
                    selected={this.state.selectedTab === 'showHnTab'}
                    onPress={() => {
                        this.setState({
                            selectedTab:'showHnTab'
                        })
                    }}>
                    {this.renderContent('Show HN')}
                </TabBar.Item>
                <TabBar.Item
                    title='Front Page'
                    icon={require('./img/star@2x.png')}
                    selectedIcon={require('./img/star_select@2x.png')}
                    selected={this.state.selectedTab === 'frontPageTab'}
                    onPress={() => {
                        this.setState({
                            selectedTab:'frontPageTab'
                        })
                    }}>
                    {this.renderContent('Front Page')}
                </TabBar.Item>
                <TabBar.Item
                    title='New'
                    icon={require('./img/level-up@2x.png')}
                    selectedIcon={require('./img/level-up_selected@2x.png')}
                    selected={this.state.selectedTab === 'newTab'}
                    onPress={() => {
                        this.setState({
                            selectedTab:'newTab'
                        })
                    }}>
                    {this.renderContent('New')}
                </TabBar.Item>
                <TabBar.Item
                    title='Jobs'
                    icon={require('./img/job@2x.png')}
                    selectedIcon={require('./img/job_selected@2x.png')}
                    selected={this.state.selectedTab === 'jobTab'}
                    onPress={() => {
                        this.setState({
                            selectedTab:'jobTab'
                        })
                    }}>
                    {this.renderContent('Jobs')}
                </TabBar.Item>
            </TabBar>
        )
    }
}

export default Dashboard;