import 'react-native-gesture-handler';
import React from 'react';
import {Text,StatusBar} from 'react-native'
import DrawerNavigation from './src/navigation/DrawerNavigation';

const App = () => {
  return (
    <>
    <StatusBar backgroundColor="#333" barStyle="dark-content" />
      <DrawerNavigation />
    </>
  )
}

export default App;