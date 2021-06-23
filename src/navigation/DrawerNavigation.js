import React from 'react';
import {NavigationContainer} from '@react-navigation/native'
import {createDrawerNavigator} from '@react-navigation/drawer';
import CustomDrawerContent from './CustomDrawerContent';

//Screens
import Home from '../screens/Home'
import Register from '../screens/Register';
import Users from '../screens/Users';
import Reports from '../screens/Reports';

const DrawerNavigation = () => {
    const Drawer = createDrawerNavigator();
    return(
        <NavigationContainer>
            <Drawer.Navigator 
            initialRouteName="Home" 
            drawerContent={(props) => <CustomDrawerContent {...props} />}>
                <Drawer.Screen name="Home" component={Home} />
                <Drawer.Screen name="Register" component={Register} />
                <Drawer.Screen name="Users" component={Users} />
                <Drawer.Screen name="Reports" component={Reports} />
            </Drawer.Navigator>
        </NavigationContainer>
    )
}

export default DrawerNavigation;