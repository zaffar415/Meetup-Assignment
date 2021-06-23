import React,{useEffect,useState} from 'react'
import {ScrollView, View, Text, TouchableOpacity, Modal, StyleSheet, Dimensions} from 'react-native'
import CustomHeader from '../components/Header'
import { useIsFocused } from '@react-navigation/native'
import {MOCKAROO_API_URL} from '@env'
import Axios from 'axios';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import {
    H3,H1,
    Card, CardItem,
    Button,
} from 'native-base'
import { PieChart, LineChart } from "react-native-chart-kit";
import Loading from '../components/Loading'


const Reports = ({navigation}) => {

    const isFocused = useIsFocused();

    const [users, setUsers] = useState(null);
    const [ageRangedata, setAgeRangedata] = useState(null)
    const [localityRangeData, setLocalityRangeData] = useState(null);
    const [guestsRangedata, setGuestsRangedata] = useState(null)
    const [professionalsRangeData, setProfessionalsRangeData] = useState(null)
    const width = Dimensions.get("window").width;

    const fetchUsers = async() => {
        console.log(MOCKAROO_API_URL)
        await Axios.get(MOCKAROO_API_URL)
        .then((response) => {
            setUsers(response.data);
            console.log(response.data);
        }).catch(err => console.log(err))
    }

    const chartConfig = {
        backgroundColor:"#ffffff",
        backgroundGradientFrom:'#ffffff',
        backgroundGradientTo:'#ffffff',
        color:(opacity = 1) => `rgba(255,255,255,${opacity})`,
        labelColor:(opacity = 1) => `rgba(0,0,0,${opacity})`,
        style:{
            borderRadius:16
        }  
    };

    const getAgeRange = () => {
        var ageGroup1 = 0;
        var ageGroup2 = 0;
        var ageGroup3 = 0;
        users.map((user) => {
            if(user.age >= 13 && user.age <=18 ) {
                ageGroup1++;
            } else if(user.age >=19 && user.age <= 25) {
                ageGroup2++;
            } else if(user.age > 25) {
                ageGroup3++;
            }
        })



        let data = [
            {
                name:'Age(13-18)',
                count:ageGroup1,
                color:'#5A20CB',
                legendFontColor:'#758283',
                legendFontSize:18
            },
            {
                name:'Age(18-25)',
                count:ageGroup2,
                color:'#3944F7',
                legendFontColor:'#758283',
                legendFontSize:18
            },
            {
                name:'Age(25+)',
                count:ageGroup3,
                color:'#CAD5E2',
                legendFontColor:'#758283',
                legendFontSize:18
            }
        ]

        setAgeRangedata(data);
    }

    const getLocalitiesRange = () => {
        var labels = [];
        var count = []
        users.map((user,index) => {
            var locality = user.locality;
            if(labels.includes(locality)) {
                count[labels.indexOf(locality)]++;
            } else {
                labels.push(locality);
                count.push(1)
            }
        })

        let data = {
            labels:labels,
            datasets: [
                {
                    data:count,
                    color:(opacity=1) => `rgba(134,65,244,${opacity})`,
                    strokeWidth:2,
                }
            ],
            legend:['Localities Analysis'],
        }

        setLocalityRangeData(data)
        
    }

    const getGuestsAverage = () => {
        var totalUsers = 0;
        var guests = 0;
        users.map((user) => {
            totalUsers += user.guests + 1;
            guests += user.guests;
        })

        let data = [
            {
                name:'Users',
                count:totalUsers-guests,
                color:'#3944F7',
                legendFontColor:'#758283',
                legendFontSize:18
            },
            {
                name:'Guests',
                count:guests,
                color:'#5A20CB',
                legendFontColor:'#758283',
                legendFontSize:18
            },
        ]

        setGuestsRangedata(data);
    }

    const getProfessionalsAverage = () => {
        var employees = 0;
        var students = 0;
        users.map((user) => {
            if(user.profession == 'Employee') {
                employees++;
            } else if(user.profession == 'student') {
                students++;
            }
        })
        setProfessionalsRangeData({
            employees,
            students
        })
    }


    useEffect(() => {
        if(!users) {
            fetchUsers();
        } else {
            getAgeRange();
            getLocalitiesRange();
            getGuestsAverage();
            getProfessionalsAverage();
            
        }
        
    },[isFocused,users])

    return (
        <ScrollView>
            <CustomHeader navigation={navigation}  />
            {!users && (
                <Loading size={50} />
            )}
            {ageRangedata && (
                <>
                <H3 style={styles.heading}>Age Analysis</H3>
                <PieChart 
                data={ageRangedata}
                width={width}
                height={300}
                accessor={"count"}
                backgroundColor={"#fff"}
                center={[20,0]}
                chartConfig={chartConfig}
                absolute
                />
                </>
            )}

            {localityRangeData && (
                <View style={{
                    backgroundColor:'#fff',
                    padding:20,
                }}>
                    <LineChart 
                    data={localityRangeData}
                    width={width-40}
                    height={300}
                    chartConfig={chartConfig}
                    />
                </View>
            )}

            {guestsRangedata && (
               <>
               <H3 style={styles.heading}>User & Guests Analysis</H3>
               <PieChart 
               data={guestsRangedata}
               width={width}
               height={300}
               accessor={"count"}
               backgroundColor={"#fff"}
               center={[20,0]}
               chartConfig={chartConfig}
               absolute
               />
               </>
            )}

            {professionalsRangeData && (
                <View style={styles.heading}>
                
                    <H3 style={{
                        textAlign:'center',
                    }}>
                        Professional Analysis
                    </H3>
                    <View style={{
                        flex:1,
                        flexDirection:'row',
                    }}>
                    <Card style={styles.card}>
                        <CardItem>
                            <View style={{
                                alignItems:'center'
                            }}>
                                <H3 style={{
                                    padding:20,
                                }}>Employees</H3>
                                <H1>{professionalsRangeData.employees}</H1>
                            </View>
                            
                        </CardItem>
                    </Card>
                    <Card style={styles.card}>
                        <CardItem>
                            <View style={{
                                alignItems:'center'
                            }}>
                                <H3 style={{
                                    padding:20,
                                }}>Students</H3>
                                <H1>{professionalsRangeData.students}</H1>
                            </View>
                            
                        </CardItem>
                    </Card>
                    </View>
                </View>
            )}


        </ScrollView>
    )
}

export default Reports;

const styles = StyleSheet.create({
    heading : {
        textAlign:'center',
        backgroundColor:'#fff',
        padding:20,
    },
    card: {
        width:'50%',
        paddingTop:30,
        paddingBottom:30,
        alignItems:'center'
    }

});