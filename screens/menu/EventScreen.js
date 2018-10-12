import React, { Component } from 'react';
import { StyleSheet, FlatList, ActivityIndicator, RefreshControl } from 'react-native';
import { Container, Text, Button, Icon, View, Content } from 'native-base';
import ScalableImage from 'react-native-scalable-image';
import Modal from "react-native-modal";
import Ripple from 'react-native-material-ripple';
import { env, lib } from '../../global';

import HeaderComponent from '../components/HeaderComponent';

export default class EventScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            status: 0,
            data: [],
            refreshing: false,
            modalVisible: false,
            selectedEvent: {}
        }
    }

    componentWillMount() {
        this._getData();
    }

    async _getData() {
        lib.session.getUserToken().then(token => {
            fetch(env.http.baseUrl + 'my-events', {
                headers: {
                    'Authorization': 'bearer ' + token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then(response => {
                this.setState({status: 1, data: response.data, refreshing: false});
            });
        });
    }

    handleRefresh() {
        this._getData();
    }

    _renderEvents() {
        if (this.state.status === 1)
            return (
                <Content style={styles.eventContent} refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this.handleRefresh.bind(this)} />}>
                    <FlatList
                        data={this.state.data}
                        extraData={this.state}
                        refreshing={this.state.refreshing}
                        onRefresh={() => this.handleRefresh()}
                        renderItem={(item) =>
                            <Ripple style={[styles.eventItem, {marginTop: item.index === 0 ? 10 : 0}]} onPress={() => this.setState({modalVisible: !this.state.modalVisible, selectedEvent: item.item})}>
                                <ScalableImage source={{uri: item.item.picture}} width={env.dimensions.windowWidth-20}/>
                            </Ripple>
                        }
                        keyExtractor={(item, index) => index.toString()}
                        />
                </Content>
            );
        else
            return (
                <View style={{ justifyContent: 'center', flex: 1 }}>
                    <ActivityIndicator color={env.colors.primary} size="large" />
                </View>
            );
    }

    _renderModal() {
        return (
            <Modal style={{margin: 10}} isVisible={this.state.modalVisible} onBackdropPress={() => this.setState({modalVisible: false})}>
                <View style={styles.eventModal}>
                    <ScalableImage source={{uri: this.state.selectedEvent.picture}} width={env.dimensions.windowWidth}/>
                    <View style={styles.eventDescription}>
                        <Text style={styles.eventName}>{this.state.selectedEvent.name}</Text>
                        <View style={styles.eventDetail}>
                            <Icon style={styles.smallIcon} type="MaterialIcons" name="location-on" />
                            <Text style={styles.smallText}>{this.state.selectedEvent.location}</Text>
                        </View>
                        <View style={styles.eventDetail}>
                            <Icon style={styles.smallIcon} type="MaterialCommunityIcons" name="calendar" />
                            <Text style={styles.smallText}>{lib.date.format(this.state.selectedEvent.date_start)} {this.state.selectedEvent.date_end ? '- ' + lib.date.format(this.state.selectedEvent.date_end) : ''}</Text>
                        </View>
                        <View style={styles.eventDetail}>
                            <Icon style={styles.smallIcon} type="MaterialCommunityIcons" name="clock" />
                            <Text style={styles.smallText}>{lib.date.formatTime(this.state.selectedEvent.time_start)} - {lib.date.formatTime(this.state.selectedEvent.time_end)}</Text>
                        </View>
                        <View style={styles.eventText}>
                            <Text style={{fontSize: 14}}>{this.state.selectedEvent.desc}</Text>
                        </View>
                    </View>
                    <Button small style={styles.closeButton} onPress={() => this.setState({modalVisible: false})}><Icon name="arrow-down"/></Button>
                </View>
            </Modal>
        );
    }

    render() {
        return (
            <Container style={styles.container}>
                <HeaderComponent title={env.locale.jp.events}/>
                {this._renderModal()}
                {this._renderEvents()}
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: env.colors.background,
    },
    eventContent: {
        paddingLeft: 10,
        paddingRight: 10
    },
    eventItem: {
        borderRadius: 10,
        overflow: 'hidden',
        marginBottom: 10,
        borderWidth: 0.5,
        borderColor: env.colors.border,
        minHeight: 100,
        backgroundColor: '#eee'
    },
    eventDescription: {
        padding: 10,
        backgroundColor: 'white'
    },
    eventDetail: {
        flexDirection: 'row'
    },
    eventName: {
        fontWeight: 'bold',
        color: env.colors.primary,
        marginBottom: 5
    },
    smallIcon: {
        fontSize: 16,
        marginRight: 5
    },
    smallText: {
        fontSize: 14,
    },
    eventModal: {
        backgroundColor: 'white',
        overflow: 'hidden',
        margin: 0,
        borderRadius: 10
    },
    eventText: {
        marginTop: 10,
        paddingTop: 10,
        borderTopColor: env.colors.border,
        borderTopWidth: 0.5
    },
    closeButton: {
        alignSelf: 'center',
        marginBottom: 10
    }
});