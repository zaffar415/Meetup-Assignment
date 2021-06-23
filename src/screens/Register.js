import React,{useState,useEffect} from 'react'
import {View, Text, TouchableOpacity, StyleSheet, Picker, ToastAndroid, BackHandler, Alert} from 'react-native'
import { 
    Container,
    Content,
    Input,
    Form,
    Item,
    Textarea,
    H1,H2,H3, 
 } from 'native-base';
import DatePicker from 'react-native-datepicker'
import CustomHeader from '../components/Header';
import Axios from 'axios';
import {BEECEPTOR_API_URL} from '@env';


const Register = ({navigation}) => {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [profession, setProfession] = useState('')
    const [DOB, setDOB] = useState(new Date());
    const [locality, setLocality] = useState('');
    const [guests, setGuests] = useState(0)
    const [address, setAddress] = useState('');

    const submitHandler = () => {
        if(!name || !age || !profession || !DOB || !locality || !guests || !address) {
            return ToastAndroid.show("Please Fill All the Fields",ToastAndroid.SHORT);
        } 

        console.log(DOB);
        Axios.post(`${BEECEPTOR_API_URL}/api/register`)
        .then((response) => {
            setName('');
            setAge('')
            setProfession('')
            setDOB(new Date())
            setLocality('')
            setGuests('')
            setAddress('')
            ToastAndroid.show(response.data.data.message,ToastAndroid.SHORT);
        })
    }

    
    useEffect(() => {
        const backAction = () => {
            Alert.alert("Hold on!", "Are you sure you want to go back?", [
                {
                    text: "Cancel",
                    onPress: () => null,
                    style: "cancel"
                },
                { text: "YES", onPress: () => BackHandler.exitApp() }
            ]);
            return true;
        }
        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );
    
        return () => backHandler.remove();
    },[]);


    return (
        <>
        <CustomHeader navigation={navigation} />
        <Container style={styles.container}>
            <Content style={styles.content}>
                <View>
                    <H1 style={styles.heading}>RSVP FORM</H1>
                </View>
                <Form>
                    <Item>
                        <Input value={name} placeholder="Name" onChangeText={(text) => setName(text)} />
                    </Item>
                    <Item>
                        <Input value={age} onChangeText={(text) => setAge(text)} placeholder="Age" keyboardType='numeric' />
                    </Item>
                    <View style={styles.inputWrap}>
                        <Picker
                        mode="dropdown"
                        selectedValue={profession}
                        placeholder="Select Profession"
                        onValueChange={(text) => setProfession(text)}
                        >
                            <Picker.Item label="Select Profession" />
                            <Picker.Item label="Employee" value="Employee" />
                            <Picker.Item label="Student" value="Student" />
                        </Picker>
                    </View>
                    <View style={[styles.inputWrap,{marginLeft:20}]}>
                        <H3>Select DOB</H3>
                    </View>
                    <Item>
                        
                        <DatePicker
                        style={{
                            width:'100%',
                            paddingBottom:20,
                        }}
                        mode="date"
                        date={DOB}
                        placeholder="Select DOB"
                        maxDate={new Date()}
                        onDateChange={(date) => setDOB(date)}
                        />
                    </Item>
                    <Item>
                        <Input placeholder="Locality" value={locality} onChangeText={(text) => setLocality(text)} />
                    </Item>
                    <View style={styles.inputWrap}>
                        <Picker
                        mode="dropdown"
                        selectedValue={guests}
                        placeholder="Select Profession"
                        onValueChange={(text) => setGuests(text)}
                        >
                            <Picker.Item label="Number of Guests" />
                            <Picker.Item label="0" value="0" />
                            <Picker.Item label="1" value="1" />
                            <Picker.Item label="2" value="2" />
                        </Picker>
                    </View>
                    <Item>
                        <Textarea placeholder="Address" onChangeText={(text) => setAddress(text)} rowSpan={5}>
                            {address}
                        </Textarea>
                    </Item>
                    <View>
                        <TouchableOpacity onPress={submitHandler} style={styles.submitBtn}>
                            <Text style={{color:'#fff'}}>Submit</Text>
                        </TouchableOpacity>
                    </View>
                </Form>
            </Content>
        </Container>
        </>
    )
}


export default Register;


const styles = StyleSheet.create({
    container: {
        padding:20,
    },
    heading: {
        textAlign:'center',
    },
    content:{
        marginTop:50,
    },
    inputWrap: {
        marginLeft:10,
        marginTop:10,
    },
    submitBtn: {
        width:'100%',
        backgroundColor:'rgb(105,0,255)',
        padding:15,
        alignItems:'center',
    }
})