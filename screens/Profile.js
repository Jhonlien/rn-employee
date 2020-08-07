import React from 'react'
import { StyleSheet, View, Image, Linking, Platform, TouchableHighlight, ScrollView } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import { Text, Card, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';

const Profile = (props) => {
    const {id, name, picture, phone, salary,email, position} = props.route.params.l;
    const openDial = ()=>{
       if(Platform.OS === "android"){
            Linking.openURL(`tel:${phone}`)
       }
       else{
            Linking.openURL(`telprompt:${phone}`)
       }
    }
    return (
        <ScrollView style={styles.root}>
            <LinearGradient colors={['#2980b9','#3498db']} style={{height:"20%"}}>
                <View style={{alignItems:'center'}}>
                    <Image
                        style={{width:90, height:90, borderRadius:90/2, marginTop: 40}}
                        source={{uri:'https://images.pexels.com/photos/4823380/pexels-photo-4823380.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260'}}
                    />
                </View>
                <View style={{alignItems:'center', marginTop: 10}}>
                    <Text h4>{name}</Text>
                    <Text>{position}</Text>
                </View>

                <TouchableHighlight onPress={()=> Linking.openURL('mailto:fandiadhitya96@gmail.com')}>
                    <Card style={styles.card}>
                        <View style={styles.cardContent}>
                            <Icon
                                style={{marginRight:5}}
                                size={24}
                                color="#c0392b"
                                name='mail' />
                            <Text style={{fontSize:17}}>{email}</Text>
                        </View>
                    </Card>
                </TouchableHighlight>


                <TouchableHighlight onPress={()=> openDial()}>
                    <Card style={styles.card}>
                        <View style={styles.cardContent}>
                            <Icon
                                style={{marginRight:5}}
                                size={24}
                                color="#27ae60"
                                name='call' />
                            <Text style={{fontSize:17}}>{phone}</Text>
                        </View>
                    </Card>
                </TouchableHighlight>
                
                <Card style={styles.card}>
                    <View style={styles.cardContent}>
                        <Icon
                            style={{marginRight:5}}
                            size={24}
                            color="#f39c12"
                            name='card' />
                        <Text style={{fontSize:17}}>{salary}</Text>
                    </View>
                </Card>
                <View style={{flexDirection:'row', justifyContent:'space-around'}}>
                    <Button
                        buttonStyle={{backgroundColor:'#27ae60', marginTop:10, width:150}}
                        icon={
                            <Icon
                                style={{marginRight:10}}
                                name="create"
                                size={15}
                                color="white"
                                />
                            }
                            title="Edit"
                            onPress={() => {console.log('Saved')}}
                    />
                    <Button
                        buttonStyle={{backgroundColor:'#c0392b', marginTop:10, width:150}}
                        icon={
                            <Icon
                                style={{marginRight:10}}
                                name="trash"
                                size={15}
                                color="white"
                                />
                            }
                            title="Remove"
                            onPress={() => {console.log('Saved')}}
                    />
                </View>
            </LinearGradient>
            
        </ScrollView>
    )
}

export default Profile

const styles = StyleSheet.create({
    root:{
        
    },
    card : {
        margin: 3,
    },
    cardContent : {
        flexDirection:'row'
    }

})
