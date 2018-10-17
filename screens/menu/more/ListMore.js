import React, { Component } from 'react';
import { Container, Header, Content, List, ListItem, Text, Icon, Left, Body, Right, Switch, Button } from 'native-base';
import HeaderComponent from '../../components/HeaderComponent';
import { env } from '../../../global';

const MoreMenu = ({icon, title, to, navigation}) => {
    return (
        <ListItem icon onPress={() => navigation.navigate(to)}>
            <Left>
                <Button style={{ backgroundColor: "#007AFF" }}>
                    <Icon type="Entypo" name={icon} />
                </Button>
            </Left>
            <Body>
                <Text>{title}</Text>
            </Body>
        </ListItem>
    );
}

export default class ListMore extends Component {
    render() {
        return (
            <Container>
                <Content>
                    <MoreMenu icon="home" title={env.locale.jp.my_profile} to="MyProfile" navigation={this.props.navigation}/>
                    
                    <MoreMenu icon="car" title={env.locale.jp.my_car} to="MyCar" navigation={this.props.navigation}/>
                </Content>
            </Container>
        );
    }
}