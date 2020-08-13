import React,{useState,useEffect} from 'react'
import { StyleSheet, View, Button, FlatList, Image, Text,ActivityIndicator } from 'react-native'
import { Card, ListItem, Icon } from 'react-native-elements'
import { set } from 'react-native-reanimated';
import {useSelector, useDispatch} from 'react-redux';

const Home = (props) => {
    const dispatch = useDispatch();
    const {data, loading, refresh} = useSelector((state) => {
        return state
    });

    // console.log(data, loading);
    // const [data, setData] = useState([]);
    // const [loading, setLoading] = useState(true);

    const fetchData = () =>{
        fetch('https://employeappreact.herokuapp.com/')
        .then(res => res.json())
        .then(results =>{
            // setData(results)
            // setLoading(false)
            dispatch({type:'ADD_DATA', payload:results})
            dispatch({type:'SET_LOADING', payload:false})
        })
        .catch(err => {
            console.log(err);
            throw err;
        })
    }
    useEffect(()=>{
        fetchData()
        setTimeout(()=>{
            dispatch({type:'SET_REFRESH', payload:false})
        }, 1000)
    },[]);

    const renderItem = ({item}) => (
        <ListItem
            onPress={()=>{
                props.navigation.navigate("Profile",{item})
            }}
            key={item.id}
            leftAvatar={{ source: { uri: item.picture } }}
            title={item.name}
            subtitle={item.email}
            bottomDivider
        />
    )
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
                loading?
                    <View style={styles.container}>
                        <ActivityIndicator size="large" color="#2c3e50" />
                    </View>
                :
                <FlatList
                    refreshing={refresh}
                    onRefresh= {() => 
                        fetchData()
                    }
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={item => item._id}
                />
            }
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    root: {
        padding:5
    },
    container: {
        flex: 1,
        justifyContent: "center",
        marginVertical:50
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
