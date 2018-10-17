import React, { Component } from 'react';
import { StyleSheet, ActivityIndicator, Animated, AsyncStorage } from 'react-native';
import { Container, Text, Button, Icon, View } from 'native-base';
import Slider from "react-native-slider";
import call from 'react-native-phone-call'
import ScalableImage from 'react-native-scalable-image';
import Carousel from 'react-native-snap-carousel';
import Ripple from 'react-native-material-ripple';
import { env, lib } from '../../global';

export default class HomeScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            fadeAnim: new Animated.Value(0),
            carAnim: new Animated.Value(-200),
            status: 0,
            data: {},
            value: 0.5,
        }
    }

    componentWillMount() {
        this._getData();
    }

    async _getData() {
        lib.session.getUserToken().then(token => {
            fetch(env.http.baseUrl+'home', {
                headers: {
                    'Authorization': 'bearer ' + token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then(response => {

                if (response.error) {
                    AsyncStorage.removeItem('userToken');
                    this.props.navigation.navigate('Auth');
                }

                this.setState({status: 1, data: response});
                Animated.timing(                  // Animate over time
                    this.state.fadeAnim,            // The animated value to drive
                    {
                        toValue: 1,                   // Animate to opacity: 1 (opaque)
                        duration: 500,              // Make it take a while
                    }
                ).start(); 
                Animated.timing(                  // Animate over time
                    this.state.carAnim,            // The animated value to drive
                    {
                        toValue: env.dimensions.windowWidth/2-100,                   // Animate to opacity: 1 (opaque)
                        duration: 1000,              // Make it take a while
                    }
                ).start();    
            })
            .catch(error => {
                alert("Sesi telah habis");
            });
        });
    }

    callNumber() {
        call({number: this.state.data.phone_store, prompt: false}).catch(console.error);
    }

    _renderItem({ item, index }) {
        return (
            <Ripple style={styles.carousel}>
                <View style={styles.carouselLeft}>
                    <ScalableImage height={100} source={{ uri: item.picture }}/>
                </View>
                <View style={styles.carouselRight}>
                    <Text style={{fontWeight: 'bold', color: env.colors.primary, fontSize: 14}}>{item.desc}</Text>
                    <Text>{item.name}</Text>
                </View>
            </Ripple>
        );
    }
    
    _renderHome() {
        let { fadeAnim, carAnim } = this.state;
        if (this.state.status === 1)
            return (
                <View style={{flex: 1}}>
                    <ScalableImage style={styles.backgroundImage} height={env.dimensions.windowHeight-40} source={{uri: this.state.data.background}}/>
                    <Animated.View style={[styles.panel, {opacity: fadeAnim}]}>                    
                        <View style={styles.nextSchedule}>
                            <Text style={styles.nextScheduleText}>{env.locale.jp.next_schedule}</Text>
                            <Text style={styles.date}>{lib.date.format(this.state.data.next_schedule)}</Text>
                        </View>

                        <View style={styles.slider}>
                            <View style={{flexDirection: 'row'}}>
                            <View style={{width: '50%'}}>
                                <Text style={{ fontSize: 12, marginTop: 10, fontWeight: 'bold', alignSelf: 'flex-start' }}>{env.locale.jp.mileage}</Text>
                            </View>
                            <View style={{width: '50%'}}>
                                <Text style={{ fontSize: 12, marginTop: 10, fontWeight: 'bold', alignSelf: 'flex-end' }}>{this.state.data.mileage}Km</Text>
                            </View>
                            </View>
                            <Slider
                                disabled={true}
                                value={this.state.data.mileage/70000}
                                
                                style={styles.containerSlider}
                                trackStyle={styles.track}
                                thumbStyle={styles.thumb}
                                minimumTrackTintColor='#31a4db'
                                thumbTouchSize={{ width: 50, height: 5 }}
                            />

                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ width: '50%' }}>
                                    <Text style={{ fontSize: 12, marginTop: 10, fontWeight: 'bold', alignSelf: 'flex-start' }}>{env.locale.jp.leasing}</Text>
                                </View>
                                <View style={{ width: '50%' }}>
                                    <Text style={{ fontSize: 12, marginTop: 10, fontWeight: 'bold', alignSelf: 'flex-end' }}>{this.state.data.leasing}Km</Text>
                                </View>
                            </View>
                            <Slider
                                disabled={true}
                                value={this.state.data.leasing / 70000}

                                style={styles.containerSlider}
                                trackStyle={styles.track}
                                thumbStyle={styles.thumb}
                                minimumTrackTintColor='#31a4db'
                                thumbTouchSize={{ width: 50, height: 5 }}
                            />
                        </View>
                        
                        <View style={styles.reservation}>
                            <Button style={styles.reservationButton} onPress={() => AsyncStorage.removeItem('userToken')}>
                                <Icon type="Entypo" name="email"/>
                            </Button>
                            
                            <Button success style={styles.reservationButton} onPress={() => this.callNumber()}>
                                <Icon type="Entypo" name="phone"/>
                            </Button>
                        </View>
                    </Animated.View>
                    
                    <Carousel
                        layout={'stack'}
                        ref={(c) => { this._carousel = c; }}
                        data={this.state.data.notifications}
                        renderItem={this._renderItem}
                        sliderWidth={env.dimensions.windowWidth}
                        itemWidth={env.dimensions.windowWidth}
                    />

                    <Animated.View style={[styles.car, {left: carAnim}]}>
                        <ScalableImage width={200} source={{ uri: this.state.data.car }} />
                    </Animated.View>
                </View>
            );
        else
            return (
                <View style={{ justifyContent: 'center', flex: 1 }}>
                    <ActivityIndicator color={env.colors.primary} size="large" />
                </View>
            );
    }

    render() {
        return (
            <Container style={styles.container}>
                {this._renderHome()}
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: env.colors.background,
    },
    backgroundImage: {
        position: 'absolute'
    },
    panel: {
        backgroundColor: 'white',
        borderRadius: 10,
        margin: 15,
        overflow: 'hidden',
        marginTop: env.dimensions.statusBarHeight + 15, 
    },
    nextSchedule: {
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    nextScheduleText: {
        fontWeight: 'bold'
    },
    date: {
        fontWeight: 'bold',
        fontSize: 18,
        color: env.colors.primary
    },
    reservation: {
        flexDirection: 'row',
        overflow: 'hidden'
    },
    reservationButton: {
        width: '50%',
        borderRadius: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    car: {
        position: 'absolute',
        bottom: 0
    },
    slider: {
        paddingLeft: 15,
        paddingRight: 15,
        marginBottom: 10,
        borderTopWidth: 0.5,
        borderTopColor: env.colors.border
    },
    carousel: {
        borderRadius: 10,
        flexDirection: 'row',
        borderRadius: 10,
        backgroundColor: 'white',
        overflow: 'hidden',
        marginLeft: 15,
        marginRight: 15

    },
    carouselLeft: {
        width: '40%',
        overflow: 'hidden'
    },
    carouselRight: {
        padding: 10,
        width: '60%'
    },
    containerSlider: {
        height: 10,
        width: '100%'
    },
    track: {
        height: 2,
        backgroundColor: '#303030',
        margin: 0,
        padding: 0
    },
    thumb: {
        width: 10,
        height: 10,
        backgroundColor: env.colors.primary,
        borderRadius: 10 / 2,
    },
});