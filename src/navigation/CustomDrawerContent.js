import React,{useState} from 'react';
import {Text, View} from 'react-native';
import {DrawerItem, DrawerContentScrollView} from '@react-navigation/drawer'
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import {
    Header,
    Content,
    Body,
    H2,

} from 'native-base';
import Logo from '../components/Logo';

const CustomDrawerContent = (props) => {
    return(
        <>
            <View style={{
                alignItems:'center',
                padding:20,
            }}>
                <Logo />
                <H2>Meet Up</H2>
            </View>
            <DrawerContentScrollView {...props}>
                
                    <DrawerItem
                    icon={() => (
                        <Icon name="home" size={30}/>
                    )}
                    label="Home"
                    onPress={() => props.navigation.navigate("Home")}
                    />

                    <DrawerItem
                    icon={() => (
                        <Icon name="edit" size={30}/> 
                    )}
                    label="Register"
                    onPress={() => props.navigation.navigate("Register")}                    
                    
                    />

<DrawerItem
                    icon={() => (
                        <Icon name="users" size={30}/>
                    )}
                    label="Users"
                    onPress={() => props.navigation.navigate("Users")}
                    
                    />

<DrawerItem
                    icon={() => (
                        <Icon name="pie-chart" size={30}/>
                    )}
                    label="Report"
                    onPress={() => props.navigation.navigate("Reports")}
                    />
                
            </DrawerContentScrollView>
        </>
    )
}

export default CustomDrawerContent;