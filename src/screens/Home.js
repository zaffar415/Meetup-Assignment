import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import {Button, H1, H3} from 'native-base';
import CustomHeader from '../components/Header'
import Logo from '../components/Logo'


const Home = ({navigation}) => {
    return (
        <>
            <CustomHeader navigation={navigation} />
            <View style={styles.container}>
                <Logo />
                    <H1>Welcome To</H1>
                    <H1>Meet Up</H1>
                    <H3>New Javascript Meetup @ xxx</H3>
                    <H3>Participate in the upcomming Javascript</H3>
                    <H3>Maximum 3 Users per Registration is allowed</H3>
                <Button danger style={{
                    alignSelf:'center',
                    padding:20,
                    margin:40,
                }}
                onPress={() => navigation.navigate('Register')}
                >
                    <Text style={{
                        color:'#fff'
                    }}>Participate Now</Text>
                </Button>
            </View>
            
        </>
    )
}


export default Home;


const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },
})