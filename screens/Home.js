import React from 'react'
import { StyleSheet, View, Button, FlatList, Image, Text } from 'react-native'
import { Card, ListItem, Icon } from 'react-native-elements'


const Home = (props) => {
    const DATA = [
        {
            id: 1, 
            name : 'Muhammad', 
            email:'fandiadhitya10@gmail.com',
            salary:'$100',
            phone: '085275502364', 
            position: 'web developer',
            picture : 'https://images.pexels.com/photos/4823380/pexels-photo-4823380.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260'
        },
        {
            id: 2, 
            name : 'Fandi', 
            email:'fandiadhitya96@gmail.com',
            salary:'$100',
            phone: '085275502364', 
            position: 'web developer',
            picture : 'https://images.pexels.com/photos/4823380/pexels-photo-4823380.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260'
        },
        {
            id: 3, 
            name : 'Adhitya', 
            email:'fandiadhitya06@gmail.com',
            salary:'$100',
            phone: '085275502364', 
            position: 'web developer',
            picture : 'https://images.pexels.com/photos/4823380/pexels-photo-4823380.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260'
        },
    ];
    return (
        <View style={styles.root}>
            <Button
                style={styles.fab}
                onPress={()=>props.navigation.navigate("Create")}
                title="Create"
                color="#3498db"
                accessibilityLabel="Learn more about this purple button"
            />
            {
                DATA.map((l, i) => (
                <ListItem
                    onPress={()=>{
                        props.navigation.navigate("Profile",{l})
                    }}
                    key={i}
                    leftAvatar={{ source: { uri: l.picture } }}
                    title={l.name}
                    subtitle={l.email}
                    bottomDivider
                />
                ))
            }
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    root: {
        padding:5
    },
    card : {
        flexDirection:'row',
    },
    fab : {
        width: 60,  
        height: 60,   
        borderRadius: 30,            
        backgroundColor: '#ee6e73',                                    
        position: 'absolute',                                          
        bottom: 10,                                                    
        right: 10, 
    }
    
})
