import React from 'react';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import {
    Header,
    Left,
    Body,
} from 'native-base';

const CustomHeader = ({navigation}) => {
    
    return(
        <Header backgroundColor="#3944F7" androidStatusBarColor="#3944F7">
            <Left>
                <Icon.Button 
                    name="bars"
                    backgroundColor="#3944F7"
                    onPress={() => navigation.openDrawer()}
                />
            </Left>
            <Body></Body>
        </Header>
    )
}


export default CustomHeader;