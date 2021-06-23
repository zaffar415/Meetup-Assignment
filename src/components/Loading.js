import React from 'react';
import {View,ActivityIndicator,Dimensions} from 'react-native';

const Loading = ({size}) => {
    return (
        <View style={{
            flex:1,
            justifyContent:'center',
            alignItems:'center',
            height:Dimensions.get('window').height,
        }}>
            <ActivityIndicator color="#3944F7" size={size}/>
        </View>
    )
}

export default Loading;