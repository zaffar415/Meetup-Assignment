import React,{useState,useEffect} from 'react'
import {ScrollView, View, Text, TouchableOpacity, Modal, StyleSheet} from 'react-native'
import CustomHeader from '../components/Header'
import { useIsFocused } from '@react-navigation/native'
import {MOCKAROO_API_URL} from '@env'
import Axios from 'axios';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import {
    Container,
    H3,H1,
    Content,
    List,
    ListItem,
    Header,
    Left, Right, Body,
    Form,
    Item,
    Input
} from 'native-base'
import Loading from '../components/Loading'


const Users = ({navigation}) => {
    const isFocused = useIsFocused();

    const [allUsers, setAllUsers] = useState(null);
    const [usersToRender, setUsersToRender] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState({});
    const [search, setSearch] = useState('')

    const fetchUsers = () => {
        console.log(MOCKAROO_API_URL)
        Axios.get(MOCKAROO_API_URL)
        .then((response) => {
            setAllUsers(response.data);
            setUsersToRender(response.data);
            console.log(response.data);
        }).catch(err => console.log(err))
    }


    const searchHandler = (text) => {
        setSearch(text);
        let results = allUsers.filter((user) => {
            // return user.username.search(user) !== -1
            return new RegExp(text).test(user.username) || new RegExp(text).test(user.locality);
        })
        setUsersToRender(results);
    }

    const showDetails = (user) => {
        setModalContent(user);
        setShowModal(true);
    }

    useEffect(() => {
        fetchUsers();
    },[isFocused])

    return (
        <ScrollView>  
            
            <View>
                <Modal
                animationType="slide"
                transparent={false}
                visible={showModal}
                onRequestClose={() => {
                    setShowModal(false)
                }}                
                >
                    <Header>
                        <Left style={{
                            maxWidth:50,
                        }}>
                            <TouchableOpacity onPress={() => setShowModal(false)}>
                                <Icon name="arrow-left" size={30} color="#fff" />

                            </TouchableOpacity>
                            
                        </Left>
                        <Body>
                            <H3
                            style={{
                                color:'#fff',
                            }}
                            >BACK</H3></Body>
                    </Header>
                    
                    <View style={{
                         flex:1,
                         justifyContent:'center',
                         alignItems:'center',
                    }}>
                        <H1>{modalContent.username}</H1>
                        
                        <Text><H3>Age : </H3>{modalContent.age}</Text>
                        <Text><H3>Profession : </H3>{modalContent.profession}</Text>
                        <Text><H3>DOB : </H3>{modalContent.dob}</Text>
                        <Text><H3>Locality : </H3>{modalContent.locality}</Text>
                        <Text><H3>Number of Guests : </H3>{modalContent.guests}</Text>
                        <Text><H3>Address : </H3>{modalContent.address}</Text>
                    </View>
                </Modal>
            </View>        
            <CustomHeader navigation={navigation}  />
            {!usersToRender && (
                <Loading size={50} />
            )}  
            <Content>
                <H1 style={{
                    textAlign:'center',
                    paddingTop:40,
                    paddingBottom:20,
                }}>
                    Users
                </H1>
                
                <Form style={{
                    marginBottom:20,
                }}>
                    <Item>
                        <Input value={search} onChangeText={(text) => searchHandler(text)} placeholder="Search by name or locality" />
                    </Item>
                </Form>
                
                <List>
                    {usersToRender && usersToRender.map((user,index) => (
                        <ListItem key={index}>
                            <Left style={{
                                maxWidth:70,
                            }}>
                                <H3>{index+1}</H3>
                            </Left>
                            <Body>
                                <TouchableOpacity onPress={() => showDetails(user)}>
                                    <H3>{user.username}</H3>
                                    <Text>{user.locality}</Text>
                                </TouchableOpacity>
                            </Body>
                            <Right>
                                <TouchableOpacity onPress={() => showDetails(user)}>
                                    <Icon name="arrow-right" size={20} />
                                </TouchableOpacity>
                            </Right>
                        </ListItem>
                        )) }   

                </List>
            </Content>

        </ScrollView>
    )
}

export default Users;